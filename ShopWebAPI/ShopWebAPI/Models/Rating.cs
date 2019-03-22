using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopWebAPI.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
        public int Rate { get; set; }
        public string Comment { get; set; }
        public DateTime DateCreated { get; set; }
        public virtual Product Product { get; set; }


    }
}