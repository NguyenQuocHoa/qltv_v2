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
    public class ReturnBookController : ControllerBase
    {
        private readonly ReturnBookBLL _returnBookBLL;
        public ReturnBookController(ApplicationDbContext context)
        {
            _returnBookBLL = new ReturnBookBLL(context);
        }

        [HttpGet]
        public IEnumerable<Object> Get()
        {
            try
            {
                return _returnBookBLL.GetAll();
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
                return _returnBookBLL.GetById(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }


        [HttpPost]
        public IActionResult Post([FromBody] ReturnBookPlus returnBookPlus)
        {
            try
            {
                _returnBookBLL.AddReturnBook(returnBookPlus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            return Ok(returnBookPlus);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ReturnBookPlus returnBookPlus)
        {
            try
            {
                _returnBookBLL.EditReturnBook(id, returnBookPlus);
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
                _returnBookBLL.DeleteReturnBook(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            return Ok(id);
        }
    }
}
