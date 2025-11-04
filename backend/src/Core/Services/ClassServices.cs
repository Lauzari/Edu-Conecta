using Core.Entities;
using Core.Interfaces;

namespace Core.Services;

public class ClassService
{
    private readonly IClassRepository _classRepository;
    public ClassService(IClassRepository classRepository)
    {
        _classRepository = classRepository;
    }

    public List<Class> GetAll()
    {
        return _classRepository.GetAll();
    }

    public Class GetById(int id)
    {
        return _classRepository.GetById(id);
    }

    public Class Create(Class newClass)
    {
        if (newClass == null)
            throw new ArgumentNullException(nameof(newClass), "La clase no puede ser nula.");

        if (newClass.startDate >= newClass.endDate)
            throw new ArgumentException("La fecha de inicio no puede ser posterior o igual a la fecha de fin.");

        return _classRepository.Create(newClass);
    }

    public Class? Update(Class updatedClass)
    {
        if (updatedClass == null)
            throw new ArgumentNullException(nameof(updatedClass), "La clase no puede ser nula.");

        if (updatedClass.startDate >= updatedClass.endDate)
            throw new ArgumentException("La fecha de inicio no puede ser posterior o igual a la fecha de fin.");

        var existing = _classRepository.GetById(updatedClass.classId);
        if (existing == null)
            return null; // el controlador decidirá devolver NotFound

        return _classRepository.Update(updatedClass);
    }
    public bool Delete(int id)
    {
        var existing = _classRepository.GetById(id);
        if (existing == null)
            return false;

        _classRepository.Delete(id);
        return true;
    }

}
