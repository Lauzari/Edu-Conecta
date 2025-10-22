using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Tablas de la base de datos
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<ProfessorRequest> ProfessorRequests { get; set; }

        // Configuración adicional (relaciones, restricciones, etc.)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ejemplo: configuración opcional
            // modelBuilder.Entity<ProfessorRequest>()
            //     .HasOne(p => p.Subject)
            //     .WithMany(s => s.ProfessorRequests)
            //     .HasForeignKey(p => p.SubjectId);
        }
    }
}
