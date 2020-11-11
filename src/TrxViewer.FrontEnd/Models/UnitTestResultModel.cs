using System.Text.Json.Serialization;

namespace TrxViewer.FrontEnd.Models
{
	public class UnitTestResultModel
	{
		[JsonPropertyName("testName")]
		public string TestName { get; set; }
		[JsonPropertyName("outcome")]
		public string Outcome { get; set; }
		[JsonPropertyName("output")]
		public OutputModel Output { get; set; }
		[JsonPropertyName("testId")]
		public string TestId { get; set; }
	}
}