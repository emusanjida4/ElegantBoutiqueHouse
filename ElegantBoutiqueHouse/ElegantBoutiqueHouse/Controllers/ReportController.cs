using Dapper;
using ElegantBoutiqueHouse.Context;
using ElegantBoutiqueHouse.Model;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ElegantBoutiqueHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly DapperContext _context;

        public ReportController(DapperContext context)
        {
            _context = context;
        }

        [HttpGet("daily")]
        public async Task<IActionResult> GetDailyReport()
        {
            try
            {
                using var connection = _context.CreateConnection();
                var report = await connection.QueryAsync<ReportModel>(
                    "SP_GetDailyReport",
                    commandType: CommandType.StoredProcedure
                );

                return Ok(report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error generating report", error = ex.Message });
            }
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            try
            {
                using var connection = _context.CreateConnection();
                var stats = await connection.QueryFirstOrDefaultAsync<DashboardStatsModel>(
                    "SP_GetDashboardStats",
                    commandType: CommandType.StoredProcedure
                );

                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching dashboard stats", error = ex.Message });
            }
        }
    }
}
