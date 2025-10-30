using Core.Enums;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.Requests;
using Web.Models;

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
    // [Authorize(UserType = "Admin")]
    public async Task<ActionResult<IEnumerable<ProfessorRequestDto>>> GetRequests()
    {
        var requests = await _service.GetRequestsAsync();
        return ProfessorRequestDto.Create(requests);
    }

    // It recieves the User ID in the route and all the Request info in the body
    [HttpPost("{id}")]
    // [Authorize]
    public async Task<ActionResult<ProfessorRequestDto>> CreateProfessorRequest([FromRoute] int id, [FromBody] CreateProfessorRequestDto request)
    {
        var newRequest = await _service.AddRequestAsync(id, request.Description, request.ApplicantId);
        return CreatedAtAction(nameof(GetRequestById), new { id = newRequest.Id }, ProfessorRequestDto.Create(newRequest));
    }

    //CAPAZ ESTE NO HACE FALTA
    [HttpGet("{id}")]
    // [Authorize]
    public async Task<ActionResult<ProfessorRequestDto>> GetRequestById([FromRoute] int id)
    {
        var request = await _service.GetRequestById(id);
        return ProfessorRequestDto.Create(request);
    }

    [HttpPut("acceptRequest")]
    // [Authorize]
    public async Task<ActionResult<ProfessorRequestDto>> AcceptRequestStatus([FromBody] UpdateProfessorRequestDto request)
    {
        var req = await _service.AcceptRequestStatusAsync(request.Id, request.ApplicantId);
        return ProfessorRequestDto.Create(req);
    }

    [HttpPut("declineRequest")]
    // [Authorize]
    public async Task<ActionResult<ProfessorRequestDto>> DeclineRequestStatus([FromRoute] int id, [FromBody] UpdateProfessorRequestDto request)
    {
        var req = await _service.DeclineRequestStatusAsync(request.Id, request.ApplicantId);
        return ProfessorRequestDto.Create(req);
    }
}
