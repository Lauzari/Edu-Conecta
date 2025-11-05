using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Web.Models.Requests;
using Web.Models;
using Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Core.Enums;

[ApiController]
[Route("api/[controller]")]
public class SubjectController : ControllerBase
{
    private readonly ISubjectService _subjectService;

    public SubjectController(ISubjectService subjectService)
    {
        _subjectService = subjectService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SubjectDto>>> GetAll()
    {
        var subjects = await _subjectService.GetAllAsync();
        return SubjectDto.Create(subjects);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SubjectDto>> GetById(int id)
    {
        var subject = await _subjectService.GetByIdAsync(id);
        return SubjectDto.Create(subject);
    }

    [HttpPost]
    [Authorize(Roles = nameof(UserType.Admin))]
    public async Task<ActionResult<SubjectDto>> Create([FromBody] CreateSubjectRequest request)
    {
        var newSubject = await _subjectService.CreateAsync(request.Name, request.Year, request.Description, request.Duration);
        return CreatedAtAction(nameof(GetById), new { id = newSubject.Id }, SubjectDto.Create(newSubject));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = nameof(UserType.Admin))]
    public async Task<ActionResult<SubjectDto>> Update(int id, [FromBody] UpdateSubjectRequest request)
    {
        var subject = await _subjectService.UpdateAsync(id, request.Id, request.Name, request.Year, request.Description, request.Duration);
        return SubjectDto.Create(subject);
    }

    [HttpDelete("{id}")]
     [Authorize(Roles = nameof(UserType.Admin))]
    public async Task<IActionResult> Delete(int id)
    {
        await _subjectService.DeleteAsync(id);
        return NoContent();
    }
}
