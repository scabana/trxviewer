using System.Collections.Generic;

namespace TrxViewer.FrontEnd.Models
{
	public class TestRunModel
	{
		public List<UnitTestResultModel> Results { get; set; }

		public ResultSummaryModel ResultSummary { get; set; }
	}
}