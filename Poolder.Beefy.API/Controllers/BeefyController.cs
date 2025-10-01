using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Poolder.Beefy.API.Models;

namespace Poolder.Beefy.API.Controllers;


[Route("api/[controller]")]
[ApiController]
public class BeefyController : Controller
{
    private readonly IBeefyService _beefyService;

    public BeefyController(IBeefyService beefyService)
    {
        _beefyService = beefyService;
    }

    [EnableCors("AllowFrontend")]
    [HttpGet("lps/breakdown")]
    public async Task<ActionResult<PoolResponse>> GetApyBreakdown()
    {
        var pools = await _beefyService.GetPoolsAsync();
        return Ok(pools);
    }

    [EnableCors("AllowFrontend")]
    [HttpGet("tokens")]
    public async Task<ActionResult<List<TokenData>>> GetTokens()
    {
        var tokens = await _beefyService.GetTokensAsync();
        return Ok(tokens);
    }
}