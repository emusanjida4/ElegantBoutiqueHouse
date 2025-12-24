using System.ComponentModel.DataAnnotations;

namespace ElegantBoutiqueHouse.Model
{
    public class Login
    {
        public string Email { get; set; }
        public required string Password { get; set; }
    }
}
