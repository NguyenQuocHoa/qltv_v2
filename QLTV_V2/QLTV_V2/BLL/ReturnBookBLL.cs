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
    public class ReturnBookBLL
    {
        private readonly ApplicationDbContext _context;
        private readonly ReturnBookDAL _returnBookDAL;

        public ReturnBookBLL(ApplicationDbContext context)
        {
            _context = context;
            _returnBookDAL = new ReturnBookDAL(_context);
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                return _returnBookDAL.GetAll();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from ReturnBookBLL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                return _returnBookDAL.GetById(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from ReturnBookBLL: " + ex.Message.ToString());
            }
        }

        public void AddReturnBook(ReturnBookPlus returnBookPlus)
        {
            try
            {
                _returnBookDAL.AddReturnBook(returnBookPlus);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from ReturnBookBLL: " + ex.Message.ToString());
            }
        }

        public void EditReturnBook(int id, ReturnBookPlus newReturnBookPlus)
        {
            try
            {
                _returnBookDAL.EditReturnBook(id, newReturnBookPlus);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from ReturnBookBLL: " + ex.Message.ToString());
            }
        }

        public void DeleteReturnBook(int id)
        {
            try
            {
                _returnBookDAL.DeleteReturnBook(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from ReturnBookBLL: " + ex.Message.ToString());
            }
        }
    }
}
