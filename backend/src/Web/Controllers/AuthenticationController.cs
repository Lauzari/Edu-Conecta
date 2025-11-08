using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Models.Requests;

namespace Web.Controllers;

[Route("api/authentication")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly ICustomAuthenticationService _customAuthenticationService;

    public AuthenticationController(IConfiguration config, ICustomAuthenticationService autenticacionService)
    {
        _config = config;
        _customAuthenticationService = autenticacionService;
    }

    /// <summary>
    /// Authenticates a user
    /// </summary>
    [HttpPost("authenticate")]
    public async Task<ActionResult<string>> Autenticar(AuthenticationRequest authenticationRequest)
    {
        string token = await _customAuthenticationService.Autenticar(authenticationRequest.Email, authenticationRequest.Password);

        return Ok(token);
    }

}