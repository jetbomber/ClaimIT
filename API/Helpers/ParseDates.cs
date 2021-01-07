using System;

namespace API.Helpers
{
    public static class ParseDates
    {
        public static DateTime ParseDate(DateTime datetime)
        {
            if (datetime == null) return datetime;
            var wholeDateTime = DateTime.Parse(datetime.ToString());
            var datePortion = wholeDateTime - wholeDateTime.TimeOfDay;
            return datePortion;
        }
        public static DateTime? ParseDate(DateTime? datetime)
        {
            if (datetime == null) return datetime;
            var wholeDateTime = DateTime.Parse(datetime.ToString());
            var datePortion = wholeDateTime - wholeDateTime.TimeOfDay;
            return datePortion;
        }
    }
}