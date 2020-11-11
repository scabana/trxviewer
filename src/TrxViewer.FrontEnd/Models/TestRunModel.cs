using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TrxViewer.FrontEnd.Models
{
	public class TestRunModel
	{
		[JsonPropertyName("results")]
		public List<UnitTestResultModel> Results { get; set; }

		[JsonPropertyName("resultSummary")]
		public ResultSummaryModel ResultSummary { get; set; }
	}
}