using System.Collections.Generic;
using System.IO;
using API.Data;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PdfController : BaseApiController
    {
        private readonly IPdfSharpService _pdfService;
        public PdfController(IPdfSharpService pdfService)
        {
            _pdfService = pdfService;
        }

        //[Route("CreatePdf")]
        [HttpGet]
        public FileStreamResult CreatePdf()
        {
            var data = new PdfData
            {
                DocumentTitle = "This is my demo document Title",
                DocumentName = "myFirst",
                CreatedBy = "Damien",
                Description = "some data description which I have, and want to display in the PDF file..., This is another text, what is happening here, why is this text display...",
                DisplayListItems = new List<ItemsToDisplay>
                {
                    new ItemsToDisplay{ Id = "Print Servers", Data1= "some data", Data2 = "more data to display"},
                    new ItemsToDisplay{ Id = "Network Stuff", Data1= "IP4", Data2 = "any left"},
                    new ItemsToDisplay{ Id = "Job details", Data1= "too many", Data2 = "say no"},
                    new ItemsToDisplay{ Id = "Firewall", Data1= "what", Data2 = "Let's burn it"}

                }
            };
            var path = _pdfService.CreatePdf(data);

            var stream = new FileStream(path, FileMode.Open);
            return File(stream, "application/pdf");
        }
    }
}