using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class BorrowBook
    {
        public int Id { get; set; }
        public string BorrowBookCode { get; set; }
        public DateTime? BorrowDate { get; set; }
        public Int64? NumberOfDayBorrow { get; set; }
        public string Description { get; set; }
        public Int64? Student_Id { get; set; }
    }
}
