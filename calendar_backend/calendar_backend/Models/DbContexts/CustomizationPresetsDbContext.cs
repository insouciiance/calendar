using Microsoft.EntityFrameworkCore;

namespace calendar_backend.Models.DbContexts
{
    public class CustomizationPresetsDbContext : DbContext
    {
        public DbSet<CustomizationPreset> CustomizationPresets { get; set; }

        public CustomizationPresetsDbContext(DbContextOptions<CustomizationPresetsDbContext> options) : base(options) { }
    }
}
