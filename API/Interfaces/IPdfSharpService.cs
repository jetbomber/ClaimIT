using API.Data;

namespace API.Interfaces
{
    public interface IPdfSharpService
    {
        string CreatePdf(PdfData pdfData);
    }
}