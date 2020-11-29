import { createApp } from './AppContext';

createApp({
	canShowTest: () => false,
	raiseTestMethodExists: (testId: string) => console.log("raiseTestMethodExists"),
	showFilePicker: () => true,
	navToTestMethod: () => console.log("navToTestMethod called"),
});

