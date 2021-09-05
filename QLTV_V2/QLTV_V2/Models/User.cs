using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }
    }
}
