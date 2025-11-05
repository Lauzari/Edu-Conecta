using Core.Entities;
using Core.Enums;
namespace Core.Interfaces;

public interface IUserService
{
    Task<User> CreateUserAsync(string Email, string Password, string Name, DateOnly BirthDate);

    Task<User> GetUserInfoAsync(int id);

    Task<User> GetUserInfoWithJoinsAsync(int id);

    Task<IEnumerable<User>> GetAllUsersInfoAsync();

    Task<User> UpdateUserAsync(int id, string email, string name, DateOnly birthDate, UserType userType);

    Task DeleteUserAsync(int id);

    Task<User> PromoteToProfessor(int id);

}
