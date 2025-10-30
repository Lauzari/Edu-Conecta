using Core.Entities;
using Core.Enums;
using Core.Interfaces;
namespace Core.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public User CreateUser(string Email, string Password, string Name, DateOnly BirthDate, UserType UserType)

    {
        User newUser = new(Email, Password, Name, BirthDate, UserType);

        _userRepository.Add(newUser);

        return newUser;
    }

    public User GetUserInfo(int id)
    {
        var user = _userRepository.GetById(id)
        //CAMBIAR POR RESPUESTA MAS DE UNA API
                ?? throw new Exception("Usuario no encontrado.");
        return user;
    }

    public User GetUserInfoWithJoins(int id)
    {
        var user = _userRepository.GetByIdWithJoins(id)
        //CAMBIAR POR RESPUESTA MAS DE UNA API
                ?? throw new Exception("Usuario no encontrado.");
        return user;
    }

    public List<User> GetAllUsersInfo()
    {
        return _userRepository.List();
    }

    public void DeleteUser(int id)
    {
        var user = _userRepository.GetById(id);

        if (user == null)
            throw new Exception("Usuario no encontrado.");

        _userRepository.Delete(user);
    }

    public User? UpdateUser(int id, string email, string name, DateOnly birthDate, UserType userType)
    {
        var user = _userRepository.GetById(id);
        if (user == null) throw new Exception("Usuario no encontrado.");

        user.UpdateFields(email, name, birthDate, userType);
        _userRepository.Update(user);

        return user;
    }

    public User PromoteToProfessor(int id)
    {
        var user = _userRepository.GetById(id);
        if (user == null)
            throw new Exception("Usuario no encontrado.");

        if (user.UserType != UserType.Student)
            throw new InvalidOperationException("Solo los usuarios con rol 'Student' pueden convertirse en 'Professor'.");

        user.ChangeRole(UserType.Professor);

        _userRepository.Update(user);

        return user;
    }
}