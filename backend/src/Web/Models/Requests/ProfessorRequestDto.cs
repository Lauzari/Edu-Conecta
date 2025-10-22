using System;
using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace Web.Models.Requests
{
    public class ProfessorRequestDto
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        [StringLength(50)]
        public Subject Subject { get; set; } 

        [Required]
        [StringLength(100)]
        public string Description { get; set; } = string.Empty;



        

        
    }
}