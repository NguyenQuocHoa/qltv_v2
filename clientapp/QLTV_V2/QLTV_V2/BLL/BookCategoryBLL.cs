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
    public class BookCategoryBLL
    {
        private readonly ApplicationDbContext _context;
        private readonly BookCategoryDAL _bookCategoryDAL;

        public BookCategoryBLL(ApplicationDbContext context)
        {
            _context = context;
            _bookCategoryDAL = new BookCategoryDAL(_context);
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                return _bookCategoryDAL.GetAll();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryBLL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                return _bookCategoryDAL.GetById(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryBLL: " + ex.Message.ToString());
            }
        }

        public void AddBookCategory(BookCategory bookCategory)
        {
            try
            {
                _bookCategoryDAL.AddBookCategory(bookCategory);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryBLL: " + ex.Message.ToString());
            }
        }

        public void EditBookCategory(int id, BookCategory newBookCategory)
        {
            try
            {
                BookCategory oldBookCategory = _context.BookCategory.Where(us => us.Id == id).SingleOrDefault();
                _bookCategoryDAL.EditBookCategory(oldBookCategory, newBookCategory);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryBLL: " + ex.Message.ToString());
            }
        }

        public void DeleteBookCategory(int id)
        {
            try
            {
                BookCategory bookCategory = _context.BookCategory.Find(id);
                if (bookCategory != null)
                {
                    _bookCategoryDAL.DeleteBookCategory(bookCategory);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookCategoryBLL: " + ex.Message.ToString());
            }
        }
    }
}
