using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public bool View { get; set; }
        public bool Create { get; set; }
        public bool Update { get; set; }
        public bool Delete { get; set; }
        public int User_Id { get; set; }
        public int Role_Id { get; set; }
    }
}
