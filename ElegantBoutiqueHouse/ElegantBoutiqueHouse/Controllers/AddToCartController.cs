using Dapper;
using ElegantBoutiqueHouse.Context;
using ElegantBoutiqueHouse.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ElegantBoutiqueHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddToCartController : ControllerBase
    {
        private readonly DapperContext _context;

        public AddToCartController(DapperContext context)
        {
            _context = context;
        }

        // ===============================
        // 1️⃣ GET CART BY USER ID (flag=1)
        // ===============================
        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetCartByUser(int userId)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 1);
            parameters.Add("@UserId", userId);

            using var connection = _context.CreateConnection();
            var cart = await connection.QueryAsync<dynamic>(
                "SP_AddToCart",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(cart);
        }

        // ===============================
        // 2️⃣ GET CART ITEM BY ID (flag=2)
        // ===============================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 2);
            parameters.Add("@Id", id);

            using var connection = _context.CreateConnection();
            var item = await connection.QueryFirstOrDefaultAsync<dynamic>(
                "SP_AddToCart",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(item);
        }

        // ===============================
        // 3️⃣ ADD TO CART (flag=3)
        // ===============================
        [HttpPost]
        public async Task<IActionResult> AddToCart(AddToCart model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 3);
            parameters.Add("@ProductId", model.ProductId);
            parameters.Add("@UserId", model.UserId);
            parameters.Add("@Quantity", model.Quantity);
            parameters.Add("@Create", DateTime.Now);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_AddToCart",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // ===============================
        // 4️⃣ UPDATE CART (flag=4)
        // ===============================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCart(int id, AddToCart model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 4);
            parameters.Add("@Id", id);
            parameters.Add("@Quantity", model.Quantity);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_AddToCart",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // ===============================
        // 5️⃣ DELETE CART ITEM (flag=5)
        // ===============================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 5);
            parameters.Add("@Id", id);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_AddToCart",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }
        [HttpGet("increment/{id}")]
        public async Task<IActionResult> IncrementCart(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 6);
            parameters.Add("@Id", id);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_AddToCart",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // ===============================
        // 7️⃣ DECREMENT CART ITEM (flag=7)
        // ===============================
        [HttpGet("decrement/{id}")]
        public async Task<IActionResult> DecrementCart(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 7);
            parameters.Add("@Id", id);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_AddToCart",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }
    }
}

