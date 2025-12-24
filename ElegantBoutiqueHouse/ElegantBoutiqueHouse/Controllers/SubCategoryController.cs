using Dapper;
using ElegantBoutiqueHouse.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ElegantBoutiqueHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public SubCategoryController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private IDbConnection CreateConnection()
        {
            return new SqlConnection(
                _configuration.GetConnectionString("DefaultConnection")
            );
        }

        // =========================
        // 1️⃣ GET ALL SUBCATEGORY
        // flag = 1
        // =========================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            using var connection = CreateConnection();

            var param = new DynamicParameters();
            param.Add("@flag", 1);

            var data = await connection.QueryAsync<SubCategory>(
                "SP_SubCategory",
                param,
                commandType: CommandType.StoredProcedure
            );

            return Ok(data);
        }

        // =========================
        // 2️⃣ GET BY CATEGORY ID
        // flag = 2
        // =========================
        [HttpGet("by-Category/{categoryid}")]
        public async Task<IActionResult> GetByCategory(int categoryid)
        {
            using var connection = CreateConnection();

            var param = new DynamicParameters();
            param.Add("@flag", 2);
            param.Add("@CategoryId", categoryid);

            var data = await connection.QueryAsync<SubCategory>(
                "SP_subcategory",
                param,
                commandType: CommandType.StoredProcedure
            );

            return Ok(data);
        }

        // =========================
        // 3️⃣ CREATE SUBCATEGORY
        // flag = 3
        // =========================
        [HttpPost]
        public async Task<IActionResult> Create(SubCategory model)
        {
            using var connection = CreateConnection();

            var param = new DynamicParameters();
            param.Add("@flag", 3);
            param.Add("@Name", model.Name);
            //param.Add("@CreatedBy", model.CreatedBy);
            param.Add("@CategoryId", model.CategoryId);

            var id = await connection.ExecuteScalarAsync<int>(
                "SP_SubCategory",
                param,
                commandType: CommandType.StoredProcedure
            );

            return Ok(new { id });
        }

        // =========================
        // 4️⃣ UPDATE SUBCATEGORY
        // flag = 4
        // =========================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SubCategory model)
        {
            using var connection = CreateConnection();

            var param = new DynamicParameters();
            param.Add("@flag", 4);
            param.Add("@Id", id);
            param.Add("@Name", model.Name);
            param.Add("@UpdatedBy", model.UpdatedBy);
            param.Add("@isactive", model.isactive);
            param.Add("@isdelete", model.isdelete);
            param.Add("@CategoryId", model.CategoryId);

            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_SubCategory",
                param,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // =========================
        // 5️⃣ DELETE SUBCATEGORY
        // flag = 5
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using var connection = CreateConnection();

            var param = new DynamicParameters();
            param.Add("@flag", 5);
            param.Add("@Id", id);

            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_SubCategory",
                param,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // =========================
        // 6️⃣ GET BY ID
        // flag = 6
        // =========================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            using var connection = CreateConnection();

            var param = new DynamicParameters();
            param.Add("@flag", 6);
            param.Add("@Id", id);

            var data = await connection.QueryFirstOrDefaultAsync<SubCategory>(
                "SP_SubCategory",
                param,
                commandType: CommandType.StoredProcedure
            );

            return Ok(data);
        }
    }
}

