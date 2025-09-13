using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ServerAhorcado.Models;

public partial class Usuario
{
    public long Id { get; set; }
    [Required(AllowEmptyStrings = false)]
    public string? Name { get; set; }
    [Required(AllowEmptyStrings = false)]
    public string? Password { get; set; }
}
