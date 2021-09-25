using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLTV_V2.Data;
using QLTV_V2.Helper;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.DAL
{
    public class StudentDAL
    {
        private readonly ApplicationDbContext _context;
        public StudentDAL(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                var students = _context.Student.Select(student => 
                new { 
                    student.Id, 
                    student.StudentCode, 
                    student.StudentName, 
                    student. Class, 
                    student.DoB, 
                    student.NativeLand, 
                    student.Course, 
                    student.Faculty, 
                    student.IsActive,
                    student.Description 
                });
                return students;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder)
        {
            try
            {
                ProviderDAL providerDAL = new ProviderDAL();
                DataTable dt = providerDAL.GetDataPaging("spGetStudentPaging", pageIndex, pageSize, sortColumn, sortOrder);
                var students = dt.AsEnumerable().Select(row => new Student()
                {
                    Id = (int)row["id"],
                    StudentCode = (string)row["studentcode"],
                    StudentName = (string)row["studentname"],
                    Class = (string)row["class"],
                    DoB = (DateTime)row["dob"],
                    NativeLand = (string)row["nativeland"],
                    Course = (string)row["course"],
                    Faculty = (string)row["faculty"],
                    Description = (string)row["description"],
                    IsActive = (bool)row["isactive"]
                }).ToList();
                return students;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetActive()
        {
            try
            {
                var students = _context.Student.Where(student => student.IsActive == true)
                    .Select(student =>
                new {
                    student.Id,
                    student.StudentCode,
                    student.StudentName,
                    student.Class,
                    student.DoB,
                    student.NativeLand,
                    student.Course,
                    student.Faculty,
                    student.IsActive,
                    student.Description
                });
                return students;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetActivePaging(int pageIndex, int pageSize)
        {
            try
            {
                var students = _context.Student.Skip((pageIndex - 1) * pageSize).Take(pageSize)
                    .Where(student => student.IsActive == true)
                    .Select(student =>
                new {
                    student.Id,
                    student.StudentCode,
                    student.StudentName,
                    student.Class,
                    student.DoB,
                    student.NativeLand,
                    student.Course,
                    student.Faculty,
                    student.IsActive,
                    student.Description
                });
                return students;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                var student_data = _context.Student.Where(student => student.Id == id)
                    .Select(student => new {
                    student.Id,
                    student.StudentCode,
                    student.StudentName,
                    student.Class,
                    student.DoB,
                    student.NativeLand,
                    student.Course,
                    student.Faculty,
                    student.IsActive,
                    student.Description
                }).FirstOrDefault();
                return student_data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL: " + ex.Message.ToString());
            }
        }

        public void AddStudent(Student student)
        {
            try
            {
                _context.Student.Add(student);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL: " + ex.Message.ToString());
            }
        }

        public void ResetPassword(Student oldStudent, string newPassword)
        {
            try
            {
                oldStudent.Password = newPassword;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL: " + ex.Message.ToString());
            }
        }

        public void EditStudent(Student oldStudent, Student newStudent)
        {
            try
            {
                oldStudent.StudentCode = newStudent.StudentCode;
                oldStudent.StudentName = newStudent.StudentName;
                oldStudent.Class = newStudent.Class;
                oldStudent.DoB = newStudent.DoB;
                oldStudent.NativeLand = newStudent.NativeLand;
                oldStudent.Course = newStudent.Course;
                oldStudent.Faculty = newStudent.Faculty;
                oldStudent.IsActive = newStudent.IsActive;
                oldStudent.Description = newStudent.Description;
                oldStudent.Password = newStudent.Password;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL: " + ex.Message.ToString());
            }
        }

        public void DeleteStudent(Student student)
        {
            try
            {
                _context.Remove(student);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL: " + ex.Message.ToString());
            }
        }
    }
}
