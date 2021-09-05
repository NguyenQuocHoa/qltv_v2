using System;
using System.Collections.Generic;
using System.Text;

namespace QLTV_V2.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string StudentCode { get; set; }
        public string StudentName { get; set; }
        public string Class { get; set; }
        public DateTime? DoB { get; set; }
        public string NativeLand { get; set; }
        public string Course { get; set; }
        public string Faculty { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }
        public string Password { get; set; }
    }
}
