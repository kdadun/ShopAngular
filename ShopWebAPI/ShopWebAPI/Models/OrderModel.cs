using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopWebAPI.Models
{
    public class OrderModel
    {
        public int orderId { get; set; }
        public string UserId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string comment { get; set; }
        public DateTime dateCreated { get; set; }
        public OrderState orderState { get; set; }
        public double totalPrice { get; set; }
        public Product[] Products { get; set; }
    }
    public enum OrderState
    {   
        New,
        InProgress,
        Completed
    }
}