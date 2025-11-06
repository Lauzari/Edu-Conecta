using Core.Entities;
using Core.Enums;
using Core.Exceptions;
using Core.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Services
{
    public class AuthenticationService : ICustomAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly AuthenticationServiceOptions _options;

        public AuthenticationService(IUserRepository userRepository, IOptions<AuthenticationServiceOptions> options)
        {
            _userRepository = userRepository;
            _options = options.Value;

            Console.WriteLine($"Issuer: {_options.Issuer}");
            Console.WriteLine($"SecretForKey: {_options.SecretForKey}");
        }

        private async Task<User?> ValidateUserAsync(string email, string password, string userType)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                throw new AppValidationException("There is information missing in the request.");

            if (!Enum.TryParse<UserType>(userType, ignoreCase: true, out var verifiedUserType))
                throw new AppValidationException("Invalid user type.");

            var user = await _userRepository.GetByEmailAsync(email)
                ?? throw new NotFoundException("User not found.");

            if (user.UserType != verifiedUserType)
                throw new AppValidationException("User type mismatch.");

            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
                throw new AppValidationException("Invalid password.");

            return user;
        }

        public async Task<string> Autenticar(string email, string password, string userType)
        {
            var user = await ValidateUserAsync(email, password, userType) ?? throw new Exception("User authentication failed");

            var securityPassword = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_options.SecretForKey)); //Traemos la SecretKey del Json. agregar antes: using Microsoft.IdentityModel.Tokens;

            var credentials = new SigningCredentials(securityPassword, SecurityAlgorithms.HmacSha256);

            var claimsForToken = new List<Claim>
            {
                new("sub", user.Id.ToString()),
                new("name", user.Name), // First and last name are in the same variable
                new("role", userType)
            };

            var jwtSecurityToken = new JwtSecurityToken( //agregar using System.IdentityModel.Tokens.Jwt; Acá es donde se crea el token con toda la data que le pasamos antes.
              _options.Issuer,
              _options.Audience,
              claimsForToken,
              DateTime.UtcNow,
              DateTime.UtcNow.AddHours(1),
              credentials);

            var tokenToReturn = new JwtSecurityTokenHandler() //Pasamos el token a string
                .WriteToken(jwtSecurityToken);

            return tokenToReturn.ToString();
        }

        public class AuthenticationServiceOptions
        {
            public const string AuthenticationService = "AuthenticationService";

            public string Issuer { get; set; }
            public string Audience { get; set; }
            public string SecretForKey { get; set; }
        }

    }
}