using System.ComponentModel.DataAnnotations;
using Core.Enums;

namespace Web.Models.Requests;

public record CreateSubjectRequest(
    [Required, MaxLength(100)]
    string Name,

    [Required]
    int Year,

    [Required, MaxLength(200)]
    string Description,

    [Required]
    int Duration
);