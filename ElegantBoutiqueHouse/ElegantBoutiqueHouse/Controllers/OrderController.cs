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
    public class OrderController : ControllerBase
    {
        private readonly DapperContext _context;

        public OrderController(DapperContext context)
        {
            _context = context;
        }

        // ===============================
        // 1️⃣ GET ALL ORDERS
        // ===============================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            using var connection = _context.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 1);

            var orders = await connection.QueryAsync<dynamic>(
                "SP_Order",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(orders);
        }

        // ===============================
        // 2️⃣ GET ORDER BY ID
        // ===============================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            using var connection = _context.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 2);
            parameters.Add("@Id", id);

            var order = await connection.QueryAsync<dynamic>(
                "SP_Order",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(order);
        }

        // ===============================
        // 3️⃣ CREATE ORDER
        // ===============================
        [HttpPost]
        public async Task<IActionResult> Create(Order model)
        {
            using var connection = _context.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 3);
            parameters.Add("@UserId", model.UserId);
            parameters.Add("@UserName", model.UserName);
            parameters.Add("@Address", model.Address);
            parameters.Add("@Phone", model.Phone);
            parameters.Add("@Payment", model.Payment);
            parameters.Add("@TotalAmount", model.TotalAmount);
            parameters.Add("@SpecialReq", model.SpecialReq);

            // If adding single order detail
            if (model.OrderDetails != null && model.OrderDetails.Count > 0)
            {
                parameters.Add("@ProductId", model.OrderDetails[0].ProductId);
                parameters.Add("@Quantity", model.OrderDetails[0].Quantity);
                parameters.Add("@Price", model.OrderDetails[0].Price);
            }

            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_Order",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // ===============================
        // 4️⃣ UPDATE ORDER
        // ===============================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Order model)
        {
            using var connection = _context.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 4);
            parameters.Add("@Id", id);
            parameters.Add("@UserId", model.UserId);
            parameters.Add("@UserName", model.UserName);
            parameters.Add("@Address", model.Address);
            parameters.Add("@Phone", model.Phone);
            parameters.Add("@Payment", model.Payment);
            parameters.Add("@TotalAmount", model.TotalAmount);
            parameters.Add("@SpecialReq", model.SpecialReq);

            if (model.OrderDetails != null && model.OrderDetails.Count > 0)
            {
                parameters.Add("@OrderDetailsId", model.OrderDetails[0].Id);
                parameters.Add("@ProductId", model.OrderDetails[0].ProductId);
                parameters.Add("@Quantity", model.OrderDetails[0].Quantity);
                parameters.Add("@Price", model.OrderDetails[0].Price);
            }

            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_Order",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // ===============================
        // 5️⃣ DELETE ORDER
        // ===============================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using var connection = _context.CreateConnection();
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 5);
            parameters.Add("@Id", id);

            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_Order",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }
        // ===============================
        // 6️⃣ GET ORDERS BY USER ID
        // ===============================
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            using var connection = _context.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@flag", 6);
            parameters.Add("@UserId", userId);

            var orders = await connection.QueryAsync<dynamic>(
                "SP_Order",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(orders);
        }

    }
}

