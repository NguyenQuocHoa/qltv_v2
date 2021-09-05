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

        public IEnumerable<Object> GetAll()
        {
            try
            {
                var users = _context.User.Select(user => new { user.Id, user.UserName, user.Description });
                return users;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize)
        {
            try
            { 
                var users = _context.User.Skip((pageIndex - 1) * pageSize).Take(pageSize)
                    .Select(user => new { user.Id, user.UserName, user.Description }).ToList();
                return users;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetActive()
        {
            try
            {
                var users = _context.User.Where(user => user.IsActive == true).Select(user => 
                    new { user.Id, user.UserName, user.IsActive, user.Description 
                });
                return users;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetActivePaging(int pageIndex, int pageSize)
        {
            try
            {
                var users = _context.User.Skip((pageIndex - 1) * pageSize).Take(pageSize)
                    .Where(user => user.IsActive == true).Select(user =>
                    new {
                        user.Id,
                        user.UserName,
                        user.IsActive,
                        user.Description
                    });
                return users;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserDAL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                var user_data = _context.User.Where(u => u.Id == id).Select(u => 
                    new { u.Id, u.UserName, u.IsActive, u.Description 
                }).FirstOrDefault();
                return user_data;
            }
            catch(Exception ex)
            {
                throw new Exception("Error from UserDAL: " + ex.Message.ToString());
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
                throw new Exception("Error from UserDAL: " + ex.Message.ToString());
            }
        }

        public void EditUser(User oldUser, User newUser)
        {
            try
            {
                oldUser.UserName = newUser.UserName;
                oldUser.Password = newUser.Password;
                oldUser.IsActive = newUser.IsActive;
                oldUser.Description = newUser.Description;
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                throw new Exception("Error from UserDAL: " + ex.Message.ToString());
            }
        }

        public void ResetPassword(User oldUser, string newPassword)
        {
            try
            {
                oldUser.Password = newPassword;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from UserDAL: " + ex.Message.ToString());
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
                throw new Exception("Error from UserDAL: " + ex.Message.ToString());
            }
        }
    }
}
