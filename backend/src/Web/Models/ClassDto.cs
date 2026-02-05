using Core.Entities;
using Core.Enums;

namespace Web.Models;

public record ClassDto(
    int classId,
    int subjectId,
    SubjectDto Subject,
    string classDescription,
    int teacherId,
    UserDto Teacher,
    string zoomLink,
    string CoverImage,
    ClassShift classShift,
    DateTime startDate,
    DateTime endDate
)
{
    public static ClassDto Create(Class entity)
    {
        var dto = new ClassDto(
            entity.Id,
            entity.SubjectId,
            entity.Subject != null ? SubjectDto.Create(entity.Subject) : null,
            entity.ClassDescription,
            entity.TeacherId,
            entity.Teacher != null ? UserDto.Create(entity.Teacher) : null,
            entity.ZoomLink,
            entity.CoverImage,
            entity.ClassShift,
            entity.StartDate,
            entity.EndDate
        );

        return dto;
    }

    public static List<ClassDto> Create(IEnumerable<Class> entities)
    {
        var listDto = new List<ClassDto>();
        foreach (var entity in entities)
        {
            listDto.Add(Create(entity));
        }

        return listDto;
    }
}
