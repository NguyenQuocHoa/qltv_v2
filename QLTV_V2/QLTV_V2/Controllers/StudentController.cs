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
    public class StudentController : ControllerBase
    {
        private readonly StudentBLL _studentBLL;
        public StudentController(ApplicationDbContext context)
        {
            _studentBLL = new StudentBLL(context);
        }
      
        [HttpGet]
        public IEnumerable<Object> Get()
        {
            try
            {
                return _studentBLL.GetAll();
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
                return _studentBLL.GetById(id);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
        }


        [HttpPost]
        public IActionResult Post([FromBody] Student student)
        {
            try
            {
                _studentBLL.AddStudent(student);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
            return Ok(student);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Student student)
        {
            try
            {
                _studentBLL.EditStudent(id, student);
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
                _studentBLL.DeleteStudent(id);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
            return Ok(id);
        }
    }
}
