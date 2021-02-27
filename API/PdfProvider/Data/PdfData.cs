using System.Collections.Generic;

namespace API.Data
{
    public class PdfData
    {
        public string DocumentTitle { get; set; }

        public string CreatedBy { get; set; }

        public string Description { get; set; }

        public List<ItemsToDisplay>  DisplayListItems { get; set; }
        public string DocumentName { get; set; }
    }
}