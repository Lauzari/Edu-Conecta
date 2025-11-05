using System.ComponentModel.DataAnnotations;
using Core.Enums;

namespace Models.Requests;

public record UpdateSubjectRequest(
    [Required]
    int Id,

    [Required]
    int Year,

    [MaxLength(100)]
    [Required]
    string Name,

    [MaxLength(200)]
    string Description,

    [Required]
    int Duration
);