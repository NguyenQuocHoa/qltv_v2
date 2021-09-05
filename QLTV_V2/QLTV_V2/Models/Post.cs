using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string CodePost { get; set; }
        public string Message { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
    }
}
