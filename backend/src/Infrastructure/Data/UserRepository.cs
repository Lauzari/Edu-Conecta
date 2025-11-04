using System.Linq.Expressions;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _applicationDbContext;
    public UserRepository(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public User Add(User entity)
    {
        _applicationDbContext.Users.Add(entity);
        _applicationDbContext.SaveChanges();
        return entity;
    }

    public void Delete(User entity)
    {
        _applicationDbContext.Users.Remove(entity);
        _applicationDbContext.SaveChanges();
    }

    public User? GetByEmail(string email)
    {
        return _applicationDbContext
        .Users
        .FirstOrDefault(a => a.Email == email);
    }

    public User? GetById(int id)
    {
        return _applicationDbContext.Users
        .FirstOrDefault(a => a.Id == id);
    }

    public User? GetByIdWithJoins(int id)
    {
        return _applicationDbContext.Users
        // AGREGAR CUANDO TENGAMOS LAS DEMÁS ENTIDADES
        // .Include(x => x.Requests)
        // .Include(x => x.Courses)
        .FirstOrDefault(a => a.Id == id);
    }


    public List<User> List()
    {
        return _applicationDbContext.Users
        .ToList();
    }

    public User Update(User entity)
    {
        _applicationDbContext.Users.Update(entity);
        _applicationDbContext.SaveChanges();
        return entity;
    }

    public List<User> GetByExpression(Expression<Func<User, bool>> expression)
    {
        return _applicationDbContext.Users.Where(expression).ToList();
    }
}