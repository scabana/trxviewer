using System.Text.Json.Serialization;

namespace TrxViewer.FrontEnd.Models
{
	public class UnitTestModel
	{
		[JsonPropertyName("name")]
		public string Name { get; set; }
		[JsonPropertyName("testMethodClassName")]
		public string TestMethodClassName { get; set; }
		[JsonPropertyName("testMethodName")]
		public string TestMethodName { get; set; }
	}
}