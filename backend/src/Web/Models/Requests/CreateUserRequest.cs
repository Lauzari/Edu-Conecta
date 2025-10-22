using System.ComponentModel.DataAnnotations;
using Core.Enums;

namespace Core.Models.Requests;

public record CreateUserRequest(
    [Required, MaxLength(100)]
    string Email,

    [Required, MaxLength(50)]
    string Password,

    [Required, MaxLength(100)]
    string Name,

    [Required]
    DateOnly BirthDate,

    [Required]
    UserType UserType
);