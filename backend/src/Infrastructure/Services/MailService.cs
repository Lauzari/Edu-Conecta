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

        public MailService(IConfiguration configuration)
        {
            _mailFrom = configuration["mailSettings:mailFromAddress"];
            _smtpHost = configuration["mailSettings:host"];
            _smtpPort = int.Parse(configuration["mailSettings:port"] ?? "587");
            _smtpUser = configuration["mailSettings:username"];
            _smtpPass = configuration["mailSettings:password"];
        }

        public void Send(string subject, string message, string mailTo)
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
    }
}
