using Dapper;
using ElegantBoutiqueHouse.Context;
using ElegantBoutiqueHouse.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ElegantBoutiqueHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly DapperContext _context;

        public StockController(DapperContext context)
        {
            _context = context;
        }

        // ===============================
        // 1️⃣ GET ALL STOCK (flag = 1)
        // ===============================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 1);

            using var connection = _context.CreateConnection();
            var stockList = await connection.QueryAsync<dynamic>(
                "SP_Stock",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(stockList);
        }

        // ===============================
        // 2️⃣ GET STOCK BY ID (flag = 2)
        // ===============================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 2);
            parameters.Add("@Id", id);

            using var connection = _context.CreateConnection();
            var stock = await connection.QueryFirstOrDefaultAsync<dynamic>(
                "SP_Stock",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(stock);
        }

        // ===============================
        // 3️⃣ INSERT STOCK (flag = 3)
        // ===============================
        [HttpPost]
        public async Task<IActionResult> Create(Stock model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 3);
            parameters.Add("@ProductId", model.ProductId);
           
            parameters.Add("@Quantity", model.Quantity);
            parameters.Add("@Size", model.Size);
            parameters.Add("@PurchasePrice", model.PurchasePrice);
            parameters.Add("@SellPrice", model.SellPrice);
            parameters.Add("@BatchNumber", model.BatchNumber);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_Stock",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // ===============================
        // 4️⃣ UPDATE STOCK (flag = 4)
        // ===============================
        [HttpPut]
        public async Task<IActionResult> Update(Stock model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 4);
            parameters.Add("@Id", model.Id);
            parameters.Add("@ProductId", model.ProductId);
            
            parameters.Add("@Quantity", model.Quantity);
            parameters.Add("@Size", model.Size);
            parameters.Add("@PurchasePrice", model.PurchasePrice);
            parameters.Add("@SellPrice", model.SellPrice);
            parameters.Add("@BatchNumber", model.BatchNumber);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryAsync(
                "SP_Stock",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // ===============================
        // 5️⃣ DELETE STOCK (flag = 5)
        // ===============================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 5);
            parameters.Add("@Id", id);

            using var connection = _context.CreateConnection();
            var message = await connection.QueryFirstOrDefaultAsync(
                "SP_Stock",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(message);
        }
    }
}
