using Core.Entities;   

namespace Core.Interfaces;

public interface IClassRepository
{
    public Task<IEnumerable<Class>> GetAll();
    public Task<IEnumerable<Class>> GetAllWithStudents();
    public Task<Class?> GetById(int id);
    public Task<Class?> GetByIdWithStudents(int id);
    public Task<Class> Create(Class newClass);
    public Task<Class> Update(Class updatedClass);
    public void Delete(Class classItem);
}