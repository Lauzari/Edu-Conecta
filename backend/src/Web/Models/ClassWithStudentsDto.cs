using Core.Entities;
using Core.Enums;

namespace Web.Models;

public record ClassWithStudentsDto(
    int classId,
    int subjectId,
    SubjectDto Subject,
    string classDescription,
    int teacherId,
    UserDto Teacher,
    string zoomLink,
    ClassShift classShift,
    DateTime startDate,
    DateTime endDate,
    List<UserDto> Students,
    int StudentCount
)
{
    public static ClassWithStudentsDto Create(Class entity)
    {
        var dto = new ClassWithStudentsDto(
            entity.Id,
            entity.SubjectId,
            entity.Subject != null ? SubjectDto.Create(entity.Subject) : null,
            entity.ClassDescription,
            entity.TeacherId,
            entity.Teacher != null ? UserDto.Create(entity.Teacher) : null,
            entity.ZoomLink,
            entity.ClassShift,
            entity.StartDate,
            entity.EndDate,
            entity.Students != null ? UserDto.Create(entity.Students) : new List<UserDto>(),
            entity.Students?.Count ?? 0 
        );

        return dto;
    }

    public static List<ClassWithStudentsDto> Create(IEnumerable<Class> entities)
    {
        return entities.Select(Create).ToList();
    }
}
