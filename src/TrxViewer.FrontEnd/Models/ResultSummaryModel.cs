using System.Text.Json.Serialization;

namespace TrxViewer.FrontEnd.Models
{
	public class ResultSummaryModel
	{
		[JsonConverter(typeof(JsonStringEnumConverter))]
		public Outcome Outcome { get; set; }
	}
}