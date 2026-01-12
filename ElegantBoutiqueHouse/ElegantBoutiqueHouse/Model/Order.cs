namespace ElegantBoutiqueHouse.Model
{
    public class Order

    {
        public int? Id { get; set; }
        public int? UserId { get; set; }
        public string? UserName { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Payment { get; set; }
        public decimal? TotalAmount { get; set; }

        // ✅ NEW
        public string? Status { get; set; }
        public string? MethodNum { get; set; }
        public string? OTP { get; set; }
        public string? Size { get; set; }

        public string? SpecialReq { get; set; }
        public DateTime? Created { get; set; }

        public List<OrderDetails>? OrderDetails { get; set; }
    }
}
