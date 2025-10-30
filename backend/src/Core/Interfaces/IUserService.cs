using Core.Entities;
using Core.Enums;
using Core.Interfaces;
namespace Core.Services;

public interface IUserService
{
    public User CreateUser(string Email, string Password, string Name, DateOnly BirthDate, UserType UserType);

    public User GetUserInfo(int id);

    public User GetUserInfoWithJoins(int id);

    public List<User> GetAllUsersInfo();

    public User? UpdateUser(int id, string email, string name, DateOnly birthDate, UserType userType);

    public void DeleteUser(int id);

    public User PromoteToProfessor(int id);

}
