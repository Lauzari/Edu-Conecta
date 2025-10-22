using Core.Services;
using Core.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> Submit([FromBody] ProfessorRequestCreateDto dto)
    {
        var userId = User.FindFirst("sub")?.Value;
        if (userId == null)
            return Unauthorized();

        await _service.SubmitRequestAsync(userId, dto);
        return CreatedAtAction(nameof(Submit), null);
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] ProfessorRequestStatusUpdateDto statusDto)
    {
        await _service.UpdateRequestStatusAsync(id, statusDto.Status);
        return NoContent();
    }
}
