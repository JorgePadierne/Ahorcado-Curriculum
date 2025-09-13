using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerAhorcado.Models;
using ServerAhorcado.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Abstractions;
namespace ServerAhorcado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        public readonly AhorcadoDBContext _context;

        public UsuarioController(AhorcadoDBContext context)
        {
            _context = context;
        }

        [HttpPost("Registrar")]
        public async Task<IActionResult> RegistrarUsuario([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _context.Usuarios.AnyAsync(u => u.Name == usuario.Name))
                return Conflict(new { success = false, mensaje = "El usuario ya existe" });

            try
            {
                var hasher = new PasswordHasher<Usuario>();
                usuario.Password = hasher.HashPassword(usuario, usuario.Password);

                await _context.Usuarios.AddAsync(usuario);
                await _context.SaveChangesAsync();

                return StatusCode(201, new { success = true, mensaje = "Usuario creado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, mensaje = "El usuario no pudo ser creado correctamente" + ex.Message });
            }
        }
        [HttpPost("IniciarSesion")]
        public async Task<IActionResult> IniciarSesion([FromBody] IniciarSesion iniciarSesion )
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Name == iniciarSesion.Name);
                if (usuario == null)
                {
                    return Unauthorized(new { success = false, message = "Los datos no son correctos" });
                }
                var hasher = new PasswordHasher<Usuario>();
                var resultado = hasher.VerifyHashedPassword(usuario, usuario.Password, iniciarSesion.Password);
                if (resultado == PasswordVerificationResult.Failed)
                {
                    return Unauthorized(new { success = false, message = "Usuario o contraseña incorrectos" });
                }
                return Ok(new { success = true, message = "Inicio de sesión exitoso" });
            }
            catch (Exception ex )
            {
                return StatusCode(500 ,new { success = false, message = "No se pudo realizar el inicio de sesión: " + ex.Message });
            }
        }
    

    }
}
