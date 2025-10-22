using Core.Entities;   

namespace Core.Interfaces;

public interface IClassRepository
{
    public List<Class> GetAll();
    public Class? GetById(int id);
    public Class Create(Class newClass);
    public Class Update(Class updatedClass);
    public void Delete(int id);
}