using Core.Entities;
using Core.Enums;

namespace Web.Models;

public record ProfessorRequestDto(
    int Id,
    string Description,
    int ApplicantId,
    RequestStatus Status
)
{
    public static ProfessorRequestDto Create(ProfessorRequest entity)
    {
        var dto = new ProfessorRequestDto(
            entity.Id,
            entity.Description,
            entity.ApplicantId,
            entity.Status
        );

        return dto;
    }

    public static List<ProfessorRequestDto> Create(IEnumerable<ProfessorRequest> entities)
    {
        var listDto = new List<ProfessorRequestDto>();
        foreach (var entity in entities)
        {
            listDto.Add(Create(entity));
        }

        return listDto;
    }
}
