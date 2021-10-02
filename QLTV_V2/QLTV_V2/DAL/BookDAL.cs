using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
                    book.IsActive,
                    book.BookCategory_Id
                });
                return books;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllEnoughInventory()
        {
            try
            {
                var books = _context.Book.Where(book => book.Inventory > 0)
                    .Select(book =>
                new {
                    book.Id,
                    book.BookCode,
                    book.BookName,
                    book.Inventory,
                    book.Author,
                    book.MainContent,
                    book.Description,
                    book.IsActive,
                    book.BookCategory_Id
                });
                return books;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder, List<BodyObject> requestBody)
        {
            try
            {
                ProviderDAL providerDAL = new ProviderDAL();
                DataTable dt = providerDAL.GetDataPaging("spGetBookPaging", pageIndex, pageSize, sortColumn, sortOrder);
                var books = dt.AsEnumerable().Select(row => new Book()
                {
                    Id = (int)row["id"],
                    BookCode = (string)row["bookcode"],
                    BookName = (string)row["bookname"],
                    Inventory = (int)row["inventory"],
                    Author = (string)row["author"],
                    MainContent = (string)row["maincontent"],
                    Description = (string)row["description"],
                    BookCategory_Id = (int)row["bookcategory_id"],
                    IsActive = (bool)row["isactive"],
                    Image = (string)row["image"]
                }).ToList();
                return books;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetBookActive()
        {
            try
            {
                var books = _context.Book.Where(book => book.IsActive == true).Select(book =>
                new
                {
                    book.Id,
                    book.BookCode,
                    book.BookName,
                    book.Inventory,
                    book.Author,
                    book.MainContent,
                    book.Description,
                    book.IsActive,
                    book.BookCategory_Id
                });
                return books;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BookDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetBookActivePaging(int pageIndex, int pageSize)
        {
            try
            {
                var books = _context.Book.Skip((pageIndex - 1) * pageSize).Take(pageSize)
                    .Where(book => book.IsActive == true).Select(book =>
                    new
                    {
                        book.Id,
                        book.BookCode,
                        book.BookName,
                        book.Inventory,
                        book.Author,
                        book.MainContent,
                        book.Description,
                        book.IsActive,
                        book.BookCategory_Id
                    }).ToList();
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
                    book.IsActive,
                    book.BookCategory_Id,
                    book.Image
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
                oldBook.IsActive = newBook.IsActive;
                oldBook.BookCategory_Id = newBook.BookCategory_Id;
                oldBook.Image = newBook.Image;
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
