using Microsoft.AspNetCore.Mvc;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.DAL
{
    public class RoleDAL
    {
        private readonly ApplicationDbContext _context;
        public RoleDAL(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                var roles = _context.Role.Select(role => role);
                return roles;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from RoleDAL: " + ex.Message.ToString());
            }
        }
    }
}
