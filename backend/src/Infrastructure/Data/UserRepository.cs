using System.Linq.Expressions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _applicationDbContext;
    public UserRepository(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<User> AddAsync(User entity)
    {
        await _applicationDbContext.Users.AddAsync(entity);
        await _applicationDbContext.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(User entity)
    {
        _applicationDbContext.Users.Remove(entity);
        await _applicationDbContext.SaveChangesAsync();
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _applicationDbContext.Users.FirstOrDefaultAsync(a => a.Email == email);
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _applicationDbContext.Users.FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<IEnumerable<User>> GetUsersByRoleAsync(string role)
    {
        return await _applicationDbContext.Users
        .Where(u => u.UserType.ToString() == role)
        .ToListAsync();
    }

    public async Task<User?> GetByIdWithJoinsAsync(int id)
    {
        return await _applicationDbContext.Users
        .Include(u => u.Requests)
        .Include(u => u.Classes)
            .ThenInclude(c => c.Subject)
        .Include(u => u.Classes)
            .ThenInclude(c => c.Teacher)
        .FirstOrDefaultAsync(u => u.Id == id);
    }


    public async Task<IEnumerable<User>> ListAsync()
    {
        return await _applicationDbContext.Users.ToListAsync();
    }

    public async Task<User> UpdateAsync(User entity)
    {
        _applicationDbContext.Users.Update(entity);
        await _applicationDbContext.SaveChangesAsync();
        return entity;
    }
}