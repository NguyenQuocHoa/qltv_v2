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
                    {
                        _bookDAL.AddBook(book);
                    }
                    else
                        throw new Exception("Book code already exist");
                }
                else
                {
                    throw new Exception("Book Category doesn't exist");
                }
                  
            }
            catch (Exception ex)
            {
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
                    _bookDAL.EditBook(oldBook, newBook);
                }
                else
                {
                    throw new Exception("Book Category or Book doesn't exist");
                }
            }
            catch (Exception ex)
            {
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
            
    }
}
