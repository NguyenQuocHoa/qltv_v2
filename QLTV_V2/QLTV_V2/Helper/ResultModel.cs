using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Helper
{
    public class ResultModel
    {
        public ResultModel(StatusCode.Code code, string message) 
        {
            this.code = code;
            this.message = message;
        }
        public ResultModel(StatusCode.Code code, IEnumerable items, string message)
        {
            this.code = code;
            this.message = message;
            this.items = items;
        }
        public ResultModel(StatusCode.Code code, IEnumerable items, int total, string message)
        {
            this.code = code;
            this.message = message;
            this.total = total;
            this.items = items;
        }
        public ResultModel(StatusCode.Code code, ActionResult<Object> item, string message)
        {
            this.code = code;
            this.message = message;
            this.item = item;
        }
        public StatusCode.Code code { get; set; }
        public IEnumerable items { get; set; }
        public ActionResult<Object> item { get; set; }
        public int total { get; set; }
        public string message { get; set; }
    }
}
