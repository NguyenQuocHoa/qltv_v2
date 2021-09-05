using Microsoft.AspNetCore.Mvc;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.DAL
{
    public class PermissionDAL
    {
        private readonly ApplicationDbContext _context;
        public PermissionDAL(ApplicationDbContext context)
        {
            _context = context;
        }

        public ActionResult<Object> GetPermissionByUserRole(int userId, int roleId)
        {
            try
            {
                var permissions = _context.Permission
                    .Where(permission => permission.Role_Id == roleId && permission.User_Id == userId).FirstOrDefault();
                return permissions;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PermissionDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllUserPermission(int userId)
        {
            try
            {
                var permissions = _context.Permission.Where(permission => permission.User_Id == userId)
                    .Select(permission => new { 
                        permission.Id,
                        permission.Role_Id,
                        permission.View,
                        permission.Create,
                        permission.Update,
                        permission.Delete
                    });
                return permissions;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PermissionDAL: " + ex.Message.ToString());
            }
        }
    }
}
