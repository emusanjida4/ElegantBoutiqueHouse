namespace ElegantBoutiqueHouse.Model
{
    public class Order

    {
        public int Id { get; set; }              // Order ID
        public int? UserId { get; set; }          // User ID
        public string? UserName { get; set; }     // User Name
        public string? Address { get; set; }      // Delivery Address
        public string? Phone { get; set; }        // Contact Number
        public string? Payment { get; set; }      // Payment Method
        public decimal? TotalAmount { get; set; } // Total Order Amount
        public string? SpecialReq { get; set; }   // Special Request
        public DateTime Created { get; set; }

        // Nested order details
        public List<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>();
    }
}
