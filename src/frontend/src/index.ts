import { createApp } from './AppContext';

createApp({
	canShowTest: () => false,
	raiseTestMethodExists: (testId: string) => { },
	showFilePicker: () => true,
	navToTestMethod: () => { },

});

