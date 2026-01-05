using Dapper;
using ElegantBoutiqueHouse.Context;
using ElegantBoutiqueHouse.Model;
using Microsoft.AspNetCore.Mvc;

namespace SportsHubBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private readonly DapperContext _context;

        public UserInfoController(DapperContext context)
        {
            _context = context;
        }



        // POST: api/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Login request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Email and Password are required");
            }

            var query = @"
        SELECT Name,Email,Password,Phone,Address,UserType,Gender
        FROM UserInfo
        WHERE Email = @Email AND Password = @Password
    ";

            using var connection = _context.CreateConnection();
            var user = await connection.QueryFirstOrDefaultAsync<dynamic>(query, request);

            if (user == null)
            {
                return Unauthorized("Invalid Email or Password");
            }

            return Ok(user);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserInfo model)
        {
            if (model == null ||
                string.IsNullOrWhiteSpace(model.Email) ||
                string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest("All fields are required");
            }

            using var connection = _context.CreateConnection();

            var checkQuery = "SELECT COUNT(1) FROM UserInfo WHERE Email = @Email";
            var exists = await connection.ExecuteScalarAsync<int>(checkQuery, model);

            if (exists > 0)
            {
                return BadRequest("Email already exists");
            }

            var insertQuery = @"
        INSERT INTO UserInfo (Name, Email,Password,Phone,Address, UserType,Gender)
        VALUES (@Name, @Email,@Password,@Phone,@Address ,@UserType,@Gender)
    ";

            await connection.ExecuteAsync(insertQuery, model);

            return Ok(new { msg = "Registration successful" });

        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllUsers()
        {
            var query = @"
        SELECT Id, Name, Email,Password, Phone, Address,UserType, Gender
        FROM UserInfo
    ";

            using var connection = _context.CreateConnection();
            var users = await connection.QueryAsync(query);

            return Ok(users);

        }
    }
} 