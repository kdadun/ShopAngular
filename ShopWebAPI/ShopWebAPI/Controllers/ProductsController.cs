using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ShopWebAPI.Models;
using System.Web;

namespace ShopWebAPI.Controllers
{
    public class ProductsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Products
        [Route("api/Products/allProducts")]
        public IEnumerable<Product> GetProducts()
        {
            return db.Products.ToList();
        }

        [Route("api/Products/GetProductsById/{id}")]
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {

            if (id != product.Id)
            {
                return BadRequest();
            }

            db.Entry(product).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

  
        [HttpPost]
        [Route("api/Products/AddProducts")]
            public IHttpActionResult PostProduct(Product newProduct)
        {
            if(newProduct !=null)
            {
                Product product = new Product()
                {
                    Name = newProduct.Name,
                    Description = newProduct.Description,
                    Price = newProduct.Price,
                    IsNewProduct = Convert.ToBoolean(newProduct.IsNewProduct),
                    PromotionalProduct = Convert.ToBoolean(newProduct.PromotionalProduct),
                    Image = newProduct.Image,
                    CategoryId = newProduct.CategoryId
                };
                db.Products.Add(product);
                db.SaveChanges();
                return Ok();
            }
            else
            {
               return NotFound();
            }
            
        }

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }
        [HttpPost]
        [Route("api/Products/AddComment")]
        public IHttpActionResult rateProduct(Rating rating)
        {
            if (rating !=null)
            {
                Rating rate = new Rating()
                {
                    ProductId = rating.ProductId,
                    Rate = rating.Rate,
                    UserId = rating.UserId,
                    Username = rating.Username,
                    Comment = rating.Comment,
                    DateCreated = Convert.ToDateTime(DateTime.Now.ToShortDateString())
            };
                db.Rating.Add(rate);
                db.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
           
        }
        [HttpGet]
        [Route("api/Products/GetComments")]
        public IEnumerable<Rating> getComments()
        {
            return db.Rating.ToList();
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.Id == id) > 0;
        }
    }
}