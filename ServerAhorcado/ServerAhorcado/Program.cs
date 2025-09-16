using Microsoft.EntityFrameworkCore;
using ServerAhorcado.Context;
using System.Web;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddOpenApi();

string? databaseUrl = builder.Configuration["DATABASE_URL"];
string connectionString;

if (!string.IsNullOrEmpty(databaseUrl) &&
    (databaseUrl.StartsWith("postgres") || databaseUrl.StartsWith("postgresql")))
{
    // Parsear DATABASE_URL estilo Heroku/Neon
    var uri = new Uri(databaseUrl);

    var userInfo = uri.UserInfo.Split(':');
    var username = userInfo[0];
    var password = userInfo[1];

    var host = uri.Host;
    var port = uri.Port == -1 ? 5432 : uri.Port;
    var database = uri.AbsolutePath.TrimStart('/');

    var query = HttpUtility.ParseQueryString(uri.Query);
    var sslMode = query["sslmode"] ?? "Require";

    connectionString =
        $"Host={host};Port={port};Database={database};Username={username};Password={password};SSL Mode={sslMode};Trust Server Certificate=true";
}
else
{
    // Fallback a appsettings.json ? ConnectionStrings:DefaultConnection
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("No se encontró ninguna cadena de conexión.");
}

builder.Services.AddDbContext<AhorcadoDBContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors("PermitirReact");
app.UseAuthorization();
app.MapControllers();
app.Run();
