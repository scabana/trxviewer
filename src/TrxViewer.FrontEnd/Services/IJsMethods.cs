using System.Threading.Tasks;
using TrxViewer.FrontEnd.Models;

namespace TrxViewer.FrontEnd.Services
{
	public interface IJsMethods
	{
		Task<bool> CanShowTest();
		Task<bool> ShowFilePicker();
		Task ShowTest(string testId);
		Task<UnitTestModel> GetTestModel(string testId);
		Task<OutputModel> GetTestResultOutputModel(string testId);
		Task NavToTestMethod(string testId);
	}
}