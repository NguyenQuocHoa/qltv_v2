using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Helper
{
    public class RequestModel
    {
        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public string? sortColumn { get; set; }
        public int? sortOrder { get; set; }
    }

    public class BodyObject
    {
        public string column { get; set; }
        public string keySearch { get; set; }
        public string expression { get; set; }
    } 
        
    public class RequestBody
    {
        public static List<BodyObject> BodyList { get; set; }
    }
}
