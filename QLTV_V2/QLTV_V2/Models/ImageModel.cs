using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Models
{
    public class ImageModel
    {
        public string ImageName { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
