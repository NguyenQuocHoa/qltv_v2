using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class BookCategory
    {
        public int Id { get; set; }
        public string BookCategoryCode { get; set; }
        public string BookCategoryName { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
