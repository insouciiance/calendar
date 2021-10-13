using System;

namespace calendar_backend.Models
{
    public class CalendarEvent
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public DateTime NormalizedDate { get; set; }
        public int Importance { get; set; }
        public string CountryCode { get; set; }
    }
}
