import { parseStringXml, getTestRun, getTestModel, getTestResultOutputModel } from "./trx";

const sample = `<?xml version="1.0" encoding="utf-8"?>
<TestRun id="49914549-1534-455f-86d3-8c3096d67d63" name="sim19@DESKTOP-UMPMQKV 2020-10-05 09:03:10" runUser="DESKTOP-UMPMQKV\\sim19"
  xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
  <Times creation="2020-10-05T09:03:10.0501604-04:00" queuing="2020-10-05T09:03:10.0501620-04:00" start="2020-10-05T09:03:08.0137500-04:00" finish="2020-10-05T09:03:10.0669509-04:00" />
  <TestSettings name="default" id="878a7d0b-a0b5-4262-8738-9b08d1cd7fb7">
    <Deployment runDeploymentRoot="sim19_DESKTOP-UMPMQKV_2020-10-05_09_03_10" />
  </TestSettings>
  <Results>
    <UnitTestResult executionId="8ebccd85-89ae-4615-8946-71e3491ae8c0" testId="2d5935d2-c181-3a5c-6def-e766388edd1a" testName="TestOutputs.Console.Tests.UnitTest1.Test1(data: True, index: 0)" computerName="DESKTOP-UMPMQKV" duration="00:00:00.0034876" startTime="2020-10-05T09:03:09.9108370-04:00" endTime="2020-10-05T09:03:09.9109239-04:00" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Failed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="8ebccd85-89ae-4615-8946-71e3491ae8c0">
      <Output>
        <ErrorInfo>
          <Message>System.Exception : Exception of type 'System.Exception' was thrown.</Message>
          <StackTrace>   at TestOutputs.Console.Program.DoIt11(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 68&#xD;
   at TestOutputs.Console.Program.DoIt10(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 59&#xD;
   at TestOutputs.Console.Program.DoIt9(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 54&#xD;
   at TestOutputs.Console.Program.DoIt8(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 49&#xD;
   at TestOutputs.Console.Program.DoIt7(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 44&#xD;
   at TestOutputs.Console.Program.DoIt6(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 39&#xD;
   at TestOutputs.Console.Program.DoIt5(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 34&#xD;
   at TestOutputs.Console.Program.DoIt4(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 29&#xD;
   at TestOutputs.Console.Program.DoIt3(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 24&#xD;
   at TestOutputs.Console.Program.DoIt2(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 19&#xD;
   at TestOutputs.Console.Program.DoIt(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 14&#xD;
   at TestOutputs.Console.Tests.UnitTest1.Test1(Boolean data, Int32 index) in D:\\Playground\\TestOuputs\\TestOutputs.Console.Tests\\UnitTest1.cs:line 32</StackTrace>
        </ErrorInfo>
      </Output>
    </UnitTestResult>
  </Results>
  <TestDefinitions>
    <UnitTest name="TestOutputs.Console.Tests.UnitTest1.Test1(data: True, index: 0)" storage="d:\\playground\\testouputs\\testoutputs.console.tests\\bin\\debug\\netcoreapp3.1\\testoutputs.console.tests.dll" id="2d5935d2-c181-3a5c-6def-e766388edd1a">
      <Execution id="8ebccd85-89ae-4615-8946-71e3491ae8c0" />
      <TestMethod codeBase="D:\\Playground\\TestOuputs\\TestOutputs.Console.Tests\\bin\\Debug\\netcoreapp3.1\\TestOutputs.Console.Tests.dll" adapterTypeName="executor://xunit/VsTestRunner2/netcoreapp" className="TestOutputs.Console.Tests.UnitTest1" name="Test1" />
    </UnitTest>
  </TestDefinitions>
  <TestEntries>
    <TestEntry testId="2d5935d2-c181-3a5c-6def-e766388edd1a" executionId="8ebccd85-89ae-4615-8946-71e3491ae8c0" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" />
  </TestEntries>
  <TestLists>
    <TestList name="Results Not in a List" id="8c84fa94-04c1-424b-9868-57a2d4851a1d" />
    <TestList name="All Loaded Results" id="19431567-8539-422a-85d7-44ee4e166bda" />
  </TestLists>
  <ResultSummary outcome="Failed">
    <Counters total="1" executed="1" passed="0" failed="1" error="0" timeout="0" aborted="0" inconclusive="0" passedButRunAborted="0" notRunnable="0" notExecuted="0" disconnected="0" warning="0" completed="0" inProgress="0" pending="0" />
    <Output>
      <StdOut>[xUnit.net 00:00:00.00] xUnit.net VSTest Adapter v2.4.0 (64-bit .NET Core 3.1.8)&#xD;
[xUnit.net 00:00:00.59]   Discovering: TestOutputs.Console.Tests&#xD;
[xUnit.net 00:00:00.64]   Discovered:  TestOutputs.Console.Tests&#xD;
[xUnit.net 00:00:00.65]   Starting:    TestOutputs.Console.Tests&#xD;
[xUnit.net 00:00:00.74]       System.Exception : Exception of type 'System.Exception' was thrown.&#xD;
[xUnit.net 00:00:00.74]       Stack Trace:&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(68,0): at TestOutputs.Console.Program.DoIt11(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(59,0): at TestOutputs.Console.Program.DoIt10(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(54,0): at TestOutputs.Console.Program.DoIt9(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(49,0): at TestOutputs.Console.Program.DoIt8(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(44,0): at TestOutputs.Console.Program.DoIt7(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(39,0): at TestOutputs.Console.Program.DoIt6(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(34,0): at TestOutputs.Console.Program.DoIt5(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(29,0): at TestOutputs.Console.Program.DoIt4(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(24,0): at TestOutputs.Console.Program.DoIt3(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(19,0): at TestOutputs.Console.Program.DoIt2(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs(14,0): at TestOutputs.Console.Program.DoIt(Boolean shouldFail)&#xD;
[xUnit.net 00:00:00.74]         D:\\Playground\\TestOuputs\\TestOutputs.Console.Tests\\UnitTest1.cs(32,0): at TestOutputs.Console.Tests.UnitTest1.Test1(Boolean data, Int32 index)&#xD;
[xUnit.net 00:00:00.75]   Finished:    TestOutputs.Console.Tests&#xD;
      </StdOut>
    </Output>
    <RunInfos>
      <RunInfo computerName="DESKTOP-UMPMQKV" outcome="Error" timestamp="2020-10-05T09:03:09.9063172-04:00">
        <Text>[xUnit.net 00:00:00.74]     TestOutputs.Console.Tests.UnitTest1.Test1(data: True, index: 0) [FAIL]</Text>
      </RunInfo>
    </RunInfos>
  </ResultSummary>
</TestRun>`;

describe("trx.ts", () => {

    test('parseStringXml - xml string gets transformed to Document', function () {

        const document = parseStringXml("<A><B></B></A>");

        expect(document).toBeDefined();
        expect(document.querySelector("B")).toBeDefined();
    });

    test('getTestRun - extracts basic information from document', function () {

        const document = parseStringXml(sample);
        const testRun = getTestRun(document);

        expect(testRun.summary).toBeDefined();
        expect(testRun.summary.outcome).toBe("Failed");
        expect(testRun.results).toBeDefined();
        expect(testRun.results.length).toBe(1);
        expect(testRun.results[0].outcome).toBe("Failed");
        expect(testRun.results[0].testId).toBe("2d5935d2-c181-3a5c-6def-e766388edd1a");
        expect(testRun.results[0].testName).toBe("TestOutputs.Console.Tests.UnitTest1.Test1(data: True, index: 0)");
    });

    test('getTestModel - extracts test model from document', function () {

        const document = parseStringXml(sample);
        const testModel = getTestModel(document, "2d5935d2-c181-3a5c-6def-e766388edd1a");

        expect(testModel).toBeDefined();
        expect(testModel.name).toBe("TestOutputs.Console.Tests.UnitTest1.Test1(data: True, index: 0)");
        expect(testModel.testMethodClassName).toBe("TestOutputs.Console.Tests.UnitTest1");
        expect(testModel.testMethodName).toBe("Test1");
    });

    test('getTestModel - extracts test model from document', function () {

        const document = parseStringXml(sample);
        const testResultOutputModel = getTestResultOutputModel(document, "2d5935d2-c181-3a5c-6def-e766388edd1a");

        expect(testResultOutputModel).toBeDefined();
        expect(testResultOutputModel?.errorInfo).toBeDefined();
        expect(testResultOutputModel?.errorInfo.message).toBe("System.Exception : Exception of type 'System.Exception' was thrown.");
        expect(testResultOutputModel?.errorInfo.stackTrace).toBe(`   at TestOutputs.Console.Program.DoIt11(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 68\r\n   at TestOutputs.Console.Program.DoIt10(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 59\r\n   at TestOutputs.Console.Program.DoIt9(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 54\r\n   at TestOutputs.Console.Program.DoIt8(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 49\r\n   at TestOutputs.Console.Program.DoIt7(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 44\r\n   at TestOutputs.Console.Program.DoIt6(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 39\r\n   at TestOutputs.Console.Program.DoIt5(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 34\r\n   at TestOutputs.Console.Program.DoIt4(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 29\r\n   at TestOutputs.Console.Program.DoIt3(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 24\r\n   at TestOutputs.Console.Program.DoIt2(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 19\r\n   at TestOutputs.Console.Program.DoIt(Boolean shouldFail) in D:\\Playground\\TestOuputs\\TestOutputs.Console\\Program.cs:line 14\r\n   at TestOutputs.Console.Tests.UnitTest1.Test1(Boolean data, Int32 index) in D:\\Playground\\TestOuputs\\TestOutputs.Console.Tests\\UnitTest1.cs:line 32`);
    });

});
