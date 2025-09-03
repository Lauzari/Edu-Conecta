using Microsoft.EntityFrameworkCore;

namespace Backend
{
    public class DbContext : DbContext
    {
        public DbContext(DbContextOptions<DbContext> options) : base(options) { }

        // Aquí van tus tablas
        public DbSet<Usuario> Usuarios { get; set; }
    }

    // Ejemplo de tabla
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
    }
}
