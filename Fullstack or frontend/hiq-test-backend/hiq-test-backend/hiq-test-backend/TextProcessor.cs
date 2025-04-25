using System.Text.RegularExpressions;

namespace hiq_test_backend
{
    public static class TextProcessor
    {
        public static (string Modified, string MostUsed) ProcessText(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
                return (content, "");

            var words = Regex.Matches(content.ToLower(), "\\b\\w+\\b")
                             .Cast<Match>()
                             .GroupBy(m => m.Value)
                             .OrderByDescending(g => g.Count())
                             .FirstOrDefault();

            if (words == null)
                return (content, "");

            var mostUsed = words.Key;

            var processed = Regex.Replace(
                content,
                $"\\b{Regex.Escape(mostUsed)}\\b",
                $"foo{mostUsed}bar",
                RegexOptions.IgnoreCase
            );

            return (processed, mostUsed);
        }
    }
}
