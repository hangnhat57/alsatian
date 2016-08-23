import { ITestFixture, ITest } from "./_interfaces";
import { createPromise } from "../promise/create-promise";
import { MatchError, TestSetResults, TestFixtureResults, TestResults, TestSet, TestOutput, TestTimeoutError } from "./alsatian-core";
import { TestPlan } from "./test-plan";
import { TestItem } from "./test-item";
import "reflect-metadata";

export class TestRunner {

   private _output: TestOutput;

   constructor (output?: TestOutput) {
       // If we were given a TestOutput, use it, otherwise make one
       if (output !== undefined) {
           this._output = output;
       } else {
           this._output = new TestOutput(process.stdout);
       }
   }

   public run(testSet: TestSet, timeout?: number) {

     let promise = createPromise();

     if (!timeout) {
        timeout = 500;
     }

     const testSetResults = new TestSetResults();
     // TODO: handle these neatly
     let currentTestFixtureResults = testSetResults.addTestFixtureResult(testSet.testFixtures[0]);
     let currentTestResults = currentTestFixtureResults.addTestResult(testSet.testFixtures[0].tests[0]);

     const testPlan = new TestPlan(testSet);

     if (testPlan.testItems.length === 0) {
       throw new Error("no tests to run.");
     }

     var scheduleNextTestPlanItem = (testPlanItem: any) => {

       if (testPlanItem) {
         if (currentTestFixtureResults.fixture !== testPlanItem.testFixture) {
           currentTestFixtureResults = testSetResults.addTestFixtureResult(testPlanItem.testFixture);
         }

         if (currentTestResults.test !== testPlanItem.test) {
           currentTestResults = currentTestFixtureResults.addTestResult(testPlanItem.test);
         }

         testPlanItem.run(timeout)
         .then((testResults: { test: ITest, error: Error }) => {
           createResultAndRunNextTest(testPlanItem, testResults.test, testResults.error);
         })
         .catch((error: Error) => {
           console.log(error);
         });
       }
       else {
         promise.resolve(testSetResults);
       }
     };

     var createResultAndRunNextTest = (testItem: TestItem, test: any, error?: Error) => {
       let result = currentTestResults.addTestCaseResult(test.arguments, error);
       this._output.emitResult(testPlan.testItems.indexOf(testItem) + 1, result);

      const nextTestPlanIndex = testPlan.testItems.indexOf(testItem) + 1;
      scheduleNextTestPlanItem(testPlan.testItems[nextTestPlanIndex]);
     }

     this._output.emitVersion();
     this._output.emitPlan(testPlan.testItems.length);

     scheduleNextTestPlanItem(testPlan.testItems[0]);

     return promise;
   }
}
