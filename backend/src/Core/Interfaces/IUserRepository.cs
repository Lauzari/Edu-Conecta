using System.Linq.Expressions;
using Core.Entities;

namespace Core.Interfaces;

public interface IUserRepository
{
    //It returns only the user info
    User? GetById(int id);

    //It returns the User info with joins (Professor Requests & Classses)
    User? GetByIdWithJoins(int id);

    User? GetByEmail(string email);

    List<User> List();

    User Add(User entity);

    User Update(User entity);

    void Delete(User entity);

    List<User> GetByExpression(Expression<Func<User, bool>> expression);

}