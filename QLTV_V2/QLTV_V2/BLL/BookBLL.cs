using Microsoft.AspNetCore.Mvc;
using QLTV_V2.DAL;
using QLTV_V2.Data;
using QLTV_V2.Helper;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.BLL
{
    public class BookBLL
    {
        private readonly ApplicationDbContext _context;
        private readonly BookDAL _bookDAL;

        public BookBLL(ApplicationDbContext context)
        {
            _context = context;
            _bookDAL = new BookDAL(_context);
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                return _bookDAL.GetAll();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder, List<BodyObject> requestBody)
        {
            try
            {
                return _bookDAL.GetAllPaging(pageIndex, pageSize, sortColumn, sortOrder, requestBody);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetBookActive()
        {
            try
            {
                return _bookDAL.GetBookActive();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetBookActive(int pageIndex, int pageSize)
        {
            try
            {
                return _bookDAL.GetBookActivePaging(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                return _bookDAL.GetById(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }

        public void AddBook(Book book)
        {
            try
            {
                if (checkBookCategoryExist(book.BookCategory_Id))
                {
                    // check book code is already exist
                    var b = _context.Book.Where(item => item.BookCode == book.BookCode).Select(item => new { item.Id }).SingleOrDefault();
                    if (b == null)
                        _bookDAL.AddBook(book);
                    else
                        throw new Exception("Mã sách đã tồn tại");
                }
                else
                {
                    throw new Exception("Mã loại sách không tồn tại");
                }
                  
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Mã sách đã tồn tại") 
                    || ex.Message.Contains("Mã loại sách không tồn tại"))
                    throw new Exception(ex.Message.ToString());
                else
                    throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }

        public void EditBook(int id, Book newBook)
        {
            try
            {
                
                Book oldBook = _context.Book.Where(us => us.Id == id).SingleOrDefault();
                if (checkBookCategoryExist(newBook.BookCategory_Id) && oldBook != null)
                {
                    var b = _context.Book.Where(item => item.BookCode == newBook.BookCode && item.Id != newBook.Id)
                        .Select(item => new { item.Id }).SingleOrDefault();
                    if (b == null)
                        _bookDAL.EditBook(oldBook, newBook);
                    else
                        throw new Exception("Mã sách đã tồn tại");
                }
                else
                {
                    throw new Exception("Book Category or Book doesn't exist");
                }
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Mã sách đã tồn tại")
                     || ex.Message.Contains("Mã loại sách không tồn tại"))
                    throw new Exception(ex.Message.ToString());
                else
                    throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }

        public void DeleteBook(int id)
        {
            try
            {
                Book book = _context.Book.Find(id);
                if (book != null)
                {
                    _bookDAL.DeleteBook(book);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookBLL: " + ex.Message.ToString());
            }
        }

        public bool checkBookCategoryExist(int? bookCategory_id)
        {
            return _context.BookCategory.Find(bookCategory_id) != null ? true : false;
        }

        public int getCountBook()
        {
            return _context.Book.Count();
        }

        public int getCountActiveBook()
        {
            return _context.Book.Where(book => book.IsActive == true).Count();
        }
    }
}
