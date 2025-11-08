using Core.Entities;
using Core.Enums;
using Core.Exceptions;
using Core.Interfaces;

namespace Core.Services;

public class ClassService : IClassService
{
    private readonly IClassRepository _classRepository;
    private readonly ISubjectRepository _subjectRepository;

    private readonly IUserRepository _userRepository;
    public ClassService(IClassRepository classRepository, ISubjectRepository subjectRepository, IUserRepository userRepository)
    {
        _classRepository = classRepository;
        _subjectRepository = subjectRepository;
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<Class>> GetAll()
    {
        return await _classRepository.GetAll();
    }

    public async Task<IEnumerable<Class>> GetAllWithStudents()
    {
        return await _classRepository.GetAllWithStudents();
    }

    public async Task<Class> GetById(int id)
    {
        return await _classRepository.GetById(id) ?? throw new NotFoundException("Class Not Found.");
    }

    public async Task<Class> GetByIdWithStudents(int id)
    {
        return await _classRepository.GetByIdWithStudents(id) ?? throw new NotFoundException("Class Not Found.");
    }

    public async Task<Class> Create(
        int subjectId,
        string classDescription,
        int teacherId,
        string zoomLink,
        ClassShift classShift,
        DateTime startDate)
    {
        var subject = await _subjectRepository.GetByIdAsync(subjectId);
        if (subject == null)
        {
            throw new NotFoundException($"Subject not found for ID {subjectId}.");
        }

        var teacher = await _userRepository.GetByIdAsync(teacherId);
        if (teacher == null)
        {
            throw new NotFoundException($"User not found for ID {teacherId}.");
        }

        var newClass = new Class(
            subjectId,
            teacherId,
            classDescription,
            zoomLink,
            classShift,
            startDate,
            subject.Duration
        );
        var createdClass = await _classRepository.Create(newClass);
        return await _classRepository.GetById(createdClass.Id);
    }


    public async Task<Class> Update(
     int Id,
     int SubjectId,
     string ClassDescription,
     int TeacherId,
     string ZoomLink,
     ClassShift ClassShift,
     DateTime StartDate)
    {
        var existing = await _classRepository.GetById(Id)
            ?? throw new NotFoundException("Class not found.");

        var subject = await _subjectRepository.GetByIdAsync(SubjectId)
            ?? throw new NotFoundException("Subject not found.");

        var teacher = await _userRepository.GetByIdAsync(TeacherId)
            ?? throw new NotFoundException("Teacher not found.");

        if (teacher.UserType != UserType.Professor)
            throw new ArgumentException("The selected user is not a professor.");

        existing.SubjectId = SubjectId;
        existing.ClassDescription = ClassDescription;
        existing.TeacherId = TeacherId;
        existing.ZoomLink = ZoomLink;
        existing.ClassShift = ClassShift;
        existing.StartDate = StartDate;

        existing.RecalculateEndDate();

        return await _classRepository.Update(existing);
    }

    public async Task Delete(int id)
    {
        var existing = await _classRepository.GetById(id) ?? throw new NotFoundException("Class Not Found.");
        await _classRepository.Delete(existing);
    }

    public async Task AddStudent(int classId, int studentId)
    {
        int studentCount = await _classRepository.GetStudentCount(classId);

        if (studentCount >= 15)
        {
            throw new AppValidationException("The class is full.");
        }
        var classEntity = await _classRepository.GetById(classId) ?? throw new NotFoundException("Class not found.");

        var student = await _userRepository.GetByIdAsync(studentId) ?? throw new NotFoundException("User not found.");

        if (student.UserType != UserType.Student)
            throw new Exception("Invalid UserType.");

        if (classEntity.Students.Any(s => s.Id == studentId))
            throw new Exception("User is already registered in this class.");

        classEntity.Students.Add(student);

        await _classRepository.Update(classEntity);
    }

    public async Task DeleteStudent(int classId, int studentId)
    {
        var classEntity = await _classRepository.GetByIdWithStudents(classId)
            ?? throw new NotFoundException("Class not found.");

        var student = await _userRepository.GetByIdAsync(studentId)
            ?? throw new NotFoundException("Student not found.");

        if (student.UserType != UserType.Student)
            throw new Exception("Invalid UserType.");

        // Buscar la instancia trackeada dentro de la clase
        var studentInClass = classEntity.Students.FirstOrDefault(s => s.Id == studentId);

        if (studentInClass == null)
            throw new Exception("Student is not registered in this class.");

        classEntity.Students.Remove(studentInClass);

        await _classRepository.Update(classEntity);
    }

}
