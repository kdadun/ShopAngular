using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopWebAPI.Models
{
    public class WishList
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public virtual Product Products { get; set; }
    }
}