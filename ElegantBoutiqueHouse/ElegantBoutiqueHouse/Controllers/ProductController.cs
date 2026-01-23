using Dapper;
using ElegantBoutiqueHouse.Context;
using ElegantBoutiqueHouse.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Reflection;

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

        // 1️⃣ GET ALL PRODUCTS (flag = 1)
        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@flag", 1);

                using var connection = _context.CreateConnection();
                var products = await connection.QueryAsync<dynamic>(
                    "SP_Product",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while fetching products.",
                    error = ex.Message
                });
            }

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
            //save image to wwwroot/images
            var imageFile = model.DressImage;
            if (imageFile != null && imageFile.Length > 0)
            {
                var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                if (!Directory.Exists(imagesPath))
                {
                    Directory.CreateDirectory(imagesPath);
                }
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(imagesPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                model.dressImageUrl = "/images/" + fileName;
            }

            var parameters = new DynamicParameters();
            parameters.Add("@flag", 3);
            parameters.Add("@Name", model.Name);
            parameters.Add("@Brand", model.Brand);
            parameters.Add("@Description", model.Description);
            parameters.Add("@Price", model.Price);
            parameters.Add("@StockQuantity", model.StockQuantity);
            parameters.Add("@Status", model.Status);
            parameters.Add("@Gender", model.Gender); // ✅ Gender added
            parameters.Add("@CreatedBy", model.CreatedBy);
            parameters.Add("@CategoryId", model.CategoryId);
            parameters.Add("@SubCategoryId", model.SubCategoryId);
            parameters.Add("@DressImage", model.dressImageUrl);

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
        [HttpPut]
        public async Task<IActionResult> Update([FromForm] Product model)
        {
            //save image to wwwroot/images
            var imageFile = model.DressImage;
            if (imageFile != null && imageFile.Length > 0)
            {
                var imagesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                if (!Directory.Exists(imagesPath))
                {
                    Directory.CreateDirectory(imagesPath);
                }
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(imagesPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }
                model.dressImageUrl = "/images/" + fileName;
            }

            var parameters = new DynamicParameters();
            parameters.Add("@flag", 4);

            parameters.Add("@Id", model.Id);
            parameters.Add("@Name", model.Name);
            parameters.Add("@Brand", model.Brand);
            parameters.Add("@Description", model.Description);
            parameters.Add("@Price", model.Price);
            parameters.Add("@StockQuantity", model.StockQuantity);
            parameters.Add("@Status", model.Status);
            parameters.Add("@Gender", model.Gender); // ✅ Gender added
            parameters.Add("@UpdatedBy", model.UpdatedBy);
            parameters.Add("@IsActive", model.isactive);
            parameters.Add("@CategoryId", model.CategoryId);
            parameters.Add("@SubCategoryId", model.SubCategoryId);
            parameters.Add("@DressImage", model.dressImageUrl);

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
        [HttpGet("GetProductsByCat/{cat}")]
        public IActionResult GetProductsByCat(string cat)
        {
            using (var connection = _context.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@flag", 6);
                parameters.Add("@Gender", cat); // men / women

                var products = connection.Query<dynamic>(
                    "SP_Product",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ).ToList();

                if (products.Count == 0)
                    return BadRequest(new { Message = $"No {cat} products found." });

                return Ok(products);
            }
        }

            [HttpGet("GenderProducts/{gender}")]
        public IActionResult GetProductsByGender(string gender)
        {
            using (var connection = _context.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@flag", 6);
                parameters.Add("@Gender", gender); // men / women

                var products = connection.Query<dynamic>(
                    "SP_Product",
                    parameters,
                    commandType: CommandType.StoredProcedure
                ).ToList();

                if (products.Count == 0)
                    return NotFound(new { Message = $"No {gender} products found." });

                return Ok(products);
            }
        }
    }

}
