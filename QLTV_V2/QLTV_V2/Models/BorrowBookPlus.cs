using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Models
{
    public class BorrowBookPlus
    {
        public BorrowBook BorrowBook { get; set; }
        public List<BorrowBookDetail> BorrowBookDetails { get; set; }
    }
}
