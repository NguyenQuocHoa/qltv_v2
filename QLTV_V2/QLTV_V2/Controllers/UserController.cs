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
    public class UserController : ControllerBase
    {
        private readonly UserBLL _userBLL;
        public UserController(ApplicationDbContext context)
        {
            _userBLL = new UserBLL(context);
        }

        [HttpGet("get-all")]
        public ResultModel Get()
        {
            try
            {
                return new ResultModel(Code.OK, _userBLL.GetAll(), "thành công");
            }
            catch(Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpGet("get-all-active")]
        public ResultModel GetActive()
        {
            try
            {
                return new ResultModel(Code.OK, _userBLL.GetActive(), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpGet("get-by-id/{id}")]
        public ResultModel Get(int id)
        {
            try
            {
                return new ResultModel(Code.OK, _userBLL.GetById(id), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPost("create")]
        public ResultModel Post([FromBody] User user)
        {
            try
            {
                _userBLL.AddUser(user);
                return new ResultModel(Code.CREATED, "thành công");
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("User name can't duplicate"))
                {
                    return new ResultModel(Code.CONFLICT, "username đã tồn tại");
                }
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPut("update/{id}")]
        public ResultModel Put(int id, [FromBody] User user)
        {
            try
            {
                _userBLL.EditUser(id, user);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPut("reset_password/{id}")]
        public ResultModel ResetPassword(int id)
        {
            try
            {
                _userBLL.ResetPassword(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception ex)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpDelete("delete/{id}")]
        public ResultModel Delete(int id)
        {
            try
            {
                _userBLL.DeleteUser(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception ex)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }
    }
}
