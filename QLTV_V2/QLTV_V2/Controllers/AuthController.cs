using Microsoft.AspNetCore.Authorization;
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
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJwtAuthenticationManager jwtAuthenticationManager;
        private readonly ApplicationDbContext _context;

        public AuthController(IJwtAuthenticationManager jwtAuthenticationManager, ApplicationDbContext context)
        {
            this.jwtAuthenticationManager = jwtAuthenticationManager;
            this._context = context;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserLogin user)
        {
            var token = jwtAuthenticationManager.Authenticate(user.Username, user.Password, _context);
            var id = 1;
            if (token == null)
                return Unauthorized();
            return Ok(new { token, id, username = user.Username });
        }
    }
}
