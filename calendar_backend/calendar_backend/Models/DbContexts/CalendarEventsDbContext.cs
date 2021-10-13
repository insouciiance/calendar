using Microsoft.EntityFrameworkCore;

namespace calendar_backend.Models.DbContexts
{
    public class CalendarEventsDbContext : DbContext
    {
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
        public CalendarEventsDbContext(DbContextOptions<CalendarEventsDbContext> options) : base(options) { }
    }
}
