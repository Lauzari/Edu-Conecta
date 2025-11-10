using Core.Interfaces;

namespace Infrastructure.Data.Seeding
{
    public static class AdminSeeder
    {
        public static async Task SeedAdminAsync(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            using var scope = serviceProvider.CreateScope();
            var userService = scope.ServiceProvider.GetRequiredService<IUserService>();

            string adminEmail = configuration["AdminCredentials:Email"];
            string adminPassword = configuration["AdminCredentials:Password"];

            if (string.IsNullOrWhiteSpace(adminEmail) || string.IsNullOrWhiteSpace(adminPassword))
                throw new Exception("Admin credentials are not set in configuration.");

            var existingAdmin = await userService.GetByEmailAsync(adminEmail);
            if (existingAdmin != null) return;

            await userService.CreateAdminAsync(
                adminEmail,
                adminPassword,
                "Admin",
                DateOnly.FromDateTime(DateTime.Now)
            );
        }
    }
}
