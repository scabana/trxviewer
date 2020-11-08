using System.Text.Json.Serialization;
using System.Xml;
using System.Xml.Serialization;

namespace TrxViewer.FrontEnd.Models
{
	public class OutputModel
	{
		[JsonPropertyName("errorInfo")]
		public ErrorInfoModel ErrorInfo { get; set; }
	}
}