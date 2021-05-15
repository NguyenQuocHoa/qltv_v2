using Microsoft.AspNetCore.Mvc;
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

        public ActionResult<User> GetById(int id)
        {
            try
            {
                var user_data = _context.User.Where(u => u.Id == id).FirstOrDefault();
                return user_data;
            }
            catch(Exception ex)
            {
                throw new Exception("Error from UserDAL");
            }
        }

        public void AddUser(User user)
        {
            try
            {
                _context.User.Add(user);
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                throw new Exception("Error from UserDAL");
            }
        }

        public void EditUser(User oldUser, User newUser)
        {
            try
            {
                oldUser.UserName = newUser.UserName;
                oldUser.Password = newUser.Password;
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                throw new Exception("Error from UserDAL");
            }
        }

        public void DeleteUser(User user)
        {
            try
            {
                _context.Remove(user);
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                throw new Exception("Error from UserDAL");
            }
        }
    }
}
