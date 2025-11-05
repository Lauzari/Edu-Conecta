using System;
using System.Collections.Generic;
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
        public DbSet<User> Users { get; set; }
        public DbSet<Class> Classes { get; set; }

        // Configuración adicional (relaciones, restricciones, etc.)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // --- Relation Many to One: Professor -> Class ---
            modelBuilder.Entity<Class>()
                .HasOne(c => c.Teacher)
                .WithMany()
                .HasForeignKey(c => c.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

            // --- Relation Many to Many: Students -> Classes ---
            modelBuilder.Entity<Class>()
                .HasMany(c => c.Students)
                .WithMany(u => u.Classes)
                .UsingEntity(j => j.ToTable("ClassStudents")); // Intermediate Table
        }
    }
}
