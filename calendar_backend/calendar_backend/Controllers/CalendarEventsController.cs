using calendar_backend.Models;
using calendar_backend.Models.DbContexts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace calendar_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CalendarEventsController : ControllerBase
    {
        private readonly CalendarEventsDbContext _calendarEvents;

        public CalendarEventsController(CalendarEventsDbContext calendarEvents)
        {
            _calendarEvents = calendarEvents;
        }

        private string[] countryCodes =
        {
            "AF",
            "AL",
            "DZ",
            "AR",
            "BE",
            "BY",
            "CA",
            "CC",
            "DK",
            "CN",
            "EE",
            "DE",
            "GR",
            "HK",
            "HU",
            "IS",
            "KZ",
            "LV",
            "LU",
            "NZ",
            "NO",
            "PL",
            "ES",
            "TH",
            "UA",
            "US",
            "RU"
        };

        private string[] eventNames =
        {
            "Welding",
            "Quotation",
            "Place",
            "Mug",
            "Rotten",
            "Agility",
            "Aggravation",
            "Acronym",
            "Tranquil",
            "Serendipity",
            "Flat",
            "Ghost",
            "Prompt",
            "Oblivious",
            "Query",
            "Household"
        };

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Post()
        {
            for (int i = 0; i < 1000; i++)
            {
                Random random = new Random();
                string name =
                    $"{eventNames[random.Next(0, eventNames.Length)]} {eventNames[random.Next(0, eventNames.Length)]}";
                int month = random.Next(1, 13);

                int day;
                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
                {
                    day = random.Next(1, 32);
                }
                else if (month == 2)
                {
                    day = random.Next(1, 29);
                }
                else
                {
                    day = random.Next(1, 31);
                }

                int hour = random.Next(0, 24);
                int minute = random.Next(0, 4) * 15;

                int countryIndex = random.Next(0, countryCodes.Length);

                CalendarEvent eEvent = new CalendarEvent
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = name,
                    Date = new DateTime(2021, month, day, hour, minute, 0),
                    NormalizedDate = new DateTime(2021, month, day),
                    Importance = random.Next(0, 3),
                    CountryCode = countryCodes[countryIndex]
                };

                _calendarEvents.Add(eEvent);
                _calendarEvents.SaveChanges();

            }

            return new JsonResult(_calendarEvents.CalendarEvents.ToArray());
        }

        //[HttpPost]
        //[AllowAnonymous]
        //public IActionResult PostData(string name)
        //{
        //    Random random = new Random();
        //    int month = random.Next(2, 7);

        //    int day;
        //    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
        //    {
        //        day = random.Next(1, 32);
        //    }
        //    else if (month == 2)
        //    {
        //        day = random.Next(1, 30);
        //    }
        //    else
        //    {
        //        day = random.Next(1, 31);
        //    }

        //    int hour = random.Next(0, 24);
        //    int minute = random.Next(0, 4) * 15;

        //    int countryIndex = random.Next(0, countryCodes.Length);

        //    CalendarEvent eEvent = new CalendarEvent
        //    {
        //        Id = Guid.NewGuid().ToString(),
        //        Name = name,
        //        Date = new DateTime(2020, month, day, hour, minute, 0),
        //        NormalizedDate = new DateTime(2020, month, day),
        //        Importance = random.Next(0, 3),
        //        CountryCode = countryCodes[countryIndex]
        //    };

        //    _calendarEvents.Add(eEvent);
        //    _calendarEvents.SaveChanges();

        //    return new JsonResult(eEvent);
        //}

        [HttpGet]
        public async Task<IActionResult> Get(string startDateIso, string endDateIso)
        {
            DateTime firstDate = DateTime.Parse(startDateIso.Replace(' ', '+'));
            DateTime secondDate = DateTime.Parse(endDateIso.Replace(' ', '+'));

            IEnumerable<CalendarEvent> events = await _calendarEvents.CalendarEvents
                .Where(x => x.Date >= firstDate && x.Date < secondDate.Date.AddHours(23).AddMinutes(59).AddSeconds(59))
                .OrderBy(x => x.Date)
                .Take(500)
                .ToArrayAsync();

            return !events.Any() ? new JsonResult(new CalendarEvent[0]) : new JsonResult(events);
        }

        [HttpGet]
        [Route("g")]
        public IActionResult GetGraphInfo(string startDateIso, string endDateIso)
        {
            DateTime firstDate = DateTime.Parse(startDateIso.Replace(' ', '+'));
            DateTime secondDate = DateTime.Parse(endDateIso.Replace(' ', '+'));

            int daysSpan = (secondDate.Date - firstDate.Date).Days + 1;

            DayEventsInfo[] dayEventsInfos = new DayEventsInfo[daysSpan];

            for (int i = 0; i < dayEventsInfos.Length; i++)
            {
                IEnumerable<CalendarEvent> fittingEvents = _calendarEvents.CalendarEvents.Where(x => x.NormalizedDate == firstDate.Date.AddDays(i));

                dayEventsInfos[i] = new DayEventsInfo(
                    ordinaryEvents: fittingEvents.Count(x => x.Importance == 0),
                    compellingEvents: fittingEvents.Count(x => x.Importance == 1),
                    importantEvents: fittingEvents.Count(x => x.Importance == 2),
                    date: firstDate.Date.AddDays(i)
                    );
            }

            return new JsonResult(dayEventsInfos);
        }
    }
}
