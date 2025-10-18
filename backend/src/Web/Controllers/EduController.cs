using Microsoft.AspNetCore.Mvc;
using Web.Models;
using Web.Models.Requests;
using Core.Services;
using Core.Dtos;
using Microsoft.AspNetCore.Authorization;
using Core.Enums;

[ApiController]
[Route("[controller]")]

public class EduController : ControllerBase
{
    private readonly IProfessorRequestService _professorRequestService;

    public EduController(IProfessorRequestService professorRequestService)
    {
        _professorRequestService = professorRequestService;
    }

    [HttpGet("professor-requests/pending")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetPendingProfessorRequests()
    {
        var requests = await _professorRequestService.GetPendingRequestsAsync();
        return Ok(requests);
    }

    [HttpPost("professor-requests")]
    [Authorize]
    public async Task<IActionResult> SubmitProfessorRequest([FromBody] ProfessorRequestCreateDto requestDto)
    {
        var userId = User.FindFirst("sub")?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }

        await _professorRequestService.SubmitRequestAsync(userId, requestDto);
        return CreatedAtAction(nameof(SubmitProfessorRequest), null);
    }

    [HttpPut("professor-requests/{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateProfessorRequestStatus(int id, [FromBody] ProfessorRequestStatusUpdateDto statusDto)
    {
        await _professorRequestService.UpdateRequestStatusAsync(id, statusDto.Status);
        return NoContent();
    }
}