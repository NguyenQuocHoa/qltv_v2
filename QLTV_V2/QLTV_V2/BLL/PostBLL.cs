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
    public class PostBLL
    {
        private readonly ApplicationDbContext _context;
        private readonly PostDAL _postDAL;

        public PostBLL(ApplicationDbContext context)
        {
            _context = context;
            _postDAL = new PostDAL(_context);
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                return _postDAL.GetAll();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize)
        {
            try
            {
                return _postDAL.GetAllPaging(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetPostActive()
        {
            try
            {
                return _postDAL.GetPostActive();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostBLL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetPostActive(int pageIndex, int pageSize)
        {
            try
            {
                return _postDAL.GetPostActivePaging(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostBLL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                return _postDAL.GetById(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostBLL: " + ex.Message.ToString());
            }
        }

        public void AddPost(Post post)
        {
            try
            {
                // check post code is already exist
                var b = _context.Post.Where(item => item.CodePost == post.CodePost).Select(item => new { item.Id }).SingleOrDefault();
                if (b == null)
                {
                    _postDAL.AddPost(post);
                }
                else
                    throw new Exception("Post code already exist");

            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostBLL: " + ex.Message.ToString());
            }
        }

        public void EditPost(int id, Post newPost)
        {
            try
            {

                Post oldPost = _context.Post.Where(us => us.Id == id).SingleOrDefault();
                _postDAL.EditPost(oldPost, newPost);
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostBLL: " + ex.Message.ToString());
            }
        }

        public void DeletePost(int id)
        {
            try
            {
                Post post = _context.Post.Find(id);
                if (post != null)
                {
                    _postDAL.DeletePost(post);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostBLL: " + ex.Message.ToString());
            }
        }

        public int getCountPost()
        {
            return _context.Post.Count();
        }

        public int getCountActivePost()
        {
            return _context.Post.Where(post => post.IsActive == true).Count();
        }
    }
}
