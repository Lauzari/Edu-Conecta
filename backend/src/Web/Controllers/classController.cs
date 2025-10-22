using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClassController : ControllerBase
    {
        private readonly IClassRepository _classRepository;

        public ClassController(IClassRepository classRepository)
        {
            _classRepository = classRepository;
        }

        [HttpGet("AllClasses")]
        public ActionResult<IEnumerable<Class>> GetAll()
        {
            return Ok(_classRepository.GetAll());
        }

        [HttpGet("GetClass")]
        public ActionResult<Class> GetById([FromQuery] int id)
        {
            var classItem = _classRepository.GetById(id);
            if (classItem == null)
                return NotFound($"No se encontró la clase con ID {id}.");

            return Ok(classItem);
        }

        [HttpPost("CreateClass")]
        public ActionResult<Class> Create([FromBody] Class newClass)
        {
            var created = _classRepository.Create(newClass);
            return CreatedAtAction(nameof(GetById), new { id = created.classId }, created);
        }

        [HttpPut("UpdateClass")]
        public ActionResult<Class> Update([FromBody] Class updatedClass)
        {
            var result = _classRepository.Update(updatedClass);
            if (result == null)
                return NotFound($"No se encontró la clase con ID {updatedClass.classId}.");

            return Ok(result);
        }

        [HttpDelete("Delete")]
        public IActionResult Delete([FromQuery] int id)
        {
            _classRepository.Delete(id);
            return NoContent();
        }
    }
}
