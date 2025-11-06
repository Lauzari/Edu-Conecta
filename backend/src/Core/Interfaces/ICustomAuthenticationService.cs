namespace Core.Interfaces;

public interface ICustomAuthenticationService
{
    Task<string> Autenticar(string email, string password);
}