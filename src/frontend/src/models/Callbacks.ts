import TestModel from './TestModel';
import { TestResultOutputModel } from './TestResultOutputModel';

export interface Callbacks {
	canShowTest: () => boolean;
	showFilePicker: () => boolean;
	navToTestMethod: (testId: string) => void;
	raiseTestMethodExists: (testId: string) => void;
	getTestModel: (testId: string) => TestModel;
	getTestResultOutputModel: (testId: string) => TestResultOutputModel | null;
}
