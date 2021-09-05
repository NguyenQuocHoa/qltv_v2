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
    public class PermissionBLL
    {
        private readonly ApplicationDbContext _context;
        private readonly PermissionDAL _permissionDAL;

        public PermissionBLL(ApplicationDbContext context)
        {
            _context = context;
            _permissionDAL = new PermissionDAL(_context);
        }

        public ActionResult<Object> GetPermissionByUserRole(int userId, int roleId)
        {
            try
            {
                return _permissionDAL.GetPermissionByUserRole(userId, roleId);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PermissionBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllUserPermission(int userId)
        {
            try
            {
                return _permissionDAL.GetAllUserPermission(userId);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }
    }
}
