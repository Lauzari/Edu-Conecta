using System.Threading.Tasks;
using Core.Entities;
using Core.Enums;
using Core.Exceptions;
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
        var existingUser = await _userRepository.GetByEmailAsync(Email);
        if (existingUser != null)
        {
            throw new AppValidationException("El usuario ya existe");
        }

        string passwordHash = BCrypt.Net.BCrypt.HashPassword(Password);
        var newUser = new User(Email, passwordHash, Name, BirthDate, UserType.Student);

        await _userRepository.AddAsync(newUser);

        return newUser;
    }

    public async Task<User> CreateAdminAsync(string Email, string Password, string Name, DateOnly BirthDate)

    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(Password);
        var newUser = new User(Email, passwordHash, Name, BirthDate, UserType.Admin);

        await _userRepository.AddAsync(newUser);

        return newUser;
    }

    public async Task<User> GetUserInfoAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id)
                ?? throw new NotFoundException("User Not Found.");
        return user;
    }

    public async Task<User> GetUserInfoWithJoinsAsync(int id)
    {
        var user = await _userRepository.GetByIdWithJoinsAsync(id)
                ?? throw new NotFoundException("User Not Found.");
        return user;
    }

    public async Task<IEnumerable<User>> GetAllUsersInfoAsync()
    {
        return await _userRepository.ListAsync();
    }

    public async Task DeleteUserAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id) ?? throw new NotFoundException("User Not Found.");

        await _userRepository.DeleteAsync(user);
    }

    public async Task<User> UpdateUserAsync(int id, string email, string name, DateOnly birthDate, UserType userType)
    {
        var user = await _userRepository.GetByIdAsync(id) ?? throw new NotFoundException("User Not Found.");

        user.UpdateFields(email, name, birthDate, userType);
        await _userRepository.UpdateAsync(user);

        return user;
    }

    public async Task ChangePasswordAsync(int userId, string currentPassword, string newPassword)
    {
        var user = await _userRepository.GetByIdAsync(userId)
             ?? throw new NotFoundException("Usuario no encontrado.");

    
        bool passwordValid = BCrypt.Net.BCrypt.Verify(currentPassword, user.Password);
             if (!passwordValid)
                throw new AppValidationException("La contraseña actual es incorrecta.");

    
        if (BCrypt.Net.BCrypt.Verify(newPassword, user.Password))
            throw new AppValidationException("La nueva contraseña no puede ser igual a la actual.");

    
        string newHashedPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);
            user.UpdatePassword(newHashedPassword);

        await _userRepository.UpdateAsync(user);
}

    public async Task<User> PromoteToProfessor(int id)
    {
        var user = await _userRepository.GetByIdWithJoinsAsync(id) ?? throw new NotFoundException("User Not Found.");

        if (user.UserType != UserType.Student)
            //Agregamos un nuevo tipo de error como "BussinessRuleException"???
            throw new InvalidOperationException("Solo los usuarios con rol 'Student' pueden convertirse en 'Professor'.");

        user.ChangeRole(UserType.Professor);

        await _userRepository.UpdateAsync(user);

        return user;
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        var user = await _userRepository.GetByEmailAsync(email);
        return user;
    }
}