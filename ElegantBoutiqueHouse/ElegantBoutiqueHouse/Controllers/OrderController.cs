using Dapper;
using ElegantBoutiqueHouse.Context;
using ElegantBoutiqueHouse.Model;
using ElegantBoutiqueHouse.Services;
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
        private readonly IBKashService _bKashService;

        public OrderController(DapperContext context, IBKashService bKashService)
        {
            _context = context;
            _bKashService = bKashService;
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

            var order = await connection.QueryFirstOrDefaultAsync<dynamic>(
                "SP_Order",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return Ok(order);
        }
        [HttpGet("items/{orderId}")]
        public async Task<IActionResult> GetOrderItems(int orderId)
        {
            var query = @"
        SELECT 
            oi.ProductId,
            p.Name,
            oi.Price,
            oi.Quantity,
            oi.Size
        FROM OrderDetails oi
        INNER JOIN [Product] p ON oi.ProductId = p.Id
        WHERE oi.OderId = @OderId
    ";

            using var connection = _context.CreateConnection();

            var items = await connection.QueryAsync(query, new { OderId = orderId });

            return Ok(items);
        }



        // ===============================
        // 3️⃣ CREATE ORDER
        // ===============================
        [HttpPost]
        public async Task<IActionResult> Create(Order model)
        {
            try
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
                parameters.Add("@Created", DateTime.Now);
                parameters.Add("@Size", model.Size);

                // 🔹 NEW
                parameters.Add("@Status", "Pending");
                //parameters.Add("@Status", model.Status);
                parameters.Add("@MethodNum", model.MethodNum);
                //parameters.Add("@OTP", model.OTP);


                var result = await connection.QueryFirstOrDefaultAsync(
                    "SP_Order",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );


                if (model.OrderDetails != null && model.OrderDetails.Count > 0)
                {
                    parameters.Add("@flag", 7);
                    foreach (var item in model.OrderDetails)
                    {
                        parameters.Add("@ProductId", item.ProductId);
                        parameters.Add("@Quantity", item.Quantity);
                        parameters.Add("@Price", item.Price);
                        parameters.Add("@Id", result.OrderId);
                        parameters.Add("@Size", item.Size);

                        var ght = await connection.QueryFirstOrDefaultAsync(
                           "SP_Order",
                           parameters,
                           commandType: CommandType.StoredProcedure);


                    }
                    //parameters.Add("@ProductId", model.OrderDetails[0].ProductId);
                    //parameters.Add("@Quantity", model.OrderDetails[0].Quantity);
                    //parameters.Add("@Price", model.OrderDetails[0].Price);




                }



                var Cartparameters = new DynamicParameters();
                Cartparameters.Add("@flag", 8);
                Cartparameters.Add("@UserId", model.UserId);
                await connection.QueryFirstOrDefaultAsync(
                    "SP_AddToCart",
                    Cartparameters,
                    commandType: CommandType.StoredProcedure
                );
                if(model.Payment !="Cash On Delivary")
                {
                    var bkash = await _bKashService.InitiatePaymentAsync(new Model.PaymentRequest
                    {
                        Amount = model.TotalAmount ?? 10,
                        CustomerName = model.UserName ?? "Sanjida Emu",
                        CustomerPhone = model.Phone ?? "0186554485",
                        ProductName = "Order#" + result.OrderId,
                        OrderId = result.OrderId.ToString(),
                        MerchantInvoiceNumber = "INV-" + result.OrderId + "-" + DateTime.Now.Ticks,
                        SuccessUrl = "http://localhost:4200/payment-confirmation"
                    });

                    parameters.Add("@flag", 9);
                    parameters.Add("@bkashTrns", bkash.PaymentId);

                    var ghts = await connection.QueryFirstOrDefaultAsync(
                               "SP_Order",
                               parameters,
                               commandType: CommandType.StoredProcedure);


                    return Ok(bkash);
                }
                return Ok(result);
               
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }

        [HttpGet("Success_URL")]
        public async Task<IActionResult> Success_URL(string paymentId)
        {
            var bkash = await _bKashService.ConfirmPaymentAsync(paymentId);
            var parameters = new DynamicParameters();
            parameters.Add("@flag", 10);
            parameters.Add("@bkashTrns", paymentId);

            using var connection = _context.CreateConnection();
            var ght = await connection.QueryFirstOrDefaultAsync(
                       "SP_Order",
                       parameters,
                       commandType: CommandType.StoredProcedure);

            return Ok(bkash);
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
            parameters.Add("@Size", model.Size);

            // 🔹 NEW
            parameters.Add("@Status", model.Status);
            parameters.Add("@MethodNum", model.MethodNum);
            parameters.Add("@OTP", model.OTP);

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
        [HttpGet("invoice/{orderId}")]
        public async Task<IActionResult> GetInvoiceByOrderId(int orderId)
        {
            using var connection = _context.CreateConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@flag", 8);
            parameters.Add("@Id", orderId);

            using var multi = await connection.QueryMultipleAsync(
                "SP_Order",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            var header = await multi.ReadFirstOrDefaultAsync<dynamic>();
            var products = (await multi.ReadAsync<dynamic>()).ToList();
            var subTotal = await multi.ReadFirstOrDefaultAsync<decimal>();

            var result = new
            {
                Header = header,
                Products = products,
                SubTotal = subTotal
            };

            return Ok(result);
        }



    }
}

