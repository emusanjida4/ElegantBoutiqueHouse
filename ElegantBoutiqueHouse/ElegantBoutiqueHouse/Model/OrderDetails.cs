namespace ElegantBoutiqueHouse.Model
{
    public class OrderDetails
    {
        public int Id { get; set; }          // OrderDetails ID
        public int OderId { get; set; }      // Foreign key to Order
        public int ProductId { get; set; }   // Product ID
        public int Quantity { get; set; }    // Quantity of product
        public decimal Price { get; set; }
        public string? Size { get; set; }

    }
}
