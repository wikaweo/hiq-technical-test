using hiq_test_backend;
using Microsoft.AspNetCore.Http.Features;
using RtfPipe;
using HtmlAgilityPack;

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
    var allowedExtensions = new[] { ".txt", ".rtf", ".md", ".file" };

    if (!allowedExtensions.Contains(Path.GetExtension(file.FileName), StringComparer.OrdinalIgnoreCase))
        return Results.BadRequest("Endast .txt, .rtf, .md, och .file-filer accepteras.");

    try
    {
        string content;

        using var reader = new StreamReader(file.OpenReadStream());
        var rawContent = await reader.ReadToEndAsync();

        if (string.IsNullOrWhiteSpace(rawContent))
            return Results.BadRequest("Filen är tom.");

        var fileExtension = Path.GetExtension(file.FileName).ToLower();

        if (fileExtension == ".rtf")
        {
            var html = Rtf.ToHtml(rawContent);

            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);
            content = htmlDoc.DocumentNode.InnerText;
        }
        else
        {
            content = rawContent;
        }

        var (modified, mostUsed) = TextProcessor.ProcessText(content);

        return Results.Ok(new
        {
            original = content,
            modified = modified,
            mostUsed = mostUsed
        });
    }
    catch (Exception ex)
    {
        return Results.Problem("Ett internt fel uppstod vid bearbetning");
    }
}).DisableAntiforgery();

app.Run();
