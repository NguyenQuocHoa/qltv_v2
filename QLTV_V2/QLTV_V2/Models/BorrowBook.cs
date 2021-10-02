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
        public int? NumberOfDayBorrow { get; set; }
        public string Description { get; set; }
        public int? Student_Id { get; set; }
        public bool IsReturn { get; set; }
    }
}
