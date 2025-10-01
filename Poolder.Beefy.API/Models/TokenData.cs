// // Sample response for /tokens endpoint (e.g. polygon spUSDC LP token)

// {
//   "polygon": {
//     "spUSDC": {
//       "name": "Stargate USD Coin LP",
//       "symbol": "spUSDC",
//       "address": "0x1205f31718499dBf1fCa446663B532Ef87481fe1",
//       "decimals": 6
//     },
//     ...
// }

using System.Text.Json.Serialization;

namespace Poolder.Beefy.API.Models;

public class TokenResponse : Dictionary<string, Dictionary<string, TokenData>> { }

public class TokenData
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }
    [JsonPropertyName("symbol")]
    public string? Symbol { get; set; }
    [JsonPropertyName("address")]
    public string? Address { get; set; }
    [JsonPropertyName("decimals")]
    public int? Decimals { get; set; }
    public string? Chain { get; set; }
}