using Core.Entities;

namespace Web.Models;

public record UserWithRelationsDto(
    int Id,
    string Email,
    string Name,
    DateOnly BirthDate,
    DateTime RegisterDate,
    string UserType,
    List<ProfessorRequestDto>? Requests
    List<CourseDto>? Classes
)
{
    // Create methods: makes User mapping easier
    public static UserWithRelationsDto Create(User entity)
    {
        var dto = new UserWithRelationsDto(
            entity.Id,
            entity.Email,
            entity.Name,
            entity.BirthDate,
            entity.RegisterDate,
            entity.UserType.ToString(),
            entity.Requests?.Select(ProfessorRequestDto.Create).ToList()
            entity.Classes?.Select(ClassDto.Create).ToList()
        );

        return dto;
    }

}
