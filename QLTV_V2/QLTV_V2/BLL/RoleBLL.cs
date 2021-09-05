using Microsoft.AspNetCore.Mvc;
using QLTV_V2.DAL;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.BLL
{
    public class RoleBLL
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleDAL _roleDAL;

        public RoleBLL(ApplicationDbContext context)
        {
            _context = context;
            _roleDAL = new RoleDAL(_context);
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                return _roleDAL.GetAll();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }
    }
}
