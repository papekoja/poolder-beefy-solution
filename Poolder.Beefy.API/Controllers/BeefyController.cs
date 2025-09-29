using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Poolder.Beefy.API.Models;

namespace Poolder.Beefy.API.Controllers;


[Route("api/[controller]")]
[ApiController]
public class BeefyController : Controller
{
    private readonly HttpClient _httpClient;

    public BeefyController(IHttpClientFactory factory)
    {
        _httpClient = factory.CreateClient("Beefy Api");
    }

    [HttpGet("lps/breakdown")]
    public async Task<ActionResult<LpsResponse>> GetApyBreakdown()
    {
        var url = "https://api.beefy.finance/lps/breakdown"; 
        var json = await _httpClient.GetStringAsync(url);

        Console.WriteLine(json);

        var pools = JsonSerializer.Deserialize<LpsResponse>(json, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        });

        return Ok(pools);
    }
}