namespace ElegantBoutiqueHouse.Model
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }

        public bool isactive { get; set; }
        public bool isdelete { get; set; }

        
    }
}
