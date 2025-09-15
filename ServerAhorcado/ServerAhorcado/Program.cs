using Microsoft.EntityFrameworkCore;
using ServerAhorcado.Context;
using System.Web;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios
builder.Services.AddControllers();

// Configuración de OpenAPI
builder.Services.AddOpenApi();

// Configuración de CORS solo para tu frontend de producción
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirVercel", policy =>
    {
        policy
            .WithOrigins("https://ahorcado-curriculum.vercel.app") // Solo producción
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // si envías cookies o JWT
    });
});

// Configuración de base de datos
string? databaseUrl = builder.Configuration["DATABASE_URL"];
string connectionString;

if (!string.IsNullOrEmpty(databaseUrl) &&
    (databaseUrl.StartsWith("postgres") || databaseUrl.StartsWith("postgresql")))
{
    var uri = new Uri(databaseUrl);
    var userInfo = uri.UserInfo.Split(':');
    var username = userInfo[0];
    var password = userInfo[1];
    var host = uri.Host;
    var port = uri.Port;
    var database = uri.AbsolutePath.TrimStart('/');
    var query = HttpUtility.ParseQueryString(uri.Query);
    var sslMode = query["sslmode"] ?? "Require";

    connectionString =
        $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode={sslMode};Trust Server Certificate=true";
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("No se encontró ninguna cadena de conexión.");
}

builder.Services.AddDbContext<AhorcadoDBContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

// Usar CORS ANTES de MapControllers y UseAuthorization
app.UseCors("PermitirVercel");

app.UseAuthorization();

// OpenAPI solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));

// Mapear controladores
app.MapControllers();

app.Run();


