using System.ComponentModel.DataAnnotations.Schema;

namespace ElegantBoutiqueHouse.Model
{
    public class Product
    {
        public int? Id { get; set; }

        public string Name { get; set; }
        public string Brand { get; set; }

        public string Description { get; set; }

        public decimal? Price { get; set; }

        public int? StockQuantity { get; set; }

        public string Status { get; set; }

        public IFormFile? DressImage { get; set; }

        public DateTime? CreatedAt { get; set; }
        public string? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }

        public bool? isactive { get; set; }
        public bool? isdelete { get; set; }
            public string ? Gender { get; set; }

        // Foreign Keys
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }


        public string? dressImageUrl { get; set; }


    }
}
