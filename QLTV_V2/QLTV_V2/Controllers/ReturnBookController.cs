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
    public class ReturnBookController : ControllerBase
    {
        private readonly ReturnBookBLL _returnBookBLL;
        public ReturnBookController(ApplicationDbContext context)
        {
            _returnBookBLL = new ReturnBookBLL(context);
        }

        [HttpGet("get-all")]
        public ResultModel Get()
        {
            try
            {
                var resultQuery = _returnBookBLL.GetAll();
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
                int total = _returnBookBLL.getCountReturnBook();
                return new ResultModel(Code.OK,
                    _returnBookBLL.GetAllPaging(pageIndex, pageSize, sortColumn, sortOrder, requestBody),
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
                return new ResultModel(Code.OK, _returnBookBLL.GetById(id), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPost("create")]
        public ResultModel Post([FromBody] ReturnBookPlus returnBookPlus)
        {
            try
            {
                _returnBookBLL.AddReturnBook(returnBookPlus);
                return new ResultModel(Code.CREATED, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPut("update/{id}")]
        public ResultModel Put(int id, [FromBody] ReturnBookPlus returnBookPlus)
        {
            try
            {
                _returnBookBLL.EditReturnBook(id, returnBookPlus);
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
                _returnBookBLL.DeleteReturnBook(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }
    }
}
