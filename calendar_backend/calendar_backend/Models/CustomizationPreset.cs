using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace calendar_backend.Models
{
    public class CustomizationPreset
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string PresetName { get; set; }
        public string OrdinaryColor { get; set; }
        public string CompellingColor { get; set; }
        public string ImportantColor { get; set; }
        public int UpperPanelScrollSpeed { get; set; }
        public int BottomPanelScrollSpeed { get; set; }
        public int BottomPanelScrollDistance { get; set; }
        public string FontFamily { get; set; }
    }
}
