namespace Core.Interfaces;

public interface IMailService
{
    Task Send(string subject, string message, string mailTo);

    Task SendToAdmins(string subject, string message);

    Task SendFirstContact(string name, string mail, string subject, string message);
}