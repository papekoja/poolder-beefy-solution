using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;
using Poolder.Beefy.API.Models;

public interface IBeefyService
{
    Task<PoolResponse> GetPoolsAsync();
}

public class BeefyService : IBeefyService
{
    private readonly HttpClient _httpClient;
    private readonly IDistributedCache _cache;
    private readonly TimeSpan _cacheExpiry = TimeSpan.FromMinutes(1);
    public BeefyService(IHttpClientFactory factory, IDistributedCache cache)
    {
        _httpClient = factory.CreateClient("Beefy Api");
        _cache = cache;
    }

    public async Task<PoolResponse> GetPoolsAsync()
    {
        const string cacheKey = "beefy:pool";

        // Step 1: Try to get the item from Redis cache
        var cachedItem = await _cache.GetStringAsync(cacheKey);
        if (cachedItem != null)
        {
            Console.WriteLine("✅ Item retrieved from cache!");
            return JsonSerializer.Deserialize<PoolResponse>(cachedItem, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            }) ?? [];
        }

        // Step 2: fetch data from beefy
        var url = "https://api.beefy.finance/lps/breakdown";
        var json = await _httpClient.GetStringAsync(url);

        if (json != null)
        {
            // Step 3: Cache the item in Redis
            await _cache.SetStringAsync(
                cacheKey,
                json,
                new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = _cacheExpiry }
            );
            Console.WriteLine("🔄 Item added to cache.");
        }

        var pools = JsonSerializer.Deserialize<PoolResponse>(json ?? "", new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        });

        return pools ?? [];
    }
}