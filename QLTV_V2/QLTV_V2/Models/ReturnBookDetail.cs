using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class ReturnBookDetail
    {
        public Int64 Id { get; set; }
        public string ReturnBookCode { get; set; }
        public Int64? Quantity { get; set; }
        public string Description { get; set; }
        public Int64? Sach_Id { get; set; }
        public Int64? ReturnBook_Id { get; set; }
    }
}
