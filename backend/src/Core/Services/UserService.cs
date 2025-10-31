using System.Threading.Tasks;
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

    public async Task<User> CreateUserAsync(string Email, string Password, string Name, DateOnly BirthDate)

    {
       var newUser = new User(Email, Password, Name, BirthDate, UserType.Student);

        await _userRepository.AddAsync(newUser);

        return newUser;
    }

    public async Task<User> GetUserInfoAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id)
        //CAMBIAR POR RESPUESTA MAS DE UNA API
                ?? throw new Exception("Usuario no encontrado.");
        return user;
    }

    public async Task<User> GetUserInfoWithJoinsAsync(int id)
    {
        var user = await _userRepository.GetByIdWithJoinsAsync(id)
        //CAMBIAR POR RESPUESTA MAS DE UNA API
                ?? throw new Exception("Usuario no encontrado.");
        return user;
    }

    public async Task<IEnumerable<User>> GetAllUsersInfoAsync()
    {
        return await _userRepository.ListAsync();
    }

    public async Task DeleteUserAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user == null)
            throw new Exception("Usuario no encontrado.");

        await _userRepository.DeleteAsync(user);
    }

    public async Task<User> UpdateUserAsync(int id, string email, string name, DateOnly birthDate, UserType userType)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) throw new Exception("Usuario no encontrado.");

        user.UpdateFields(email, name, birthDate, userType);
        await _userRepository.UpdateAsync(user);

        return user;
    }

    public async Task<User> PromoteToProfessor(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
            throw new Exception("Usuario no encontrado.");

        if (user.UserType != UserType.Student)
            throw new InvalidOperationException("Solo los usuarios con rol 'Student' pueden convertirse en 'Professor'.");

        user.ChangeRole(UserType.Professor);

        await _userRepository.UpdateAsync(user);

        return user;
    }
}