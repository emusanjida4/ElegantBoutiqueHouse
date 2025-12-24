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
    public class CategoryController : ControllerBase
    {
        private readonly DapperContext _context;

        public CategoryController(DapperContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 1);

            using var connection = _context.CreateConnection();
            var categories = await connection.QueryAsync<Category>(
                "sp_Category",
                parameters,
                commandType: CommandType.StoredProcedure);

            return Ok(categories);
        }

        // ===============================
        // 3️⃣ INSERT CATEGORY (flag = 3)
        // ===============================
        [HttpPost("category")]
        public async Task<IActionResult> Create( Category model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 3);
            parameters.Add("@Name", model.Name);
            parameters.Add("@CreatedBy", model.CreatedBy);
            parameters.Add("@CreatedAt", DateTime.Now);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryFirstOrDefaultAsync(
                "sp_Category",
                parameters,
                commandType: CommandType.StoredProcedure);

            return Ok(result);
        }

        // ===============================
        // 4️⃣ UPDATE CATEGORY (flag = 4)
        // ===============================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Category model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 4);
            parameters.Add("@Id", id);
            parameters.Add("@Name", model.Name);
            parameters.Add("@UpdatedBy", model.UpdatedBy);
            parameters.Add("@UpdatedAt", DateTime.Now);
            parameters.Add("@isactive", model.isactive);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryAsync(
                "sp_Category",
                parameters,
                commandType: CommandType.StoredProcedure);

            return Ok(result);
        }

        // ===============================
        // 5️⃣ DELETE CATEGORY (flag = 5)
        // ===============================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 5);
            parameters.Add("@Id", id);

            using var connection = _context.CreateConnection();
            var message = await connection.QueryFirstOrDefaultAsync(
                "sp_Category",
                parameters,
                commandType: CommandType.StoredProcedure);

            return Ok(message);
        }
    }
}
