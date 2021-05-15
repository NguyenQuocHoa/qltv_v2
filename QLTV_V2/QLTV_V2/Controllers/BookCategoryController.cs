using Microsoft.AspNetCore.Mvc;
using QLTV_V2.BLL;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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


        [HttpGet]
        public IEnumerable<Object> Get()
        {
            try
            {
                return _bookCategoryBLL.GetAll();
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
                return _bookCategoryBLL.GetById(id);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
        }


        [HttpPost]
        public IActionResult Post([FromBody] BookCategory bookCategory)
        {
            try
            {
                _bookCategoryBLL.AddBookCategory(bookCategory);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
            return Ok(bookCategory);
        } 


        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] BookCategory bookCategory)
        {
            try
            {
                _bookCategoryBLL.EditBookCategory(id, bookCategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server Error");
            }
            return Ok(id);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _bookCategoryBLL.DeleteBookCategory(id);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
            return Ok(id);
        }
    }
}
