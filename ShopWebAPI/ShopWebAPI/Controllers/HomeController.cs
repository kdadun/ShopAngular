using ShopWebAPI.Models;
using ShopWebAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace ShopWebAPI.Controllers
{
    public class HomeController : Controller
    {
        public ApplicationDbContext db = new ApplicationDbContext();
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        [HttpGet]
        [Route("api/Home")]
        public HomeViewModel Home()
        {  
                var product = db.Products.Where(p => p.PromotionalProduct).ToList();
                var categories = db.Categories.ToList();
                var vm = new HomeViewModel
                {
                    Products = product,
                    Categories = categories
                };
                return vm;
            
        }

        public Product CheapestProduct()
        {
            
                var prod = db.Products.OrderBy(n => n.Price).FirstOrDefault();
                return prod;
            
            
        }
    }
}
