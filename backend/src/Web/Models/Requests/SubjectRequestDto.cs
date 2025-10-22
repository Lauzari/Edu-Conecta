using System;
using Core.Entities;


namespace Web.Models.Requests
{
    public record SubjectRequestDto
   (
        string Name,
    int Year,
        string Description,
        
        int Duration

       
    );
}