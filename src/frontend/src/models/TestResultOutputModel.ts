interface TestResultOutputModel {
	errorInfo: ErrorInfo
}

interface ErrorInfo {
	message: string;
	stackTrace: string;
}


export default TestResultOutputModel;
