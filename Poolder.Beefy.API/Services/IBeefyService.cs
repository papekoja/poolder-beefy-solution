using Poolder.Beefy.API.Models;

public interface IBeefyService
{
    Task<PoolResponse> GetPoolsAsync();
    Task<List<TokenData>> GetTokensAsync();
}