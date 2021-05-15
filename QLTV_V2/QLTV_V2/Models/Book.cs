using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string BookCode { get; set; }
        public string BookName { get; set; }
        public int Inventory { get; set; }
        public string Author { get; set; }
        public string MainContent { get; set; }
        public string Description { get; set; }
        public int? BookCategory_Id { get; set; }
    }
}
