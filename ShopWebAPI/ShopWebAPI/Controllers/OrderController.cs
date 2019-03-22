using ShopWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Data.Entity;
namespace ShopWebAPI.Controllers
{
    public class OrderController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();
        [HttpPost]
        [Route("api/Order/CreateOrder")]
        public IHttpActionResult CreateOrder([FromBody] OrderModel createOrder)
        {
           
            Order newOrder = new Order()
            {
                firstName = createOrder.firstName,
                lastName = createOrder.lastName,
                email = createOrder.email,
                phoneNumber = createOrder.phoneNumber,
                address = createOrder.address,
                comment = createOrder.comment,
                UserId = createOrder.UserId,
                dateCreated = Convert.ToDateTime(DateTime.Now.ToShortDateString()),
                totalPrice = createOrder.totalPrice
                
            };
            db.Orders.Add(newOrder);
            if (newOrder.OrderIteams == null)
                newOrder.OrderIteams = new List<OrderIteam>();

            foreach (var order in createOrder.Products)
            {
                var orderItems = new OrderIteam()
                {
                    ProductId = order.Id,
                   
                };
                newOrder.OrderIteams.Add(orderItems);
            }
            db.SaveChanges();
            return Ok();
        }
        [HttpGet]
        [Route("api/Order/GetOrderList/{userId}")]
        public IHttpActionResult GetOrderList(string userId)
        {
             // Admin account
              if (userId == "4bc462d2-a928-4af2-9033-a0d671771c8c")
            {
                var userOrders = db.Orders.
                    Select(y => new { y.OrderIteams, y.orderState, y.dateCreated, y.totalPrice, y.orderId }).
                    OrderByDescending(x => x.orderId).
                    ToList();
                return Ok(userOrders);
            }
             else if (userId != null)
            {
                var userOrders = db.Orders.Where(z => z.UserId == userId).
                    Select(y => new { y.OrderIteams, y.orderState, y.dateCreated, y.totalPrice, y.orderId}).
                    OrderByDescending(x => x.orderId).
                    ToList();
                return Ok(userOrders);
            }
           
            else
            {
                return NotFound();
            }
        }
        [HttpPost]
        [Route("api/Order/ChangeOrderState")]
        public IHttpActionResult ChangeOrderState([FromBody]Order changeOrder)
        {
            if(changeOrder != null)
            {
                Order orderToModify = db.Orders.Find(changeOrder.orderId);
                orderToModify.orderState = changeOrder.orderState;
                db.SaveChanges();
                return Ok(orderToModify);
            }
            else
            {
                return NotFound();
            }
           
        }
    }
}
