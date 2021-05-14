using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class BorrowBookDetail
    {
        public Int64 Id { get; set; }
        public string BorrowBookDetailCode { get; set; }
        public Int64? Quantity { get; set; }
        public string Description { get; set; }
        public Int64? Sach_Id { get; set; }
        public Int64? BorrowBook_Id { get; set; }
    }
}
