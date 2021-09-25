using Microsoft.AspNetCore.Mvc;
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
                throw new Exception("Error from BookCategoryDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder)
        {
            try
            {
                ProviderDAL providerDAL = new ProviderDAL();
                DataTable dt = providerDAL.GetDataPaging("spGetBookCategoryPaging", pageIndex, pageSize, sortColumn, sortOrder);
                var bookCategories = dt.AsEnumerable().Select(row => new BookCategory()
                {
                    Id = (int)row["id"],
                    BookCategoryCode = (string)row["bookcategorycode"],
                    BookCategoryName = (string)row["bookcategoryname"],
                    Description = (string)row["description"],
                    IsActive = (bool)row["isactive"],
                }).ToList();
                return bookCategories;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryDAL: " + ex.Message.ToString());
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
                    bookCategory.Description,
                    bookCategory.IsActive
                }).FirstOrDefault();
                return bookCategory_data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryDAL: " + ex.Message.ToString());
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
                throw new Exception("Error from BookCategoryDAL: " + ex.Message.ToString());
            }
        }

        public void EditBookCategory(BookCategory oldBookCategory, BookCategory newBookCategory)
        {
            try
            {
                oldBookCategory.BookCategoryCode = newBookCategory.BookCategoryCode;
                oldBookCategory.BookCategoryName = newBookCategory.BookCategoryName;
                oldBookCategory.Description = newBookCategory.Description;
                oldBookCategory.IsActive = newBookCategory.IsActive;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryDAL: " + ex.Message.ToString());
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
                throw new Exception("Error from BookCategoryDAL: " + ex.Message.ToString());
            }
        }
    }
}
