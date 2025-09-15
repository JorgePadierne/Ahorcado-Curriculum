using System.ComponentModel.DataAnnotations;

namespace ServerAhorcado.Models
{
    public class PuntuacionUsuario
    {
        [Required(AllowEmptyStrings = false)]
        public string? Usuario { get; set; }

        [Required(AllowEmptyStrings = false)]
        public int? Puntuacion { get; set; }
    }
}
