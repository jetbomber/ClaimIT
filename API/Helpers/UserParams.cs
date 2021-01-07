namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        private string _filter = "";
        private string _sortColumn = "companyName";
        private bool _reverse = false;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string Filter
        {
            get => _filter;
            set => _filter = value;
        }

        public string SortColumn
        {
            get => _sortColumn;
            set => _sortColumn = value;
        }

        public bool Reverse
        {
            get => _reverse;
            set => _reverse = value;
        }
    }
}