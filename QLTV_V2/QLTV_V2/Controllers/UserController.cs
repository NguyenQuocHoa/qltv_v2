using Microsoft.AspNetCore.Mvc;
using QLTV_V2.BLL;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLTV_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserBLL _userBLL;
        public UserController(ApplicationDbContext context)
        {
            _userBLL = new UserBLL(context);
        }

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            try
            {
                return _userBLL.GetAll();
            }
            catch(Exception ex)
            {
               
            }
            return null;
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            try
            {
                return _userBLL.GetById(id);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
        }

        // POST api/<UserController>
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            try
            {
                _userBLL.AddUser(user);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
            return Ok(user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User user)
        {
            try
            {
                _userBLL.EditUser(id, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server Error");
            }
            return Ok();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _userBLL.DeleteUser(id);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
            return Ok(id);
        }
    }
}
