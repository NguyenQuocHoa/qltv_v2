using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLTV_V2.BLL;
using QLTV_V2.Data;
using QLTV_V2.Helper;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static QLTV_V2.Helper.StatusCode;

namespace QLTV_V2.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookBLL _bookBLL;
        private readonly IHostingEnvironment _hostingEnv;
        public BookController(ApplicationDbContext context, IHostingEnvironment hostingEnv)
        {
            _bookBLL = new BookBLL(context);
            _hostingEnv = hostingEnv;
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

        [HttpPost("get-all-paging")]
        public ResultModel GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder, [FromBody] List<BodyObject> requestBody)
        {
            try
            {
                int total = _bookBLL.getCountBook();
                return new ResultModel(Code.OK, _bookBLL.GetAllPaging(pageIndex, pageSize, sortColumn, sortOrder, requestBody), total, "thành công");
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
            catch (Exception ex)
            {
                if (ex.Message.Contains("Mã sách không tồn tại") || ex.Message.Contains("Mã loại sách không tồn tại"))
                    return new ResultModel(Code.SVERROR, ex.Message.ToString());
                else
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
            catch (Exception ex)
            {
                if (ex.Message.Contains("Mã sách không tồn tại") || ex.Message.Contains("Mã loại sách không tồn tại"))
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
                _bookBLL.DeleteBook(id);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            }
        }

        [HttpPost("upload-image")]
        public async Task<ResultModel> Post([FromForm] ImageModel imageModel)
        {
            try
            {
                imageModel.ImageName = await SaveImage(imageModel.ImageFile);
                return new ResultModel(Code.OK, "thành công");
            }
            catch (Exception)
            {
                return new ResultModel(Code.SVERROR, "lỗi hệ thống");
            } 
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName)).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostingEnv.ContentRootPath, "wwwroot/Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create) )
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
