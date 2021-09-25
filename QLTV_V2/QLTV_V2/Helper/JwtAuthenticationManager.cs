using Microsoft.IdentityModel.Tokens;
using QLTV_V2.DAL;
using QLTV_V2.Data;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace QLTV_V2.Helper
{
    public class JwtAuthenticationManager : IJwtAuthenticationManager
    {
        private readonly string key;
       
        public JwtAuthenticationManager(string key)
        {
            this.key = key;
        }

        public string Authenticate(string username, string password, ApplicationDbContext context)
        {
            UserDAL _userDAL = new UserDAL(context);
            string userPassword = _userDAL.GetUserPassword(username);
            bool verified = BCrypt.Net.BCrypt.Verify(password, userPassword);
            if (!verified)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = 
                new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey), 
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

    public class AuthDAL
    {
        private readonly ApplicationDbContext _context;
        public AuthDAL(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
