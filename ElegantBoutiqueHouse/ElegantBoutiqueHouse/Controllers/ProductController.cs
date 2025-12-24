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
    public class ProductController : ControllerBase
    {
        private readonly DapperContext _context;

        public ProductController(DapperContext context)
        {
            _context = context;
        }

        // ===============================
        // 1️⃣ GET ALL PRODUCTS (flag = 1)
        // ===============================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 1);

            using var connection = _context.CreateConnection();
            var products = await connection.QueryAsync<Product>(
                "SP_Product",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(products);
        }

        // ===============================
        // 2️⃣ GET PRODUCT BY ID (flag = 2)
        // ===============================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 2);
            parameters.Add("@Id", id);

            using var connection = _context.CreateConnection();
            var product = await connection.QueryFirstOrDefaultAsync<Product>(
                "SP_Product",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(product);
        }

        // ===============================
        // 3️⃣ INSERT PRODUCT (flag = 3)
        // ===============================
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Product model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 3);

            parameters.Add("@Name", model.Name);
            parameters.Add("@Brand", model.Brand);
            parameters.Add("@Description", model.Description);
            parameters.Add("@Price", model.Price);
            parameters.Add("@StockQuantity", model.StockQuantity);
            parameters.Add("@Status", model.Status);
            parameters.Add("@CreatedBy", model.CreatedBy);
            parameters.Add("@CategoryId", model.CategoryId);
            parameters.Add("@SubcategoryId", model.SubCategoryId);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryFirstOrDefaultAsync(
                "SP_Product",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // ===============================
        // 4️⃣ UPDATE PRODUCT (flag = 4)
        // ===============================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Product model)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 4);

            parameters.Add("@Id", id);
            parameters.Add("@Name", model.Name);
            parameters.Add("@Brand", model.Brand);
            parameters.Add("@Description", model.Description);
            parameters.Add("@Price", model.Price);
            parameters.Add("@StockQuantity", model.StockQuantity);
            parameters.Add("@Status", model.Status);
            parameters.Add("@UpdatedBy", model.UpdatedBy);
            parameters.Add("@isactive", model.isactive);
            parameters.Add("@CategoryId", model.CategoryId);
            parameters.Add("@SubcategoryId", model.SubCategoryId);

            using var connection = _context.CreateConnection();
            var result = await connection.QueryAsync(
                "SP_Product",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(result);
        }

        // ===============================
        // 5️⃣ DELETE PRODUCT (flag = 5)
        // ===============================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 5);
            parameters.Add("@Id", id);

            using var connection = _context.CreateConnection();
            var message = await connection.QueryFirstOrDefaultAsync(
                "SP_Product",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(message);
        }
    }

}

