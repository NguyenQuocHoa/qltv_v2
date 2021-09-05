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
    public class BookController : ControllerBase
    {
        private readonly BookBLL _bookBLL;
        public BookController(ApplicationDbContext context)
        {
            _bookBLL = new BookBLL(context);
        }

        [HttpGet("get-all")]
        public ResultModel Get()
        {
            try
            {
                var resultQuery = _bookBLL.GetAll();
                return new ResultModel(Code.OK, resultQuery, resultQuery.Count(), "thành công");
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
                int total = _bookBLL.getCountBook();
                return new ResultModel(Code.OK, _bookBLL.GetAllPaging(pageIndex, pageSize), total, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpGet("get-all-active")]
        public ResultModel GetBookActive()
        {
            try
            {
                var resultQuery = _bookBLL.GetBookActive();
                return new ResultModel(Code.OK, resultQuery, resultQuery.Count(), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpGet("get-all-active-paging")]
        public ResultModel GetBookActivePaging(int pageIndex, int pageSize)
        {
            try
            {
                int totalActive = _bookBLL.getCountActiveBook();
                return new ResultModel(Code.OK, _bookBLL.GetBookActive(pageIndex, pageSize), totalActive, "thành công");
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
                return new ResultModel(Code.OK, _bookBLL.GetById(id), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpPost("create")]
        public ResultModel Post([FromBody] Book book)
        {
            try
            {
                _bookBLL.AddBook(book);
                return new ResultModel(Code.CREATED, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPut("update/{id}")]
        public ResultModel Put(int id, [FromBody] Book book)
        {
            try
            {
                _bookBLL.EditBook(id, book);
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
                _bookBLL.DeleteBook(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }
    }
}
