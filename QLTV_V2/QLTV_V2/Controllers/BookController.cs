using Microsoft.AspNetCore.Mvc;
using QLTV_V2.BLL;
using QLTV_V2.Data;
using QLTV_V2.Helper;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            try
            {
                return _bookBLL.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return null;
        }

        [HttpGet("{id}")]
        public ActionResult<Object> Get(int id)
        {
            try
            {
                return _bookBLL.GetById(id);
            }
            catch (Exception ex)
            {
                return Ok(new Error(500, ex.Message.ToString()));
            }
        }


        [HttpPost]
        public IActionResult Post([FromBody] Book book)
        {
            try
            {
                _bookBLL.AddBook(book);
            }
            catch (Exception ex)
            {
                return Ok(new Error(500, ex.Message.ToString()));
            }
            return Ok(book);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Book book)
        {
            try
            {
                _bookBLL.EditBook(id, book);
            }
            catch (Exception ex)
            {
                return Ok(new Error(500, ex.Message.ToString()));
            }
            return Ok(id);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _bookBLL.DeleteBook(id);
            }
            catch (Exception ex)
            {
                return Ok(new Error(500, ex.Message.ToString()));
            }
            return Ok(id);
        }
    }
}
