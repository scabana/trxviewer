using System.Text.Json.Serialization;

namespace TrxViewer.FrontEnd.Models
{
	public class ResultSummaryModel
	{
		[JsonPropertyName("outcome")]
		public string Outcome { get; set; }
	}
}