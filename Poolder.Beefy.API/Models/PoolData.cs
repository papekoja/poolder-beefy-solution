// // Sample response from the /lps/breakdown endpoint (eg. 2omb 2omb-2share LP)

// {
//   "2omb-2omb-2share": {
//     "price": 0.29050984564246707,
//     "tokens": [
//       "0x7a6e4E3CC2ac9924605DCa4bA31d1831c84b44aE",
//       "0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca"
//     ],
//     "balances": [
//       "114463.728388652710537014",
//       "391.331589320557497638"
//     ],
//     "totalSupply": "5873.360029904692639438"
//   }, 


using System.Text.Json.Serialization;

namespace Poolder.Beefy.API.Models;

public class PoolResponse : Dictionary<string, PoolData> { }

public class PoolData
{
    [JsonPropertyName("price")]
    public double? Price { get; set; }
    [JsonPropertyName("tokens")]
    public List<string?>? Tokens { get; set; }
    [JsonPropertyName("balances")]
    public List<string>? balances { get; set; }
    [JsonPropertyName("totalSupply")]
    public string? totalSupply { get; set; }
}