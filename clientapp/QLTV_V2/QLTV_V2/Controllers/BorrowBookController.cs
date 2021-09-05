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
    public class BorrowBookController : ControllerBase
    {
        private readonly BorrowBookBLL _borrowBookBLL;
        public BorrowBookController(ApplicationDbContext context)
        {
            _borrowBookBLL = new BorrowBookBLL(context);
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            try
            {
                return _borrowBookBLL.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return null;
        }

        [HttpGet("getall_withstudent")]
        public IEnumerable<Object> GetAllWithStudent()
        {
            try
            {
                return _borrowBookBLL.GetAllWithStudent();
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
                return _borrowBookBLL.GetById(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }


        [HttpPost]
        public IActionResult Post([FromBody] BorrowBookPlus borrowBookPlus)
        {
            try
            {
                _borrowBookBLL.AddBorrowBook(borrowBookPlus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            return Ok(borrowBookPlus);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] BorrowBookPlus borrowBookPlus)
        {
            try
            {
                _borrowBookBLL.EditBorrowBook(id, borrowBookPlus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            return Ok(id);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _borrowBookBLL.DeleteBorrowBook(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            return Ok(id);
        }
    }
}
