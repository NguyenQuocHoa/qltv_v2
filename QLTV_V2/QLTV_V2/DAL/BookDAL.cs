using Microsoft.AspNetCore.Mvc;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.DAL
{
    public class BookDAL
    {
        private readonly ApplicationDbContext _context;
        public BookDAL(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                var books = _context.Book.Select(book =>
                new {
                    book.Id,
                    book.BookCode,
                    book.BookName,
                    book.Inventory,
                    book.Author,
                    book.MainContent,
                    book.Description,
                    book.BookCategory_Id
                });
                return books;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                var book_data = _context.Book.Where(book => book.Id == id).Select(book => 
                new {
                    book.Id,
                    book.BookCode,
                    book.BookName,
                    book.Inventory,
                    book.Author,
                    book.MainContent,
                    book.Description,
                    book.BookCategory_Id
                }).FirstOrDefault();
                return book_data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }

        public void AddBook(Book book)
        {
            try
            {
                _context.Book.Add(book);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }

        public void EditBook(Book oldBook, Book newBook)
        {
            try
            {
                oldBook.BookCode = newBook.BookCode;
                oldBook.BookName = newBook.BookName;
                oldBook.Inventory = newBook.Inventory;
                oldBook.Author = newBook.Author;
                oldBook.MainContent = newBook.MainContent;
                oldBook.Description = newBook.Description;
                oldBook.BookCategory_Id = newBook.BookCategory_Id;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }

        public void UpdateInventory(int id, int quantity)
        {
            try
            {
                Book oldBook = _context.Book.Where(book => book.Id == id).SingleOrDefault();
                if (oldBook != null)
                {
                    oldBook.Inventory += quantity;
                    _context.SaveChanges();
                }
                else
                {
                    throw new Exception("Book doesn't exist");
                } 
                    
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }

        public void DeleteBook(Book book)
        {
            try
            {
                _context.Remove(book);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }
    }
}
