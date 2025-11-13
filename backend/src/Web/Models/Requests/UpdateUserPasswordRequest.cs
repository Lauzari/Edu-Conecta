using System.ComponentModel.DataAnnotations;
namespace Models.Requests;

public record UpdateUserPasswordRequest
(
      [Required, MaxLength(50)]
       string CurrentPassword, 

      [Required, MaxLength(50)]
       string NewPassword 
);

