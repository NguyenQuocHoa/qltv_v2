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
            _userDAL = new UserDAL(context);
        }    

        public IEnumerable<User> GetAll()
        {
            try
            {
                return _userDAL.GetAll();
            }
            catch(Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }

        public ActionResult<User> GetById(int id)
        {
            try
            {
                return _userDAL.GetById(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }

        public void AddUser(User user)
        {
            try
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _userDAL.AddUser(user);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }

        public void EditUser(int id, User newUser)
        {
            try
            {
                User oldUser = _context.User.Where(us => us.Id == id).SingleOrDefault();
                newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                _userDAL.EditUser(oldUser, newUser);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }


        public void DeleteUser(int id)
        {
            try
            {
                User user = _context.User.Find(id);
                if (user != null)
                {
                    _userDAL.DeleteUser(user);
                } 
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }
    }
}
