using Core.Enums;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Requests;
using Web.Models;
using System.Security.Claims;

namespace Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfessorRequestController : ControllerBase
{
    private readonly IProfessorRequestService _service;

    public ProfessorRequestController(IProfessorRequestService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = nameof(UserType.Admin))]
    public async Task<ActionResult<IEnumerable<ProfessorRequestDto>>> GetRequests()
    {
        var requests = await _service.GetRequestsAsync();
        return ProfessorRequestDto.Create(requests);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ProfessorRequestDto>> CreateProfessorRequest([FromBody] CreateProfessorRequestDto request)
    {

        var claimValue = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(claimValue))
            return Unauthorized();

        int userId = int.Parse(claimValue);

        var newRequest = await _service.AddRequestAsync(userId, request.Description);
        return CreatedAtAction(nameof(GetRequestById), new { id = newRequest.Id }, ProfessorRequestDto.Create(newRequest));
    }

    [HttpGet("{id}")]
    [Authorize(Roles = nameof(UserType.Admin))]
    public async Task<ActionResult<ProfessorRequestDto>> GetRequestById([FromRoute] int id)
    {
        var request = await _service.GetRequestById(id);
        return ProfessorRequestDto.Create(request);
    }

    [HttpGet("/requestsByUserId")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<ProfessorRequestDto>>> GetRequestsByUserId()
    {
        var claimValue = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(claimValue))
            return Unauthorized();

        int userId = int.Parse(claimValue);

        var requests = await _service.GetRequestsByUserId(userId);
        return ProfessorRequestDto.Create(requests);
    }

    [HttpPut("acceptRequest")]
    [Authorize(Roles = nameof(UserType.Admin))]
    public async Task<ActionResult<ProfessorRequestDto>> AcceptRequestStatus([FromBody] UpdateProfessorRequestDto request)
    {
        var req = await _service.AcceptRequestStatusAsync(request.Id, request.ApplicantId);
        return ProfessorRequestDto.Create(req);
    }

    [HttpPut("declineRequest")]
    [Authorize(Roles = nameof(UserType.Admin))]
    public async Task<ActionResult<ProfessorRequestDto>> DeclineRequestStatus([FromBody] UpdateProfessorRequestDto request)
    {
        var req = await _service.DeclineRequestStatusAsync(request.Id, request.ApplicantId);
        return ProfessorRequestDto.Create(req);
    }
}
