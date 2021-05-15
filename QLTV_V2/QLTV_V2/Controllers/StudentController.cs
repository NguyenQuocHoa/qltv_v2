﻿using Microsoft.AspNetCore.Mvc;
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
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }
      
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            try
            {
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return null;
        }

        
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

       
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

       
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

       
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
