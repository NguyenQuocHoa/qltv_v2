using QLTV_V2.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Helper
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(string username, string password, ApplicationDbContext context);
    }
}
