using Core.Interfaces;

namespace Infrastructure.Data.Seeding
{
    public static class AdminSeeder
    {
        public static async Task SeedAdminAsync(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            using var scope = serviceProvider.CreateScope();
            var userService = scope.ServiceProvider.GetRequiredService<IUserService>();

            string adminEmail = Environment.GetEnvironmentVariable("ADMIN_EMAIL")
                                ?? configuration["AdminCredentials:Email"];
            string adminPassword = Environment.GetEnvironmentVariable("ADMIN_PASSWORD")
                                   ?? configuration["AdminCredentials:Password"];

            if (string.IsNullOrWhiteSpace(adminEmail) || string.IsNullOrWhiteSpace(adminPassword))
                throw new Exception("Admin credentials are not set.");

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
