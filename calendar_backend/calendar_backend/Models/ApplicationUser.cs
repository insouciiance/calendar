using System;
using Microsoft.AspNetCore.Identity;

namespace calendar_backend.Models
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime DateRegistered { get; set; }
    }
}
