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

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder)
        {
            try
            {
                return _bookCategoryDAL.GetAllPaging(pageIndex, pageSize, sortColumn, sortOrder);
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
                // check book category code isExist
                BookCategory bc = _context.BookCategory
                    .Where(bc => bc.BookCategoryCode == bookCategory.BookCategoryCode).FirstOrDefault();
                if (bc == null)
                    _bookCategoryDAL.AddBookCategory(bookCategory);
                else
                    throw new Exception("Book category code already exist");
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Book category code already exist"))
                    throw new Exception(ex.Message.ToString());
                else 
                    throw new Exception("Error from BookCategoryBLL: " + ex.Message.ToString());
            }
        }

        public void EditBookCategory(int id, BookCategory newBookCategory)
        {
            try
            {
                // check book category code isExist
                BookCategory bc = _context.BookCategory
                    .Where(bc => bc.BookCategoryCode == newBookCategory.BookCategoryCode 
                    && bc.Id != newBookCategory.Id).FirstOrDefault();
                if (bc == null)
                {
                    BookCategory oldBookCategory = _context.BookCategory.Where(us => us.Id == id).SingleOrDefault();
                    _bookCategoryDAL.EditBookCategory(oldBookCategory, newBookCategory);
                } 
                else
                    throw new Exception("Book category code already exist");
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Book category code already exist"))
                    throw new Exception(ex.Message.ToString());
                else
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
