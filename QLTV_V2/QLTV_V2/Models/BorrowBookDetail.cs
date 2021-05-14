using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class BorrowBookDetail
    {
        public int Id { get; set; }
        public string BorrowBookDetailCode { get; set; }
        public int? Quantity { get; set; }
        public string Description { get; set; }
        public int? Book_Id { get; set; }
        public int? BorrowBook_Id { get; set; }
    }
}
