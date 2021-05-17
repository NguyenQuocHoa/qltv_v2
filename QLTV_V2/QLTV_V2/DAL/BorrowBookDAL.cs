using Microsoft.AspNetCore.Mvc;
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
        public BorrowBookDAL(ApplicationDbContext context)
        {
            _context = context;
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
                    BorrowBookDetails = (_context.BorrowBookDetail.Where(detail => detail.BK_Id == borrowBook.Id)
                                                                 ).ToList()
                });
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
                    BorrowBookDetails = (_context.BorrowBookDetail.Where(detail => detail.BK_Id == borrowBook.Id)
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
                        detail.BK_Id = borrowBookPlus.BorrowBook.Id;
                        _context.BorrowBookDetail.Add(detail);
                        _context.SaveChanges();
                    }
                    transaction.Complete();
                }
                catch (Exception ex)
                {
                    transaction.Dispose();
                    throw new Exception("Error from BorrowBookDAL: " + ex.Message.ToString());
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

                    foreach (BorrowBookDetail newBorrowBookDetail in newBorrowBookPlus.BorrowBookDetails)
                    {
                        BorrowBookDetail oldBorrowBookDetail = _context.BorrowBookDetail.
                            Where(bbDetail => bbDetail.Id == newBorrowBookDetail.Id).SingleOrDefault();

                        if (newBorrowBookDetail != null && newBorrowBookDetail.Id != 0 && oldBorrowBookDetail != null)
                        {
                            oldBorrowBookDetail.BorrowBookDetailCode = newBorrowBookDetail.BorrowBookDetailCode;
                            oldBorrowBookDetail.Quantity = newBorrowBookDetail.Quantity;
                            oldBorrowBookDetail.Description = newBorrowBookDetail.Description;
                            oldBorrowBookDetail.Book_Id = newBorrowBookDetail.Book_Id;
                            oldBorrowBookDetail.BK_Id = newBorrowBookDetail.BK_Id;
                            _context.SaveChanges();
                        }
                        else
                        {
                            transaction.Dispose();
                            throw new Exception("Borrow Book Detail doesn't not exist");
                        }
                    }
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
                    List<BorrowBookDetail> borrowBookDetails = _context.BorrowBookDetail.Where(bbd => bbd.BK_Id == borrowBook.Id).ToList();
                    _context.RemoveRange(borrowBookDetails);
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
