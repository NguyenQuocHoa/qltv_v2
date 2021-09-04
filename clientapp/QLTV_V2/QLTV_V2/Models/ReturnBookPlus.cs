using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Models
{
    public class ReturnBookPlus
    {
        public ReturnBook ReturnBook { get; set; }
        public List<ReturnBookDetail> ReturnBookDetails { get; set; }
    }
}
