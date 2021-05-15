using Microsoft.AspNetCore.Mvc;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.DAL
{
    public class BookCategoryDAL
    {
        private readonly ApplicationDbContext _context;
        public BookCategoryDAL(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                var bookCategorys = _context.BookCategory.Select(bookCategory =>
                new
                {
                    bookCategory.Id,
                    bookCategory.BookCategoryCode,
                    bookCategory.BookCategoryName,
                    bookCategory.Description
                });
                return bookCategorys;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryDAL");
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                var bookCategory_data = _context.BookCategory.Where(bookCategory => bookCategory.Id == id).Select(bookCategory => new {
                    bookCategory.Id,
                    bookCategory.BookCategoryCode,
                    bookCategory.BookCategoryName,
                    bookCategory.Description
                }).FirstOrDefault();
                return bookCategory_data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryDAL");
            }
        }

        public void AddBookCategory(BookCategory bookCategory)
        {
            try
            {
                _context.BookCategory.Add(bookCategory);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryDAL");
            }
        }

        public void EditBookCategory(BookCategory oldBookCategory, BookCategory newBookCategory)
        {
            try
            {
                oldBookCategory.BookCategoryCode = newBookCategory.BookCategoryCode;
                oldBookCategory.BookCategoryName = newBookCategory.BookCategoryName;
                oldBookCategory.Description = newBookCategory.Description;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryDAL");
            }
        }

        public void DeleteBookCategory(BookCategory bookCategory)
        {
            try
            {
                _context.Remove(bookCategory);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryDAL");
            }
        }
    }
}
