using Core.Entities;
using Core.Interfaces;
using Core.Services;
using Web.Models;
using Microsoft.AspNetCore.Mvc;


namespace Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClassController : ControllerBase
    {
        private readonly ClassService _classService;

        public ClassController(ClassService classService)
        {
            _classService = classService;
        }

        [HttpGet("AllClasses")]
        public ActionResult<IEnumerable<Class>> GetAll()
        {
            return Ok(_classService.GetAll());
        }

        [HttpGet("GetClass")]
        public ActionResult<Class> GetById([FromQuery] int id)
        {
            return Ok(_classService.GetById(id));
        }

        [HttpPost("CreateClass")]
        public ActionResult<ClassDto> Create([FromBody] ClassDto newClassDto)
        {
            var newClass = new Class
            {
                subjectId = newClassDto.subjectId,
                classDescription = newClassDto.classDescription,
                teacherId = newClassDto.teacherId,
                zoomLink = newClassDto.zoomLink,
                classShift = newClassDto.classShift,
                startDate = newClassDto.startDate,
                endDate = newClassDto.endDate
            };

            var created = _classService.Create(newClass);
            return CreatedAtAction(nameof(GetById), new { id = created.classId }, ClassDto.Create(created));
        }

        [HttpPut("UpdateClass")]
        public ActionResult<Class> Update([FromBody] Class updatedClass)
        {
            var result = _classService.Update(updatedClass);

            return Ok(result);
        }

        [HttpDelete("Delete")]
        public IActionResult Delete([FromQuery] int id)
        {
            _classService.Delete(id);
            return NoContent();
        }
    }
}
