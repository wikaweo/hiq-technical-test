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

// CORS-policy (öppen – anpassa för produktion)
app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod());

// POST-endpoint för att bearbeta en uppladdad .txt-fil
app.MapPost("/api/process", async (IFormFile file) =>
{
    // Kontrollera om det är en .txt-fil
    if (!file.FileName.EndsWith(".txt", StringComparison.OrdinalIgnoreCase))
    {
        return Results.BadRequest("Endast .txt-filer accepteras.");
    }

    try
    {
        using var reader = new StreamReader(file.OpenReadStream());
        var content = await reader.ReadToEndAsync();

        if (string.IsNullOrWhiteSpace(content))
        {
            return Results.BadRequest("Filen är tom.");
        }

        // Räkna förekomsten av varje ord (case-insensitivt)
        var words = Regex.Matches(content.ToLower(), "\\b\\w+\\b")
                         .Cast<Match>()
                         .GroupBy(m => m.Value)
                         .OrderByDescending(g => g.Count())
                         .FirstOrDefault();

        // Om inga ord hittades, returnera originaltext
        if (words == null)
        {
            return Results.Ok(new
            {
                original = content,
                modified = content,
                mostUsed = ""
            });
        }

        var mostUsed = words.Key;

        // Markera det vanligaste ordet med foo/bar
        var processedText = Regex.Replace(
            content,
            $"\\b{Regex.Escape(mostUsed)}\\b",
            $"foo{mostUsed}bar",
            RegexOptions.IgnoreCase
        );

        // Returnera original, bearbetad text och vanligaste ordet
        return Results.Ok(new
        {
            original = content,
            modified = processedText,
            mostUsed = mostUsed
        });
    }
    catch (Exception ex)
    {
        // Loggning kan läggas till här
        return Results.Problem("Ett internt fel uppstod vid bearbetning.");
    }
}).DisableAntiforgery();

app.Run();
