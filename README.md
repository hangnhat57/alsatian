# alsatian
TypeScript testing framework with test cases, compatible with istanbul and tap reporters.

## Installing

Good news everybody, we're on NPM.
```
npm install alsatian
```

## Running alsatian

Alsatian has a CLI for easy use with your package.json or your favourite cli tool

```
alsatian [list of globs]

alsatian ./test/**/*.spec.js ./special-test.js
```

## Using alsatian

Create your first spec file

```
import { Expect, Test } from "alsatian";

export class ExampleTestFixture {

  @Test()
  public exampleTest() {
    Expect(1 + 1).toBe(2);
  }
}
```

Then check all is well

```
> alsatian ./path/to/example.spec
TAP version 13
1..1
ok 1 - exampleTest
```

### Naming Tests

By default, tests will be named the same as their functions and this will be what is output by alsatian. However, you can give the test a more meaningful name simply by supplying the ```Test``` annotation with whatever you desire.

```
import { Expect, Test } from "alsatian";

export class ExampleTestFixture {

  @Test("Confirm 1 + 1 is 2")
  public test1() {
    Expect(1 + 1).toBe(2);
  }
}
```

Then check all is well

```
> alsatian ./path/to/example.spec
TAP version 13
1..1
ok 1 - Confirm 1 + 1 is 2
```

### Test Cases

You can pass arguments to your tests simply by using the ```TestCase``` annotation

```
import { Expect, TestCase } from "alsatian";

export class ExampleTestFixture {

  @TestCase(1, 2)
  @TestCase(4, 5)
  public exampleTest(preIteratedValue: number, expected: number) {
    Expect(preIteratedValue++).toBe(expected);
  }
}
```

### Matchers

Now you've set up some tests, it's time to check your code is working. Let's start easy.

#### toBe

To be or not to be, that is the question! Simply put this checks whether actual === expected

```
Expect(1 + 1).toBe(2);
Expect(1 + 1).not.toBe(3);
```

#### toEqual

Next we can check if it's pretty much the same actual == expected

```
Expect("1").toEqual(1);
Expect(1 + 1).not.toEqual("3");
```

#### toMatch

Now a cheeky little regular expression if you don't mind

```
Expect("something").toMatch(/some/);
Expect("another thing").not.toMatch(/something/);
```

#### toBeDefined

Is it there or not? actual !== undefined

```
Expect("something").toBeDefined();
Expect(undefined).not.toBeDefined();
```

#### toBeNull

Is it something or not? actual !== null

```
Expect(null).toBeNull();
Expect("something").not.toBeNull();
```

#### toBeTruthy

Is it trueish? actual == trueish

```
Expect(1).toBeTruthy();
Expect(0).not.toBeTruthy();
```

#### toContain

Does the string contain another string or an array contain an item?

```
Expect("something").toContain("thing");
Expect([1, 2, 3]).toContain(2);
Expect("another thing").not.toContain("something");
Expect([1, 2, 3]).not.toContain(4);
```

#### toBeGreaterThan

Which one's larger (hopefully the actual)

```
Expect(2).toBeGreaterThan(1);
Expect(1).not.toBeGreaterThan(2);
```

#### toBeLessThan

For when you don't want things to get out of control, check it's not too big

```
Expect(1).toBeLessThan(2);
Expect(2).not.toBeLessThan(1);
```

#### toThrow

Check whether a function throws an error

```
Expect(() => throw new Error()).toThrow();
Expect(() => {}).not.toThrow();
```

#### toThrowError

Check whether a function throws a specific error with a given message

```
Expect(() => throw new TypeError("things went wrong")).toThrowError(TypeError, "things went wrong");
Expect(() => throw new Error("some error we don't care about")).not.toThrow(TypeError, "super nasty error");
```

### Spying

When we want to check functions are called, this is simple first we need to turn it into a spy...

```
import { SpyOn } from "alsatian";

let some = {
  function: () => {}
};

SpyOn(some, "function");

```

... then check it's been called ...

```
Expect(some.function).toHaveBeenCalled();
```

... or check it's been called with certain arguments ...

```
Expect(some.function).toHaveBeenCalled(this, "and that");
```

... you can stub it out ...

```
SpyOn(some, "function").andStub();
```

... you can make it call something else ...

```
SpyOn(some, "function").andCall(() => console.log("I are called"));
```

... or make it return whatever you desire

```
SpyOn(some, "function").andReturn(42);
```