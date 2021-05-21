using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Helper
{
    public class Error
    {
        public Error(int status, string message)
        {
            this.status = status;
            this.message = message;
        }
        public Error(int status, string name, string message) : this(status, message)
        {
            this.name = name;
        }
        public int status { get; set; }
        public string name { get; set; }
        public string message { get; set; }
    }
}
