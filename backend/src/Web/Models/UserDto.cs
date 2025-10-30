using Core.Entities;

namespace Web.Models;

public record UserDto(
    int Id,
    string Email,
    string Name,
    bool IsActive,
    DateOnly BirthDate,
    DateTime RegisterDate,
    string UserType
    // AGREGAR CUANDO TENGAMOS LA UNIÓN ENTRE TABLAS
    // List<RequestDto>? Requests,
    // List<CourseDto>? Courses
)
{
    // Create methods: makes User mapping easier
    public static UserDto Create(User entity)
    {
        var dto = new UserDto(
            entity.Id,
            entity.Email,
            entity.Name,
            entity.IsActive,
            entity.BirthDate,
            entity.RegisterDate,
            //Converts to string so it is more legible for JSON
            entity.UserType.ToString()
            // AGREGAR CUANDO TENGAMOS LA UNIÓN ENTRE TABLAS Y SUS DTOs
            // entity.Requests?.Select(RequestDto.Create).ToList(),
            // entity.Courses?.Select(CourseDto.Create).ToList()
        );

        return dto;
    }

    public static List<UserDto> Create(IEnumerable<User> entities)
    {
        var listDto = new List<UserDto>();
        foreach (var entity in entities)
        {
            listDto.Add(Create(entity));
        }

        return listDto;
    }
}
