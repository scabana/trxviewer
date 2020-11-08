using System.Text.Json.Serialization;

namespace TrxViewer.FrontEnd.Models
{
	public class UnitTestResultModel
	{
		public string TestName { get; set; }

		[JsonConverter(typeof(JsonStringEnumConverter))]
		public Outcome Outcome { get; set; }

		public OutputModel Output { get; set; }

		public string TestId { get; set; }
	}
}