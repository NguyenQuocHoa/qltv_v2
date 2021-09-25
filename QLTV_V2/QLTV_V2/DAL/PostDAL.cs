using Microsoft.AspNetCore.Mvc;
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
    public class PostDAL
    {
        private readonly ApplicationDbContext _context;
        public PostDAL(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Object> GetAll()
        {
            try
            {
                var posts = _context.Post.Select(post =>
                new {
                    post.Id,
                    post.CodePost,
                    post.Message,
                    post.Description,
                    post.IsActive
                });
                return posts;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetAllPaging(int pageIndex, int pageSize, string sortColumn, int sortOrder)
        {
            try
            {
                ProviderDAL providerDAL = new ProviderDAL();
                DataTable dt = providerDAL.GetDataPaging("spGetPostPaging", pageIndex, pageSize, sortColumn, sortOrder);
                var posts = dt.AsEnumerable().Select(row => new BookCategory()
                {
                    Id = (int)row["id"],
                    BookCategoryCode = (string)row["codepost"],
                    BookCategoryName = (string)row["message"],
                    Description = (string)row["description"],
                    IsActive = (bool)row["isactive"],
                }).ToList();
                return posts;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetPostActive()
        {
            try
            {
                var posts = _context.Post.Where(post => post.IsActive == true).Select(post =>
                new
                {
                    post.Id,
                    post.CodePost,
                    post.Message,
                    post.Description,
                    post.IsActive
                });
                return posts;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostDAL: " + ex.Message.ToString());
            }
        }

        public IEnumerable<Object> GetPostActivePaging(int pageIndex, int pageSize)
        {
            try
            {
                var posts = _context.Post.Skip((pageIndex - 1) * pageSize).Take(pageSize)
                    .Where(post => post.IsActive == true).Select(post =>
                    new
                    {
                        post.Id,
                        post.CodePost,
                        post.Message,
                        post.Description,
                        post.IsActive
                    }).ToList();
                return posts;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostDAL: " + ex.Message.ToString());
            }
        }

        public ActionResult<Object> GetById(int id)
        {
            try
            {
                var post_data = _context.Post.Where(post => post.Id == id).Select(post =>
                new {
                    post.Id,
                    post.CodePost,
                    post.Message,
                    post.Description,
                    post.IsActive
                }).FirstOrDefault();
                return post_data;
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostDAL: " + ex.Message.ToString());
            }
        }

        public void AddPost(Post post)
        {
            try
            {
                _context.Post.Add(post);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostDAL: " + ex.Message.ToString());
            }
        }

        public void EditPost(Post oldPost, Post newPost)
        {
            try
            {
                oldPost.CodePost = newPost.CodePost;
                oldPost.Message = newPost.Message;
                oldPost.Description = newPost.Description;
                oldPost.IsActive = newPost.IsActive;
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostDAL: " + ex.Message.ToString());
            }
        }

        public void DeletePost(Post post)
        {
            try
            {
                _context.Remove(post);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error from PostDAL: " + ex.Message.ToString());
            }
        }
    }
}
