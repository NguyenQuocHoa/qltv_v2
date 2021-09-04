using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Helper
{
    public class StatusCode
    {
        public enum Code
        {
            OK = 200,
            CREATED = 201,
            UNAUTHORIZED = 401,
            NOTFOUND = 404,
            SVERROR = 500
        }
    }
}
