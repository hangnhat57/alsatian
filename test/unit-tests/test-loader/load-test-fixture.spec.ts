import { TestLoader } from "../../../core/test-loader";
import { FileRequirer } from "../../../core/file-requirer";
import { Expect, Test, TestCase, SpyOn, FocusTests } from "../../../core/alsatian-core";
import "reflect-metadata";

export class LoadTestTests {

   @Test()
   public ignoredShouldBeFalseByDefault() {

     let fileRequirer = new FileRequirer();

     let testFixtureInstance = {};
     Reflect.defineMetadata("alsatian:tests", [], testFixtureInstance);

     let testFixtureSet = {
        testFixture: () => testFixtureInstance
     };

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureSet);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test")[0].ignored).toBe(false);
   }

   @Test()
   public ignoredShouldBeTrueIfMetadataSet() {

     let fileRequirer = new FileRequirer();

      let testFixtureInstance = {};
      Reflect.defineMetadata("alsatian:tests", [], testFixtureInstance);

      let testFixtureSet = {
         testFixture: () => testFixtureInstance
      };

     Reflect.defineMetadata("alsatian:ignore", true,  testFixtureSet.testFixture);

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureSet);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test")[0].ignored).toBe(true);
   }

   @Test()
   public focussedShouldBeFalseByDefault() {

     let fileRequirer = new FileRequirer();

     let testFixtureInstance = {};
     Reflect.defineMetadata("alsatian:tests", [], testFixtureInstance);

     let testFixtureSet = {
        testFixture: () => testFixtureInstance
     };

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureSet);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test")[0].focussed).toBe(false);
   }

   @Test()
   public focussedShouldBeTrueIfMetadataSet() {

     let fileRequirer = new FileRequirer();

      let testFixtureInstance = {};
      Reflect.defineMetadata("alsatian:tests", [], testFixtureInstance);

      let testFixtureSet = {
         testFixture: () => testFixtureInstance
      };

     Reflect.defineMetadata("alsatian:focus", true,  testFixtureSet.testFixture);

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureSet);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test")[0].focussed).toBe(true);
   }

   @Test()
   public noTestsReturnsEmptyArray() {

     let fileRequirer = new FileRequirer();

      let testFixtureInstance = {};

      let testFixtureSet = {
         testFixture: () => testFixtureInstance
      };

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureSet);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test").length).toBe(0);
   }
 }