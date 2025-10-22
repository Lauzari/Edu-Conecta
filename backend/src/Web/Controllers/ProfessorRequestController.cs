using Core.Services;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Web.Models.Requests;

[ApiController]
[Route("api/[controller]")]
public class ProfessorRequestController : ControllerBase
{
    private readonly IProfessorRequestService _service;

    public ProfessorRequestController(IProfessorRequestService service)
    {
        _service = service;
    }

    [HttpGet("pending")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetPending()
    {
        var requests = await _service.GetPendingRequestsAsync();
        return Ok(requests);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Submit(ProfessorRequestDto dto)    
    {
        var userId = User.FindFirst("sub")?.Value;
        if (userId == null)
            return Unauthorized();

        await _service.SubmitRequestAsync(dto.UserId, dto.Subject, dto.Description);
        return CreatedAtAction(nameof(Submit), null);
    }

  
}
