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
                student.Password = BCrypt.Net.BCrypt.HashPassword(student.Password);
                _studentDAL.AddStudent(student);
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
                Student oldStudent = _context.Student.Where(us => us.Id == id).SingleOrDefault();
                newStudent.Password = BCrypt.Net.BCrypt.HashPassword(newStudent.Password);
                _studentDAL.EditStudent(oldStudent, newStudent);
            }
            catch (Exception ex)
            {
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
    }
}
