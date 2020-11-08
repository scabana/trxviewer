using System.Text.Json.Serialization;

namespace TrxViewer.FrontEnd.Models
{
	public class ErrorInfoModel
	{
		[JsonPropertyName("message")]
		public string Message { get; set; }

		[JsonPropertyName("stackTrace")]
		public string StackTrace { get; set; }
	}
}