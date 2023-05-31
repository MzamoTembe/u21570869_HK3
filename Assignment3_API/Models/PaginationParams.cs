namespace Assignment3_Backend.Models
{
    public class PaginationParams
    {
        public string? searchTerm { get; set; }
        public string? sortOrder { get; set; }
        public string? mybrand { get; set; }
        public string? mytype { get; set; }
        public int pageSize { get; set; } = 4;

        public int pageIndex { get; set; } = 1;

    }
}
