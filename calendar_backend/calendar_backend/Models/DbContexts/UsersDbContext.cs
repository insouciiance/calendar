using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace calendar_backend.Models.DbContexts
{
    public class UsersDbContext : IdentityDbContext<ApplicationUser>
    {
        public new DbSet<ApplicationUser> Users { get; set; }
        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options) { }
    }
}
