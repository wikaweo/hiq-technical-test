using Microsoft.AspNetCore.Http.Features;
using System.Text.RegularExpressions;

var builder = WebApplication.CreateBuilder(args);

// Tillåt CORS för frontend-kommunikation
builder.Services.AddCors();

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10485760; // Max 10 MB
});

var app = builder.Build();

// CORS-policy (öppen – ändra vid behov)
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod());

// Endpoints
app.MapPost("/api/process", async (HttpRequest request) =>
{
    // Kontrollera fil
    if (!request.HasFormContentType || !request.Form.Files.Any())
        return Results.BadRequest("No file uploaded.");

    var file = request.Form.Files[0];

    using var reader = new StreamReader(file.OpenReadStream());
    var content = await reader.ReadToEndAsync();

    // Räkna ord
    var words = Regex.Matches(content.ToLower(), "\\b\\w+\\b")
                     .Cast<Match>()
                     .GroupBy(m => m.Value)
                     .OrderByDescending(g => g.Count())
                     .FirstOrDefault();

    if (words == null)
        return Results.Ok(content);

    var mostUsed = words.Key;

    // Omringa det vanligaste ordet med foo/bar
    var processedText = Regex.Replace(
        content,
        $"\\b{Regex.Escape(mostUsed)}\\b",
        $"foo{mostUsed}bar",
        RegexOptions.IgnoreCase
    );

    return Results.Ok(processedText);
});

app.Run();