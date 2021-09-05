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
    public class StudentController : ControllerBase
    {
        private readonly StudentBLL _studentBLL;
        public StudentController(ApplicationDbContext context)
        {
            _studentBLL = new StudentBLL(context);
        }

        [HttpGet("get-all")]
        public ResultModel Get()
        {
            try
            {
                int total = _studentBLL.getCountStudent();
                return new ResultModel(Code.OK, _studentBLL.GetAll(), total, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpGet("get-all-paging")]
        public ResultModel GetAllPaging(int pageIndex, int pageSize)
        {
            try
            {
                int total = _studentBLL.getCountStudent();
                return new ResultModel(Code.OK, _studentBLL.GetAllPaging(pageIndex, pageSize), total, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpGet("get-all-active")]
        public ResultModel GetActive()
        {
            try
            {
                int totalActive = _studentBLL.getCountActiveStudent();
                return new ResultModel(Code.OK, _studentBLL.GetActive(), totalActive, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpGet("get-all-active-paging")]
        public ResultModel GetActivePaging(int pageIndex, int pageSize)
        {
            try
            {
                int totalActive = _studentBLL.getCountActiveStudent();
                return new ResultModel(Code.OK, _studentBLL.GetActivePaging(pageIndex, pageSize), totalActive, "thành công");
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
                return new ResultModel(Code.OK, _studentBLL.GetById(id), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpPost("create")]
        public ResultModel Post([FromBody] Student student)
        {
            try
            {
                _studentBLL.AddStudent(student);
                return new ResultModel(Code.CREATED, "thành công");
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
                _studentBLL.ResetPassword(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPut("update/{id}")]
        public ResultModel Put(int id, [FromBody] Student student)
        {
            try
            {
                _studentBLL.EditStudent(id, student);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpDelete("{id}")]
        public ResultModel Delete(int id)
        {
            try
            {
                _studentBLL.DeleteStudent(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }
    }
}
