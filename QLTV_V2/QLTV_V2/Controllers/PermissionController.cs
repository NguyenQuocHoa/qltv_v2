using Microsoft.AspNetCore.Mvc;
using QLTV_V2.BLL;
using QLTV_V2.Data;
using QLTV_V2.Helper;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static QLTV_V2.Helper.StatusCode;
namespace QLTV_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly PermissionBLL _permissionBLL;
        public PermissionController(ApplicationDbContext context)
        {
            _permissionBLL = new PermissionBLL(context);
        }

        [HttpGet("get-permission-detail")]
        public ResultModel GetPermissionByUserRole(int roleId)
        {
            int userId = 7;
            try
            {
                var resultQuery = _permissionBLL.GetPermissionByUserRole(userId, roleId);
                return new ResultModel(Code.OK, resultQuery, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpGet("get-permission-list")]
        public ResultModel GetAllUserPermission()
        {
            int userId = 7;
            try
            {
                var resultQuery = _permissionBLL.GetAllUserPermission(userId);
                return new ResultModel(Code.OK, resultQuery, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }
    }
}
