using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using QLTV_V2.Data;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace QLTV_V2.DAL
{
    public class BorrowBookDAL
    {
        private readonly ApplicationDbContext _context;
        private readonly BookDAL _bookDAL;
        public BorrowBookDAL(ApplicationDbContext context)
        {
            _context = context;
            _bookDAL = new BookDAL(_context);
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                var borrowBooks = _context.BorrowBook.Select(borrowBook =>
                new
                {
                    borrowBook.Id,
                    borrowBook.BorrowBookCode,
                    borrowBook.BorrowDate,
                    borrowBook.NumberOfDayBorrow,
                    borrowBook.Student_Id,
                    borrowBook.Description,
                    BorrowBookDetails = (_context.BorrowBookDetail.Where(detail => detail.BorrowBook_Id == borrowBook.Id)
                                                                 ).ToList()
                }).OrderByDescending(br => br.BorrowDate).ThenBy(d => d.NumberOfDayBorrow);
                return borrowBooks;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from borrowBookDAL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                var borrowBook_data = _context.BorrowBook.Where(borrowBook => borrowBook.Id == id).Select(borrowBook => new
                {
                    borrowBook.Id,
                    borrowBook.BorrowBookCode,
                    borrowBook.BorrowDate,
                    borrowBook.NumberOfDayBorrow,
                    borrowBook.Student_Id,
                    borrowBook.Description,
                    BorrowBookDetails = (_context.BorrowBookDetail.Where(detail => detail.BorrowBook_Id == borrowBook.Id)
                                                                 ).ToList()
                }).FirstOrDefault();
                return borrowBook_data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from borrowBookDAL: " + ex.Message.ToString());
            }
        }

        public void AddBorrowBook(BorrowBookPlus borrowBookPlus)
        {
            using (var transaction = new TransactionScope())
            {
                try
                {
                    _context.BorrowBook.Add(borrowBookPlus.BorrowBook);
                    _context.SaveChanges();
                    foreach (BorrowBookDetail detail in borrowBookPlus.BorrowBookDetails)
                    {
                        detail.BorrowBook_Id = borrowBookPlus.BorrowBook.Id;
                    }
                    _context.BorrowBookDetail.AddRange(borrowBookPlus.BorrowBookDetails);
                    _context.SaveChanges();
                    transaction.Complete();
                }
                catch (Exception ex)
                {
                    transaction.Dispose();
                    throw new Exception("Error from BorrowBookDAL: " + ex.InnerException.Message.ToString());
                }
            }    
        }

        public void EditBorrowBook(int id, BorrowBookPlus newBorrowBookPlus)
        {
            using (var transaction = new TransactionScope())
            {
                try
                {
                    BorrowBook newBorrowBook = newBorrowBookPlus.BorrowBook;
                    BorrowBook oldBorrowBook = _context.BorrowBook.Where(oldRB => oldRB.Id == id).SingleOrDefault();
                    if (oldBorrowBook != null)
                    {
                        oldBorrowBook.BorrowBookCode = newBorrowBook.BorrowBookCode;
                        oldBorrowBook.BorrowDate = newBorrowBook.BorrowDate;
                        oldBorrowBook.NumberOfDayBorrow = newBorrowBook.NumberOfDayBorrow;
                        oldBorrowBook.Description = newBorrowBook.Description;
                        oldBorrowBook.Student_Id = newBorrowBook.Student_Id;
                        _context.SaveChanges();
                    }
                    else
                        throw new Exception("Borrow Book doesn't exist");

                    // delete all old borrow book detail
                    List<BorrowBookDetail> borrowBookDetails = _context.BorrowBookDetail.Where(item => item.BorrowBook_Id == id).ToList();
                    _context.BorrowBookDetail.RemoveRange(borrowBookDetails);
                    _context.SaveChanges();

                    // add all new borrow book detail
                    _context.BorrowBookDetail.AddRange(newBorrowBookPlus.BorrowBookDetails);
                    _context.SaveChanges();
                  
                    transaction.Complete();
                }
                catch (Exception ex)
                {
                    transaction.Dispose();
                    throw new Exception("Error from BorrowBookDAL: " + ex.Message.ToString());
                }
            }
        }

        public void DeleteBorrowBook(int id)
        {
            using (var transaction = new TransactionScope())
            {
                try
                {
                    BorrowBook borrowBook = _context.BorrowBook.Where(rb => rb.Id == id).FirstOrDefault();
                    List<BorrowBookDetail> borrowBookDetails = _context.BorrowBookDetail.Where(bbd => bbd.BorrowBook_Id == borrowBook.Id).ToList();
                    _context.BorrowBookDetail.RemoveRange(borrowBookDetails);
                    _context.SaveChanges();
                    _context.Remove(borrowBook);
                    _context.SaveChanges();
                    transaction.Complete();
                }
                catch (Exception ex)
                {
                    transaction.Dispose();
                    throw new Exception("Error from BorrowBookDAL: " + ex.Message.ToString());
                }
            }
        }
    }
}
