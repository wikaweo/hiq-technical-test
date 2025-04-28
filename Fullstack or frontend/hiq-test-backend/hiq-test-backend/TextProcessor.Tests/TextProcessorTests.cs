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
            string input = "The cat and the dog went to the market. The dog barked at the cat.";

            var (modified, mostUsed) = TextProcessor.ProcessText(input);

            Assert.Equal("the", mostUsed, ignoreCase: true);
            Assert.Contains("foothebar", modified.ToLower());
            Assert.Equal(5, Regex.Matches(modified.ToLower(), "foothebar").Count);
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
