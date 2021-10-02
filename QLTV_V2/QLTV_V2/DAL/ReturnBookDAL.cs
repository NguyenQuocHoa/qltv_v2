using Microsoft.AspNetCore.Mvc;
using QLTV_V2.Data;
using QLTV_V2.Helper;
using QLTV_V2.Models;
using System;
using System.Collections.Generic;
using System.Data;
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
                var returnBooks = from rb in _context.ReturnBook
                                  join bb in _context.BorrowBook
                                  on rb.BorrowBook_Id equals bb.Id
                                  join st in _context.Student
                                  on bb.Student_Id equals st.Id
                                  select new
                                  {
                                      rb.Id,
                                      rb.ReturnBookCode,
                                      rb.ReturnDate,
                                      rb.BorrowBook_Id,
                                      bb.BorrowBookCode,
                                      bb.BorrowDate,
                                      bb.Student_Id,
                                      st.StudentCode,
                                      st.StudentName
                                  };
                return returnBooks;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from returnBookDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder, List<BodyObject> requestBody)
        {
            try
            {
                ProviderDAL providerDAL = new ProviderDAL();
                DataTable dt = providerDAL.GetDataPaging("spGetReturnBookPaging", pageIndex, pageSize, sortColumn, sortOrder);
                var borrowBooks = dt.AsEnumerable().Select(row => new 
                {
                    Id = (int)row["id"],
                    ReturnBookCode = (string)row["returnbookcode"],
                    ReturnDate = (DateTime)row["returndate"],
                    Description = (string)row["description"],
                    BorrowBook_Id = (int)row["borrowbook_id"],
                    BorrowBookCode = (string)row["borrowbookcode"],
                    StudentCode = (string)row["studentcode"],
                    StudentName = (string)row["studentname"]
                }).ToList();
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
                var returnBooks = _context.ReturnBook.Where(returnBook => returnBook.Id == id)
                                                     .Select(returnBook =>
                new
                {
                    returnBook.Id,
                    returnBook.ReturnBookCode,
                    returnBook.ReturnDate,
                    returnBook.Description,
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
                    // change borrow book state 
                    BorrowBook br = _context.BorrowBook.Find(returnBookPlus.ReturnBook.BorrowBook_Id);
                    br.IsReturn = true;
                    _context.SaveChanges();

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

                    // change borrow book state
                    if (oldReturnBook.BorrowBook_Id != newReturnBook.BorrowBook_Id)
                    {
                        BorrowBook borrowBookNew = _context.BorrowBook.Find(newReturnBook.BorrowBook_Id);
                        BorrowBook borrowBookOld = _context.BorrowBook.Find(oldReturnBook.BorrowBook_Id);
                        borrowBookNew.IsReturn = true;
                        borrowBookOld.IsReturn = false;
                        _context.SaveChanges();
                    }

                    if (oldReturnBook != null)
                    {

                        oldReturnBook.ReturnBookCode = newReturnBook.ReturnBookCode;
                        oldReturnBook.ReturnDate = newReturnBook.ReturnDate;
                        oldReturnBook.Description = newReturnBook.Description;
                        oldReturnBook.BorrowBook_Id = newReturnBook.BorrowBook_Id;
                        _context.SaveChanges();
                    }
                    else
                        throw new Exception("Return Book doesn't exist");


                    // delete all old borrow book detail
                    List<ReturnBookDetail> returnBookDetails = _context.ReturnBookDetail.Where(item => item.ReturnBook_Id == id).ToList();
                    _context.ReturnBookDetail.RemoveRange(returnBookDetails);
                    _context.SaveChanges();

                    // add all new borrow book detail
                    _context.ReturnBookDetail.AddRange(newReturnBookPlus.ReturnBookDetails);
                    _context.SaveChanges();

                    transaction.Complete();

                    //foreach (ReturnBookDetail newReturnBookDetail in newReturnBookPlus.ReturnBookDetails)
                    //{
                    //    ReturnBookDetail oldReturnBookDetail = _context.ReturnBookDetail.
                    //        Where(rbDetail => rbDetail.Id == newReturnBookDetail.Id).SingleOrDefault();

                    //    //if (newReturnBookDetail.Book_Id != null)
                    //    //{
                    //    //    // update Inventory of Book
                    //    //    //int? quantityOfUpdate = newReturnBookDetail.Quantity - oldReturnBookDetail.Quantity;
                    //    //    //_bookDAL.UpdateInventory((int)newReturnBookDetail.Book_Id, (int)quantityOfUpdate);
                    //    //}

                    //    if (newReturnBookDetail != null && newReturnBookDetail.Id != 0 && oldReturnBookDetail  != null)
                    //    {
                    //        oldReturnBookDetail.ReturnBookDetailCode = newReturnBookDetail.ReturnBookDetailCode;
                    //        oldReturnBookDetail.Quantity = newReturnBookDetail.Quantity;
                    //        oldReturnBookDetail.Description = newReturnBookDetail.Description;
                    //        oldReturnBookDetail.Book_Id = newReturnBookDetail.Book_Id;
                    //        oldReturnBookDetail.ReturnBook_Id = newReturnBookDetail.ReturnBook_Id;  
                    //        _context.SaveChanges();
                    //    } 
                    //    else
                    //    {
                    //        transaction.Dispose();
                    //        throw new Exception("Return Book Detail doesn't not exist");
                    //    }
                    //}
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

                    // update state of borrow book
                    BorrowBook borrowBook = _context.BorrowBook.Find(returnBook.BorrowBook_Id);
                    if (borrowBook != null)
                    {
                        borrowBook.IsReturn = false;
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

        public int getCountReturnBook()
        {
            return _context.ReturnBook.Select(rb => rb).Count();
        }
    }
}
