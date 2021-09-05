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

        public IEnumerable<Object> GetAll()
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

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize)
        {
            try
            {
                return _userDAL.GetAllPaging(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetActive()
        {
            try
            {
                return _userDAL.GetActive();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetActivePaging(int pageIndex, int pageSize)
        {
            try
            {
                return _userDAL.GetActivePaging(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
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
                if (checkUserNameNotExist(user.Username))
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                    _userDAL.AddUser(user);
                }
                else
                {
                    throw new Exception("User name can't duplicate");
                } 
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
                if (newUser.Password != null && newUser.Password.Trim() != "")
                {
                    newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
                }
                else
                    newUser.Password = oldUser.Password;
                _userDAL.EditUser(oldUser, newUser);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }

        public void ResetPassword(int id)
        {
            try
            {
                User oldUser = _context.User.Where(st => st.Id == id).SingleOrDefault();
                if (oldUser != null)
                {
                    string newPassword = BCrypt.Net.BCrypt.HashPassword("1");
                    _userDAL.ResetPassword(oldUser, newPassword);
                }
                else
                    throw new Exception("User doesn't exist");
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

        public bool checkUserNameNotExist(string userName)
        {
            try
            {
                User user = _context.User.Where(u => u.Username.Equals(userName)).FirstOrDefault();
                if (user == null)
                    return true;
                else
                    return false;     
            }
            catch(Exception ex)
            {
                throw new Exception("Error from UserBLL: " + ex.Message.ToString());
            }
        }

        public int getCountUser()
        {
            return _context.User.Count();
        }

        public int getCountActiveUser()
        {
            return _context.User.Where(user => user.IsActive == true).Count();
        }
    }
}
