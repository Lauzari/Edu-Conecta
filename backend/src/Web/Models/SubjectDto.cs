using Core.Entities;

namespace Web.Models;

public record SubjectDto(
    int Id,
    string Name,
    int Year,
    string Description,
    int Duration
)
{
    public static SubjectDto Create(Subject entity)
    {
        var dto = new SubjectDto(
            entity.Id,
            entity.Name,
            entity.Year,
            entity.Description,
            entity.Duration
        );

        return dto;
    }

    public static List<SubjectDto> Create(IEnumerable<Subject> entities)
    {
        var listDto = new List<SubjectDto>();
        foreach (var entity in entities)
        {
            listDto.Add(Create(entity));
        }

        return listDto;
    }
}
