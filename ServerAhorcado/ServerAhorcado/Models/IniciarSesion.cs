using System.ComponentModel.DataAnnotations;

namespace ServerAhorcado.Models
{
    public class IniciarSesion
    {
        [Required(AllowEmptyStrings = false)]
        public string? Name { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string? Password { get; set; }

    }
}
