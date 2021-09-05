using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class ReturnBookDetail
    {
        public int Id { get; set; }
        public string ReturnBookDetailCode { get; set; }
        public int? Quantity { get; set; }
        public string Description { get; set; }
        public int? Book_Id { get; set; }
        public int? ReturnBook_Id { get; set; }
    }
}
