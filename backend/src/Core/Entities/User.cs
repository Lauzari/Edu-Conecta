using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Enums;

namespace Core.Entities;

public class User
{
    public virtual ICollection<ProfessorRequest> Requests { get; set; } = new List<ProfessorRequest>();

    public ICollection<Class> Classes { get; set; } = new List<Class>();
    // RECORDATORIO: cuando un usuario cambie de student a professor, hay que borrar
    // la lista de cursos y cuando un user se quiera inscribir a una clase, hay que verificar que
    // sea de tipo Student

    [Column(Order = 0)]
    [Key]
    public int Id { get; set; }

    [Column(Order = 1)]
    [Required]
    [MaxLength(100)]
    public string Email { get; set; }

    [Column(Order = 2)]
    [Required]
    public string Password { get; set; }

    [Column(Order = 3)]
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }


    [Column(Order = 4)]
    [Required]
    public DateOnly BirthDate { get; set; }

    [Column(Order = 5)]
    [Required]
    public DateTime RegisterDate { get; set; }

    [Column(Order = 6)]
    [Required]
    public UserType UserType { get; set; }

    // Added for the ORM mapping
    private User()
    {

    }

    public User(string Email, string Password, string Name, DateOnly BirthDate, UserType UserType)
    {
        this.Email = Email;
        this.Password = Password;
        this.Name = Name;
        this.BirthDate = BirthDate;
        this.UserType = UserType;
        this.RegisterDate = DateTime.Now;
    }

    public void UpdateFields(string email, string name, DateOnly birthDate, UserType userType)
    {
        Email = email;
        Name = name;
        BirthDate = birthDate;
        ChangeRole(userType);
    }

    public void ChangeRole(UserType newRole)
    {
        if (UserType == UserType.Student && newRole != UserType.Student)
            Classes.Clear();
        UserType = newRole;
    }
}