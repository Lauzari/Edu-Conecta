using Core.Interfaces;
using Core.Services;
using Infrastructure.Repositories;
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

            // Servicios
            services.AddScoped<IProfessorRequestService, ProfessorRequestService>();
            services.AddScoped<ISubjectService, SubjectService>();

            return services;
        }
    }
}
