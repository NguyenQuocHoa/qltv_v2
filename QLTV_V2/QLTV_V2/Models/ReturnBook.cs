using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class ReturnBook
    {
        public Int64 Id { get; set; }
        public string ReturnBookCode { get; set; }
        public DateTime? ReturnDate { get; set; }
        public Int64? BorrowBook_Id { get; set; }
    }
}
