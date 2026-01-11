namespace ElegantBoutiqueHouse.Model
{
    public class Stock

    {
        public int Id { get; set; }
        public int ProductId { get; set; }
      
        public int Quantity { get; set; }
        public string Size { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal SellPrice { get; set; }
        public string BatchNumber { get; set; }
    }
}
