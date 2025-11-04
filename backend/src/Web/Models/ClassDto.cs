using Core.Entities;
namespace Web.Models;

public record ClassDto(
    int classId,
    int subjectId,
    string classDescription,
    int teacherId,
    string zoomLink,
    ClassShift classShift,
    DateTime startDate,
    DateTime endDate
)
{
    public static ClassDto Create(Class entity)
    {
        var dto = new ClassDto(
            entity.classId,
            entity.subjectId,
            entity.classDescription,
            entity.teacherId,
            entity.zoomLink,
            entity.classShift,
            entity.startDate,
            entity.endDate
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