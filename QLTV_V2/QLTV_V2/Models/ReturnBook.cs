using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class ReturnBook
    {
        public int Id { get; set; }
        public string ReturnBookCode { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int? BorrowBook_Id { get; set; }
        //public List<ReturnBookDetail> ReturnBookDetails { get; set; }
    }
}
