namespace ElegantBoutiqueHouse.Model
{
    public class UserInfo
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string? UserType { get; set; }   // e.g. Admin, User
        public string Gender { get; set; }
    }
}
