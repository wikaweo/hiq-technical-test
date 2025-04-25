// --- Program.cs ---
using hiq_test_backend;
using Microsoft.AspNetCore.Http.Features;
using System.Text.RegularExpressions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10485760; // Max 10 MB
});

var app = builder.Build();

app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod());

app.MapPost("/api/process", async (IFormFile file) =>
{
    if (!file.FileName.EndsWith(".txt", StringComparison.OrdinalIgnoreCase))
        return Results.BadRequest("Endast .txt-filer accepteras.");

    try
    {
        using var reader = new StreamReader(file.OpenReadStream());
        var content = await reader.ReadToEndAsync();

        if (string.IsNullOrWhiteSpace(content))
            return Results.BadRequest("Filen är tom.");

        var (modified, mostUsed) = TextProcessor.ProcessText(content);

        return Results.Ok(new
        {
            original = content,
            modified = modified,
            mostUsed = mostUsed
        });
    }
    catch
    {
        return Results.Problem("Ett internt fel uppstod vid bearbetning.");
    }
}).DisableAntiforgery();

app.Run();