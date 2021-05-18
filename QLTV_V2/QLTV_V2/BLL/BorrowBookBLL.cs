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
    public class BorrowBookBLL
    {
        private readonly ApplicationDbContext _context;
        private readonly BorrowBookDAL _borrowBookDAL;

        public BorrowBookBLL(ApplicationDbContext context)
        {
            _context = context;
            _borrowBookDAL = new BorrowBookDAL(_context);
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                return _borrowBookDAL.GetAll();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BorrowBookBLL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                return _borrowBookDAL.GetById(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BorrowBookBLL: " + ex.Message.ToString());
            }
        }

        public void AddBorrowBook(BorrowBookPlus borrowBookPLus)
        {
            try
            {
                // check inventory of book is enough
                foreach(BorrowBookDetail borrowBookDetail in borrowBookPLus.BorrowBookDetails)
                {
                    Book book = _context.Book.Where(b => b.Id == borrowBookDetail.Book_Id).SingleOrDefault();
                    if (book != null && book.Inventory < borrowBookDetail.Quantity)
                        throw new Exception($"Inventory of Book '{book.BookCode.Trim()}_{book.BookName}' isn't enough");
                }    

                _borrowBookDAL.AddBorrowBook(borrowBookPLus);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BorrowBookBLL: " + ex.Message.ToString());
            }
        }

        public void EditBorrowBook(int id, BorrowBookPlus newBorrowBookPlus)
        {
            try
            {
                // check inventory of book is enough
                foreach (BorrowBookDetail newBorrowBookDetail in newBorrowBookPlus.BorrowBookDetails)
                {
                    Book book = _context.Book.Where(b => b.Id == newBorrowBookDetail.Book_Id).SingleOrDefault();
                    BorrowBookDetail oldBorrowBookDetail = _context.BorrowBookDetail.Where(oldBBD => oldBBD.Id == newBorrowBookDetail.Id).SingleOrDefault();
                    if (book != null && book.Inventory + oldBorrowBookDetail.Quantity  < newBorrowBookDetail.Quantity)
                        throw new Exception($"Inventory of Book '{book.BookCode.Trim()}_{book.BookName}' isn't enough");
                }

                _borrowBookDAL.EditBorrowBook(id, newBorrowBookPlus);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BorrowBookBLL: " + ex.Message.ToString());
            }
        }

        public void DeleteBorrowBook(int id)
        {
            try
            {
                _borrowBookDAL.DeleteBorrowBook(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from BorrowBookBLL: " + ex.Message.ToString());
            }
        }
    }
}
