using Core.Entities;
using Core.Enums;
using Core.Interfaces;

namespace Core.Interfaces;

public interface IClassService
{
    Task<IEnumerable<Class>> GetAll();

    Task<IEnumerable<Class>> GetAllWithStudents();

    Task<Class> GetById(int id);

    Task<Class> GetByIdWithStudents(int id);

    Task<Class> Create(int SubjectId, string ClassDescription, int TeacherId, string ZoomLink, ClassShift ClassShift, DateTime StartDate);

    Task<Class> Update(int Id, int SubjectId, string ClassDescription, int TeacherId, string ZoomLink, ClassShift ClassShift, DateTime StartDate);

    Task Delete(int id);

    Task AddStudent(int classId, int studentId);

    Task DeleteStudent(int classId, int studentId);

}
