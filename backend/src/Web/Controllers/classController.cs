using Core.Entities;
using Core.Interfaces;
using Web.Models;
using Microsoft.AspNetCore.Mvc;
using Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Core.Enums;


namespace Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;

        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassDto>>> GetAll()
        {
            var classes = await _classService.GetAll();
            return ClassDto.Create(classes);
        }

        [HttpGet("GetClassesWithStudents")]
        public async Task<ActionResult<IEnumerable<ClassWithStudentsDto>>> GetAllWithStudents()
        {
            var classes = await _classService.GetAllWithStudents();
            return ClassWithStudentsDto.Create(classes);
        }

        [HttpGet("GetClass")]
        public async Task<ActionResult<ClassDto>> GetById([FromQuery] int id)
        {
            var classItem = await _classService.GetById(id);
            return ClassDto.Create(classItem);
        }

        [HttpGet("GetClassWithStudents")]
        public async Task<ActionResult<ClassWithStudentsDto>> GetClassWithStudents([FromQuery] int id)
        {
            var classItem = await _classService.GetByIdWithStudents(id);
            return ClassWithStudentsDto.Create(classItem);
        }

        [HttpPost]
        [Authorize(Roles = $"{nameof(UserType.Admin)},{nameof(UserType.Professor)}")]
        public async Task<ActionResult<ClassDto>> Create([FromBody] CreateClassRequest request)
        {
            var newClass = await _classService.Create(request.SubjectId, request.ClassDescription, request.TeacherId, request.ZoomLink, request.ClassShift, request.StartDate);

            return CreatedAtAction(nameof(GetById), new { id = newClass.Id }, ClassDto.Create(newClass));
        }

        [HttpPut]
        [Authorize(Roles = $"{nameof(UserType.Admin)},{nameof(UserType.Professor)}")]
        public async Task<ActionResult<ClassDto>> Update([FromBody] UpdateClassRequest request)
        {
            var updatedClass = await _classService.Update(request.Id, request.SubjectId, request.ClassDescription, request.TeacherId, request.ZoomLink, request.ClassShift, request.StartDate);

            return ClassDto.Create(updatedClass);
        }

        [HttpDelete("Delete")]
        [Authorize(Roles = $"{nameof(UserType.Admin)},{nameof(UserType.Professor)}")]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            await _classService.Delete(id);
            return NoContent();
        }

        [HttpPost("{classId}/enrollStudent")]
        [Authorize]
        public async Task<ActionResult> EnrollStudent(int classId, [FromBody] int studentId)
        {
            await _classService.AddStudent(classId, studentId);

            return NoContent();
        }

        [HttpPost("{classId}/deleteStudent")]
        [Authorize(Roles = nameof(UserType.Professor))]
        public async Task<ActionResult> DeleteStudent(int classId, [FromBody] int studentId)
        {
            await _classService.DeleteStudent(classId, studentId);

            return NoContent();
        }
    }
}
