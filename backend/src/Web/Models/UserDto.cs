using Core.Entities;

namespace Web.Models;

public record UserDto(
    int Id,
    string Email,
    string Name,
    DateOnly BirthDate,
    DateTime RegisterDate,
    string UserType
)
{
    // Create methods: makes User mapping easier
    public static UserDto Create(User entity)
    {
        var dto = new UserDto(
            entity.Id,
            entity.Email,
            entity.Name,
            entity.BirthDate,
            entity.RegisterDate,
            //Converts to string so it is more legible for JSON
            entity.UserType.ToString()
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
