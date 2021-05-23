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
    public class UserController : ControllerBase
    {
        private readonly UserBLL _userBLL;
        public UserController(ApplicationDbContext context)
        {
            _userBLL = new UserBLL(context);
        }

        [HttpGet]
        public IEnumerable<Object> Get()
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

        [HttpGet("{id}")]
        public ActionResult<Object> Get(int id)
        {
            try
            {
                return _userBLL.GetById(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            try
            {
                _userBLL.AddUser(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User user)
        {
            try
            {
                _userBLL.EditUser(id, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            return Ok(id);
        }

        [HttpPut("reset_password/{id}")]
        public IActionResult ResetPassword(int id)
        {
            try
            {
                _userBLL.ResetPassword(id);
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
                _userBLL.DeleteUser(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message.ToString());
            }
            return Ok(id);
        }
    }
}
