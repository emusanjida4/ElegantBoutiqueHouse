namespace ElegantBoutiqueHouse.Model
{
    public class ReportModel
    {
        public DateTime ReportDate { get; set; }
        public int TotalOrders { get; set; }
        public int TotalSoldItems { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal TotalProfit { get; set; }
    }
}
