namespace TextProcessor.Tests
{
    // File: TextProcessorTests.cs
    using Xunit;
    using System.Text.RegularExpressions;
    using hiq_test_backend;

    public class TextProcessorTests
    {
        [Fact]
        public void ProcessText_ReturnsCorrectlyModifiedText()
        {
            string input = "HiQ is great. HiQ is really great. HiQ!";
            var (modified, mostUsed) = TextProcessor.ProcessText(input);

            Assert.Equal("hiq", mostUsed, ignoreCase: true);
            Assert.Contains("foohiqbar", modified.ToLower());
            Assert.Equal(3, Regex.Matches(modified.ToLower(), "foohiqbar").Count);
        }

        [Fact]
        public void ProcessText_ReturnsOriginalIfEmpty()
        {
            var (modified, mostUsed) = TextProcessor.ProcessText("");
            Assert.Equal("", modified);
            Assert.Equal("", mostUsed);
        }

        [Fact]
        public void ProcessText_HandlesSingleWord()
        {
            var (modified, mostUsed) = TextProcessor.ProcessText("hello");
            Assert.Equal("hello", mostUsed);
            Assert.Equal("foohellobar", modified.ToLower());
        }

        [Fact]
        public void ProcessText_HandlesNoWords()
        {
            var (modified, mostUsed) = TextProcessor.ProcessText("!!! ###");
            Assert.Equal("", mostUsed);
            Assert.Equal("!!! ###", modified);
        }
    }

}
