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
    public class ReturnBookDAL
    {
        private readonly ApplicationDbContext _context;
        private readonly BookDAL _bookDAL;
        public ReturnBookDAL(ApplicationDbContext context)
        {
            _context = context;
            _bookDAL = new BookDAL(context);
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                var returnBooks = _context.ReturnBook.Select(returnBook =>
                new
                {
                    returnBook.Id,
                    returnBook.ReturnBookCode,
                    returnBook.ReturnDate,
                    returnBook.BorrowBook_Id,
                    ReturnBookDetails = (_context.ReturnBookDetail.Where(detail => detail.ReturnBook_Id == returnBook.Id)
                                                                ).ToList()
                });
                return returnBooks;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from returnBookDAL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                var returnBooks = _context.ReturnBook.Where(returnBook => returnBook.Id == id)
                                                     .Select(returnBook =>
                new
                {
                    returnBook.Id,
                    returnBook.ReturnBookCode,
                    returnBook.ReturnDate,
                    returnBook.BorrowBook_Id,
                    ReturnBookDetails = (_context.ReturnBookDetail.Where(detail => detail.ReturnBook_Id == returnBook.Id)
                                                                ).ToList()
                }).SingleOrDefault();
                return returnBooks;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from returnBookDAL: " + ex.Message.ToString());
            }
        }

        public void AddReturnBook(ReturnBookPlus returnBookPlus)
        {
            using (var transaction = new TransactionScope())
            {
                try
                {
                    _context.ReturnBook.Add(returnBookPlus.ReturnBook);
                    _context.SaveChanges();
                    foreach (ReturnBookDetail detail in returnBookPlus.ReturnBookDetails)
                    {
                        detail.ReturnBook_Id = returnBookPlus.ReturnBook.Id;
                        _context.ReturnBookDetail.Add(detail);
                        _context.SaveChanges();
                       
                        if (detail.Book_Id != null)
                        {
                            // update Inventory of Book
                            _bookDAL.UpdateInventory((int)detail.Book_Id, (int)detail.Quantity);
                        }
                    }
                    transaction.Complete();
                }
                catch (Exception ex)
                {
                    transaction.Dispose();
                    throw new Exception("Error from ReturnBookDAL: " + ex.Message.ToString());
                }
            }
        }

        public void EditReturnBook(int id, ReturnBookPlus newReturnBookPlus)
        {
            using (var transaction = new TransactionScope())
            {
                try
                {
                    ReturnBook newReturnBook = newReturnBookPlus.ReturnBook;
                    ReturnBook oldReturnBook = _context.ReturnBook.Where(oldRB => oldRB.Id == id).SingleOrDefault();
                    if (oldReturnBook != null)
                    {
                        oldReturnBook.ReturnBookCode = newReturnBook.ReturnBookCode;
                        oldReturnBook.ReturnDate = newReturnBook.ReturnDate;
                        oldReturnBook.BorrowBook_Id = newReturnBook.BorrowBook_Id;
                        _context.SaveChanges();
                    }
                    else
                        throw new Exception("Return Book doesn't exist");

                    foreach (ReturnBookDetail newReturnBookDetail in newReturnBookPlus.ReturnBookDetails)
                    {
                        ReturnBookDetail oldReturnBookDetail = _context.ReturnBookDetail.
                            Where(rbDetail => rbDetail.Id == newReturnBookDetail.Id).SingleOrDefault();
                        
                        if (newReturnBookDetail.Book_Id != null)
                        {
                            // update Inventory of Book
                            int? quantityOfUpdate = newReturnBookDetail.Quantity - oldReturnBookDetail.Quantity;
                            _bookDAL.UpdateInventory((int)newReturnBookDetail.Book_Id, (int)quantityOfUpdate);
                        }

                        if (newReturnBookDetail != null && newReturnBookDetail.Id != 0 && oldReturnBookDetail  != null)
                        {
                            oldReturnBookDetail.ReturnBookDetailCode = newReturnBookDetail.ReturnBookDetailCode;
                            oldReturnBookDetail.Quantity = newReturnBookDetail.Quantity;
                            oldReturnBookDetail.Description = newReturnBookDetail.Description;
                            oldReturnBookDetail.Book_Id = newReturnBookDetail.Book_Id;
                            oldReturnBookDetail.ReturnBook_Id = newReturnBookDetail.ReturnBook_Id;  
                            _context.SaveChanges();
                        } 
                        else
                        {
                            transaction.Dispose();
                            throw new Exception("Return Book Detail doesn't not exist");
                        }
                    }
                    transaction.Complete();
                }
                catch (Exception ex)
                {
                    transaction.Dispose();
                    throw new Exception("Error from ReturnBookDAL: " + ex.Message.ToString());
                }
            }
        }

        public void DeleteReturnBook(int id)
        {
            using (var transaction = new TransactionScope())
            {
                try
                {
                    ReturnBook returnBook = _context.ReturnBook.Where(rb => rb.Id == id).FirstOrDefault();
                    List<ReturnBookDetail> returnBookDetails = _context.ReturnBookDetail.Where(rbd => rbd.ReturnBook_Id == returnBook.Id).ToList();
                    
                    foreach(ReturnBookDetail returnBookDetail in returnBookDetails)
                    {
                        // update Inventory of Book
                        if (returnBookDetail.Book_Id != null)
                        {
                            _bookDAL.UpdateInventory((int)returnBookDetail.Book_Id, (int)-returnBookDetail.Quantity);
                        }
                        _context.Remove(returnBookDetail);
                        _context.SaveChanges();
                    }    

                    _context.Remove(returnBook);
                    _context.SaveChanges();
                    transaction.Complete();
                }
                catch (Exception ex)
                {
                    transaction.Dispose();
                    throw new Exception("Error from ReturnBookDAL: " + ex.Message.ToString());
                }
            }
        }
    }
}
