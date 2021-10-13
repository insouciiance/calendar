using System;

namespace calendar_backend.Models
{
    public class DayEventsInfo
    {
        public int OrdinaryEvents { get; set; }
        public int CompellingEvents { get; set; }
        public int ImportantEvents { get; set; }
        public DateTime Date { get; set; }

        public DayEventsInfo(int ordinaryEvents, int compellingEvents, int importantEvents, DateTime date)
        {
            OrdinaryEvents = ordinaryEvents;
            CompellingEvents = compellingEvents;
            ImportantEvents = importantEvents;
            Date = date;
        }
    }
}
