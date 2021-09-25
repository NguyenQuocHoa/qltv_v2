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
    public class BorrowBookController : ControllerBase
    {
        private readonly BorrowBookBLL _borrowBookBLL;
        public BorrowBookController(ApplicationDbContext context)
        {
            _borrowBookBLL = new BorrowBookBLL(context);
        }

        [HttpGet]
        public ResultModel Get()
        {
            try
            {
                var resultQuery = _borrowBookBLL.GetAll();
                return new ResultModel(Code.OK, resultQuery, resultQuery.Count(), "thành công");

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return null;
        }

        [HttpGet("get-all-paging-wit-student")]
        public ResultModel GetAllWithStudent(int pageIndex, int pageSize, string sortColumn, int sortOrder, int studentId)
        {
            try
            {
                int total = _borrowBookBLL.getCountBorrowBookWithStudent(studentId);
                return new ResultModel(Code.OK, 
                    _borrowBookBLL.GetAllPagingWithStudent(pageSize, pageSize, sortColumn, sortOrder, studentId), 
                    total, "thành công");
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
                return new ResultModel(Code.OK, _borrowBookBLL.GetById(id), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpPost("create")]
        public ResultModel Post([FromBody] BorrowBookPlus borrowBookPlus)
        {
            try
            {
                _borrowBookBLL.AddBorrowBook(borrowBookPlus);
                return new ResultModel(Code.CREATED, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPut("update/{id}")]
        public ResultModel Put(int id, [FromBody] BorrowBookPlus borrowBookPlus)
        {
            try
            {
                _borrowBookBLL.EditBorrowBook(id, borrowBookPlus);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpDelete("delete/{id}")]
        public ResultModel Delete(int id)
        {
            try
            {
                _borrowBookBLL.DeleteBorrowBook(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }
    }
}
