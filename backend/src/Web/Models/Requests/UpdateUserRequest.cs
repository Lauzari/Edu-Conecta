using System.ComponentModel.DataAnnotations;
using Core.Enums;

namespace Core.Models.Requests;

public record UpdateUserRequest(
    [Required]
    int Id,

    [MaxLength(100)]
    [Required]
    string Email,

    [MaxLength(100)]
    [Required]
    string Name,

    [Required]
    DateOnly BirthDate,

    [Required]
    UserType UserType
);