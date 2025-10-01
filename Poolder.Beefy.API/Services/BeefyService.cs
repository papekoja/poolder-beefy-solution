using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;
using Poolder.Beefy.API.Models;

public interface IBeefyService
{
    Task<PoolResponse> GetPoolsAsync();
    Task<List<TokenData>> GetTokensAsync();
}

public class BeefyService : IBeefyService
{
    private readonly HttpClient _httpClient;
    private readonly IDistributedCache _cache;
    private readonly TimeSpan _cacheExpiry = TimeSpan.FromMinutes(5);
    public BeefyService(IHttpClientFactory factory, IDistributedCache cache)
    {
        _httpClient = factory.CreateClient("Beefy Api");
        _cache = cache;
    }

    public async Task<PoolResponse> GetPoolsAsync()
    {
        const string cacheKey = "beefy:pool";

        // Try to get the item from Redis cache
        var json = await _cache.GetStringAsync(cacheKey);
        if (json != null)
        {
            Console.WriteLine("✅ Item retrieved from cache!");
        }
        else
        {
            var url = "https://api.beefy.finance/lps/breakdown";
            json = await _httpClient.GetStringAsync(url);

            if (json != null)
            {
                // Cache the item in Redis
                await _cache.SetStringAsync(
                    cacheKey,
                    json,
                    new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = _cacheExpiry }
                );
                Console.WriteLine("Pool breakdown added to cache.");
            }

        }

        var pools = JsonSerializer.Deserialize<PoolResponse>(json ?? "", new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        });

        // Replace token address with token name
        var tokens = await GetTokensAsync();

        var tokenLookup = tokens
        .Where(t => !string.IsNullOrWhiteSpace(t.Address))
        .DistinctBy(t => t.Address!.ToLower())
        .ToDictionary(t => t.Address!.ToLower(), t => t.Symbol);

        if (pools != null)
        {
            foreach (var pool in pools.Values.Where(p => p?.Tokens != null))
            {
                if (pool?.Tokens != null)
                {
                    pool.Tokens = pool.Tokens
                    .Where(addr => !string.IsNullOrWhiteSpace(addr))
                        .Select(addr =>
                        {
                            var key = addr!.ToLowerInvariant();
                            return tokenLookup.TryGetValue(key, out var symbol)
                            ? symbol
                            : addr;
                        })
                        .ToList();
                }
            }
        }


        return pools ?? [];
    }

    public async Task<List<TokenData>> GetTokensAsync()
    {
        const string cacheKey = "beefy:tokens";

        string? json = await _cache.GetStringAsync(cacheKey);

        if (json != null)
        {
            Console.WriteLine("✅ Item retrieved from cache!");
        }
        else
        {
            // Fetch fresh data
            var url = "https://api.beefy.finance/tokens";
            json = await _httpClient.GetStringAsync(url);

            // Cache the fresh data
            await _cache.SetStringAsync(
                cacheKey,
                json,
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = _cacheExpiry
                }
            );
            Console.WriteLine("Tokens added to cache.");
        }

        // Deserialize into nested dictionary
        var tokenResponse = JsonSerializer.Deserialize<TokenResponse>(json, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        });

        // Flatten into a list
        var tokens = tokenResponse?
            .SelectMany(chainEntry =>
                chainEntry.Value.Select(kvp =>
                {
                    var token = kvp.Value;
                    token.Chain = chainEntry.Key;
                    return token;
                })
            )
            .ToList()
            ?? new List<TokenData>();

        return tokens;
    }
}