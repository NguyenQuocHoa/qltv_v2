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

        public IEnumerable<Object> GetAllWithStudent()
        {
            try
            {
                return _borrowBookDAL.GetAllWithStudent();
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
