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
    public class PostController : ControllerBase
    {
        private readonly PostBLL _postBLL;
        public PostController(ApplicationDbContext context)
        {
            _postBLL = new PostBLL(context);
        }

        [HttpGet("get-all")]
        public ResultModel Get()
        {
            try
            {
                var resultQuery = _postBLL.GetAll();
                return new ResultModel(Code.OK, resultQuery, resultQuery.Count(), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpGet("get-all-paging")]
        public ResultModel GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder)
        {
            try
            {
                int total = _postBLL.getCountPost();
                return new ResultModel(Code.OK, _postBLL.GetAllPaging(pageIndex, pageSize, sortColumn, sortOrder), total, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpGet("get-all-active")]
        public ResultModel GetPostActive()
        {
            try
            {
                var resultQuery = _postBLL.GetPostActive();
                return new ResultModel(Code.OK, resultQuery, resultQuery.Count(), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpGet("get-all-active-paging")]
        public ResultModel GetPostActivePaging(int pageIndex, int pageSize)
        {
            try
            {
                int totalActive = _postBLL.getCountActivePost();
                return new ResultModel(Code.OK, _postBLL.GetPostActive(pageIndex, pageSize), totalActive, "thành công");
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
                return new ResultModel(Code.OK, _postBLL.GetById(id), "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpPost("create")]
        public ResultModel Post([FromBody] Post post)
        {
            try
            {
                _postBLL.AddPost(post);
                return new ResultModel(Code.CREATED, "thành công");
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Mã bài viết đã tồn tại"))
                    return new ResultModel(Code.SVERROR, ex.Message.ToString());
                else
                    return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }


        [HttpPut("update/{id}")]
        public ResultModel Put(int id, [FromBody] Post post)
        {
            try
            {
                _postBLL.EditPost(id, post);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Mã bài viết đã tồn tại"))
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
                _postBLL.DeletePost(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }
    }
}
