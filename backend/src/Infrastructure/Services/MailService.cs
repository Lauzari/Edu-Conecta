using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;

namespace Infrastructure.Services
{
    public class MailService : IMailService
    {
        private readonly string _mailFrom;
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUser;
        private readonly string _smtpPass;

        private readonly IUserRepository _userRepository;

        public MailService(IConfiguration configuration, IUserRepository userRepository)
        {
            _mailFrom = configuration["mailSettings:mailFromAddress"];
            _smtpHost = configuration["mailSettings:host"];
            _smtpPort = int.Parse(configuration["mailSettings:port"] ?? "587");
            _smtpUser = configuration["mailSettings:username"];
            _smtpPass = configuration["mailSettings:password"];
            _userRepository = userRepository;
        }

        public async Task Send(string subject, string message, string mailTo)
        {
            try
            {
                using var client = new SmtpClient(_smtpHost, _smtpPort)
                {
                    Credentials = new NetworkCredential(_smtpUser, _smtpPass),
                    EnableSsl = true
                };

                var mail = new MailMessage(_mailFrom, mailTo, subject, message);
                client.Send(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error enviando mail: {ex.Message}");
                throw;
            }
        }

        public async Task SendToAdmins(string subject, string message)
        {
            var admins = await _userRepository.GetUsersByRoleAsync("Admin");
            foreach (var admin in admins)
            {
                await Send(subject, message, admin.Email);
            }
        }

        public async Task SendFirstContact(string name, string mail, string subject, string message)
        {
            string editedSubject = $"Contacto desde EduConecta: {subject}";
            string body = $"{name} quiere contactarse contigo desde EduConecta.\n" +
                        $"Fecha: {DateTime.Now}\n" +
                        $"Email: {mail}\n" +
                        $"Mensaje: {message}";

            await SendToAdmins(editedSubject, body);
        }
    }
}
