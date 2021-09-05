using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class User : UserLogin
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }
    }
}
