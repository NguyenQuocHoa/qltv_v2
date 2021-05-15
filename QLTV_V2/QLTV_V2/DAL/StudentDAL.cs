using Microsoft.AspNetCore.Mvc;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
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
                new { student.Id, student.StudentCode, student.StudentName, student. Class, student.DoB, 
                student.NativeLand, student.Course, student.Faculty, student.Description });
                return students;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL");
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                var student_data = _context.Student.Where(student => student.Id == id).Select(student => new {
                    student.Id,
                    student.StudentCode,
                    student.StudentName,
                    student.Class,
                    student.DoB,
                    student.NativeLand,
                    student.Course,
                    student.Faculty,
                    student.Description
                }).FirstOrDefault();
                return student_data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL");
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
                throw new Exception("Error from StudentDAL");
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
                oldStudent.Description = newStudent.Description;
                oldStudent.Password = newStudent.Password;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from StudentDAL");
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
                throw new Exception("Error from StudentDAL");
            }
        }
    }
}
