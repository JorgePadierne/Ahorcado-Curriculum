using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerAhorcado;
using ServerAhorcado.Context;
using ServerAhorcado.Models;
using System.Security.Cryptography;
namespace ServerAhorcado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JuegoController : ControllerBase
    {
        public readonly AhorcadoDBContext _context;
        public JuegoController(AhorcadoDBContext context)
        {
            _context = context;
        }
        [HttpGet("PalabraAleatoria")]
        public async Task<IActionResult> GetPalabra([FromQuery] string dificultad)
        {
            try
            {
                IQueryable<Palabra>? query = dificultad switch
                {
                    "facil" => _context.Palabras.Where(p => p.Palabras.Length >= 4 && p.Palabras.Length <= 5),
                    "media" => _context.Palabras.Where(p => p.Palabras.Length >= 6 && p.Palabras.Length <= 9),
                    "dificil" => _context.Palabras.Where(p => p.Palabras.Length >= 10),
                    _ => null
                };

                if (query == null)
                    return BadRequest(new { success = false, mensaje = "Dificultad no válida. Use 'facil', 'media' o 'dificil'." });

                var palabra = await query.OrderBy(x => Guid.NewGuid()).FirstOrDefaultAsync();

                if (palabra == null)
                    return NotFound(new { success = false, mensaje = $"No hay palabras disponibles para la dificultad {dificultad}" });

                return Ok(new { success = true, palabra = palabra.Palabras });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, mensaje = "Error al obtener la palabra: " + ex.Message });
            }
        }


    }
}
