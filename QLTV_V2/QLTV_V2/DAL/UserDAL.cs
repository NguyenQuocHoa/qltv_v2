using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
namespace QLTV_V2.DAL
{
    public class UserDAL
    {
        private readonly ApplicationDbContext _context;
        public UserDAL(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAll()
        {
            try
            {
                var users = _context.User.Select(user => user);
                return users;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserDAL");
            }

        }
    }
}
