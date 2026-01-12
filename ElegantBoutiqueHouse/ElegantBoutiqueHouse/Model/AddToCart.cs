namespace ElegantBoutiqueHouse.Model
{
    public class AddToCart
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int Quantity { get; set; }
        public string? Size { get; set; }
    }
}
