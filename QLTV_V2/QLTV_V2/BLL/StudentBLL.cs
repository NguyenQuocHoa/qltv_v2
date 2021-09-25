using Microsoft.AspNetCore.Mvc;
using QLTV_V2.DAL;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.BLL
{
    public class StudentBLL
    {
        private readonly ApplicationDbContext _context;
        private readonly StudentDAL _studentDAL;

        public StudentBLL(ApplicationDbContext context)
        {
            _context = context;
            _studentDAL = new StudentDAL(_context);
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                return _studentDAL.GetAll();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder)
        {
            try
            {
                return _studentDAL.GetAllPaging(pageIndex, pageSize, sortColumn, sortOrder);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetActive()
        {
            try
            {
                return _studentDAL.GetActive();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetActivePaging(int pageIndex, int pageSize)
        {
            try
            {
                return _studentDAL.GetActivePaging(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentBLL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                return _studentDAL.GetById(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentBLL: " + ex.Message.ToString());
            }
        }

        public void AddStudent(Student student)
        {
            try
            {
                // check Student code is exist
                var st = _context.Student.Where(item => item.StudentCode == student.StudentCode).SingleOrDefault();
                if (st == null)
                {
                    student.Password = BCrypt.Net.BCrypt.HashPassword(student.Password);
                    _studentDAL.AddStudent(student);
                }
                else
                    throw new Exception("Mã sinh viên đã tồn tại"); 
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Mã sinh viên đã tồn tại"))
                    throw new Exception(ex.Message.ToString());
                else
                    throw new Exception("Error from StudentBLL: " + ex.Message.ToString());
            }
        }

        public void ResetPassword(int id)
        {
            try
            {
                Student oldStudent = _context.Student.Where(us => us.Id == id).SingleOrDefault();
                if (oldStudent != null)
                {
                    string newPassword = BCrypt.Net.BCrypt.HashPassword("1");
                    _studentDAL.ResetPassword(oldStudent, newPassword);
                }
                else
                    throw new Exception("Student doesn't exist");
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentBLL: " + ex.Message.ToString());
            }
        }

        public void EditStudent(int id, Student newStudent)
        {
            try
            { 
                var s = _context.Student
                    .Where(item => item.StudentCode == newStudent.StudentCode && item.Id != newStudent.Id).SingleOrDefault();
                if (s == null)
                {
                    Student oldStudent = _context.Student.Where(us => us.Id == id).SingleOrDefault();
                    if (newStudent.Password == null || newStudent.Password.Trim() == "")
                        newStudent.Password = oldStudent.Password;
                    else
                        newStudent.Password = BCrypt.Net.BCrypt.HashPassword(newStudent.Password);
                    _studentDAL.EditStudent(oldStudent, newStudent);
                }    
                else
                    throw new Exception("Mã sinh viên đã tồn tại");
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Mã sinh viên đã tồn tại"))
                    throw new Exception(ex.Message.ToString());
                else
                    throw new Exception("Error from StudentBLL: " + ex.Message.ToString());
            }
        }

        public void DeleteStudent(int id)
        {
            try
            {
                Student student = _context.Student.Find(id);
                if (student != null)
                {
                    _studentDAL.DeleteStudent(student);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentBLL: " + ex.Message.ToString());
            }
        }

        public int getCountStudent()
        {
            return _context.Student.Count();
        }

        public int getCountActiveStudent()
        {
            return _context.Student.Where(student => student.IsActive == true).Count();
        }
    }
}
