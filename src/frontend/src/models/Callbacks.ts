export default interface Callbacks {
	canShowTest: () => boolean;
	showFilePicker: () => boolean;
	navToTestMethod: (testId: string) => void;
	raiseTestMethodExists: (testId: string) => void;
}

