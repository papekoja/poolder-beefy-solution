using System.Text.Json;
using Microsoft.AspNetCore.Cors;
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

    [EnableCors("AllowFrontend")]
    [HttpGet("lps/breakdown")]
    public async Task<ActionResult<LpsResponse>> GetApyBreakdown()
    {
        var url = "https://api.beefy.finance/lps/breakdown"; 
        var json = await _httpClient.GetStringAsync(url);

        var pools = JsonSerializer.Deserialize<LpsResponse>(json, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        });

        return Ok(pools);
    }
}