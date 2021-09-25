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
    public class BookCategoryController : ControllerBase
    {
        private readonly BookCategoryBLL _bookCategoryBLL;
        public BookCategoryController(ApplicationDbContext context)
        {
            _bookCategoryBLL = new BookCategoryBLL(context);
        }


        [HttpGet("get-all")]
        public ResultModel Get()
        {
            try
            {
                var resultQuery = _bookCategoryBLL.GetAll();
                return new ResultModel(Code.OK, resultQuery, resultQuery.Count(), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPost("get-all-paging")]
        public ResultModel GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder, [FromBody] List<BodyObject> requestBody)
        {
            try
            {
                var resultQuery = _bookCategoryBLL.GetAllPaging(pageIndex, pageSize, sortColumn, sortOrder);
                return new ResultModel(Code.OK, resultQuery, resultQuery.Count(), "thành công");
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

                return new ResultModel(Code.OK, _bookCategoryBLL.GetById(id), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpPost("create")]
        public ResultModel Post([FromBody] BookCategory bookCategory)
        {
            try
            {
                _bookCategoryBLL.AddBookCategory(bookCategory);
                return new ResultModel(Code.CREATED, "thành công");
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Book category code already exist"))
                    return new ResultModel(Code.SVERROR, ex.Message.ToString());
                else 
                 return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        } 


        [HttpPut("update/{id}")]
        public ResultModel Put(int id, [FromBody] BookCategory bookCategory)
        {
            try
            {
                _bookCategoryBLL.EditBookCategory(id, bookCategory);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Book category code already exist"))
                    return new ResultModel(Code.SVERROR, ex.Message.ToString());
                else
                    return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpDelete("delete/{id}")]
        public ResultModel Delete(int id)
        {
            try
            {
                _bookCategoryBLL.DeleteBookCategory(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }
    }
}
