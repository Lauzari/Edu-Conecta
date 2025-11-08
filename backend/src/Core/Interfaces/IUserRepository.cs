using System.Linq.Expressions;
using Core.Entities;

namespace Core.Interfaces;

public interface IUserRepository
{
    //It returns only the user info
    Task<User?> GetByIdAsync(int id);

    //It returns the User info with joins (Professor Requests & Classses)
    Task<User?> GetByIdWithJoinsAsync(int id);

    Task<User?> GetByEmailAsync(string email);

    Task<IEnumerable<User>> GetUsersByRoleAsync(string role);

    Task<IEnumerable<User>> ListAsync();

    Task<User> AddAsync(User entity);

    Task<User> UpdateAsync(User entity);

    Task DeleteAsync(User entity);

}