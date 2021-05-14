using Microsoft.AspNetCore.Mvc;
using QLTV_V2.DAL;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QLTV_V2.BLL
{
    public class UserBLL
    {
        private readonly ApplicationDbContext _context;
        private readonly UserDAL _userDAL;
        
        public UserBLL(ApplicationDbContext context)
        {
            _context = context;
            _userDAL = new UserDAL(_context);
        }    

        public IEnumerable<User> GetAll()
        {
            try
            {
                return _userDAL.GetAll();
            }
            catch(Exception ex)
            {
                throw new Exception("Error from UserBLL");
            }
        }

        public ActionResult<User> GetById(int id)
        {
            try
            {
                var user_data = _context.User.Where(u => u.Id == id).FirstOrDefault();
                return user_data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL");
            }
            return null;
        }

        public void AddUser(User user)
        {
            try
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                _context.User.Add(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL");
            }
        }

        public void EditUser(int id, User user)
        {
            try
            {
                User u = _context.User.Where(us => us.Id == id).SingleOrDefault();
                u.UserName = user.UserName;
                u.Password = user.Password;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL");
            }
        }


        public void DeleteUser(int id)
        {
            try
            {
                User user = _context.User.Find(id);
                if (user != null)
                {
                    _context.Remove(user);
                    _context.SaveChanges();
                } 
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL");
            }
        }
    }
}
