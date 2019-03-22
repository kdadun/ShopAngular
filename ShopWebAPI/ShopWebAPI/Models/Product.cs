using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ShopWebAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(60), MinLength(3)]
        public string Name { get; set; }
        public string Description { get; set; }

        // public string DetailedDescription { get; set; }
        public decimal Price { get; set; }
        public bool IsNewProduct { get; set; }
        public bool PromotionalProduct { get; set; }

        [StringLength(int.MaxValue)]
        public string Image { get; set; }
        public int? CategoryId { get; set; }
        public virtual Category category { get; set; }
    }
}