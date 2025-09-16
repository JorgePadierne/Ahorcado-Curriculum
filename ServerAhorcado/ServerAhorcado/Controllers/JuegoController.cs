using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerAhorcado;
using ServerAhorcado.Context;
using ServerAhorcado.Models;
using System.Globalization;
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
        [HttpGet("palabraaleatoria")]
        public async Task<IActionResult> GetPalabra([FromQuery] string dificultad)
        {
            try
            {
                IQueryable<Palabra>? query = dificultad switch
                {
                    "facil" => _context.Palabras.Where(p => p.Palabras.Length >= 4 && p.Palabras.Length <= 5),
                    "medio" => _context.Palabras.Where(p => p.Palabras.Length >= 6 && p.Palabras.Length <= 9),
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
        //puntaje = (intentos_restantes × 100 + largo_palabra × 10 + bono_tiempo) × multiplicador_dificultad + bonus_especiales
        [HttpGet("puntuaciones")]
        public async Task<IActionResult> GetPuntuaciones()
        {
            try
            {
                var puntuaciones = await _context.Puntuaciones.ToListAsync();
                if (puntuaciones == null)
                {
                    return StatusCode(204, new { succes = false, message = "No existen puntuaciones en la lista." });
                }
                return Ok(puntuaciones);
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "Accion incompleta." + ex.Message});
            }
           
        }

        [HttpPatch("agregarpuntuacion")]
        public async Task<IActionResult> AgregarPuntuacion([FromBody] PuntuacionUsuario puntuacion)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var puntajeExistente = await _context.Puntuaciones
                    .FirstOrDefaultAsync(p => p.Name == puntuacion.Usuario);

                if (puntajeExistente != null)
                {
                    puntajeExistente.Puntuacion += puntuacion.Puntuacion;
                    await _context.SaveChangesAsync();

                    return Ok(new { success = true, message = "Puntuación actualizada correctamente" });
                }
                else
                {
                    var nuevo = new Puntuaciones
                    {
                        Name = puntuacion.Usuario,
                        Puntuacion = puntuacion.Puntuacion
                    };

                    await _context.Puntuaciones.AddAsync(nuevo);
                    await _context.SaveChangesAsync();

                    return StatusCode(201, new { success = true, message = "Puntuación registrada correctamente" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Algo ha ido mal, inténtelo nuevamente: " + ex.Message });
            }
        }

    }
}
