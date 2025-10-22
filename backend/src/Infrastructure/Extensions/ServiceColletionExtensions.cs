using Core.Interfaces;
using Core.Services;
using Infrastructure.Data;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // Repositorios
            services.AddScoped<IProfessorRequestRepository, ProfessorRequestRepository>();
            services.AddScoped<ISubjectRepository, SubjectRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IClassRepository, ClassRepository>();


            // Servicios
            services.AddScoped<IProfessorRequestService, ProfessorRequestService>();
            services.AddScoped<ISubjectService, SubjectService>();
            services.AddScoped<IUserService, UserService>();



            return services;
        }
    }
}
