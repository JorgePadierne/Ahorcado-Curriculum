using System;
using System.Collections.Generic;

namespace ServerAhorcado.Models;

public partial class Puntuaciones
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public decimal? Puntuacion { get; set; }
}
