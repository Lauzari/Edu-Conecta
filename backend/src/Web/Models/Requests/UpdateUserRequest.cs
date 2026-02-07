using System.ComponentModel.DataAnnotations;
using Core.Enums;

namespace Models.Requests;

public record UpdateUserRequest(

    [Required]
    int? TargetUserId,

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