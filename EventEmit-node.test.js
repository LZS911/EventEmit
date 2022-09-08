const {
  testAddListener,
  testOn,
  testRemoveListeners,
  testOnce,
  testNewEvent,
  testSetMaxListeners,
  testRemoveEvent,
  testPrototype,
} = require("./EventEmit-node");

describe("test node:EventEmitter", () => {
  const fn = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test("test addListener and removeAllListeners", () => {
    const res = testAddListener(fn);
    expect(res).toBe(true);
    expect(fn).toBeCalledTimes(1);
  });

  test("test removeListeners", () => {
    const res = testRemoveListeners(fn);
    expect(res).toBe(false);
    expect(fn).toBeCalledTimes(1);
  });

  test("test on", () => {
    testOn(fn);
    expect(fn).toBeCalledTimes(1);
  });

  test("test once", () => {
    testOnce(fn);
    expect(fn).toBeCalledTimes(1);
  });

  test("test setMaxListeners", () => {
    testSetMaxListeners(fn);
    expect(fn).toBeCalledTimes(2);
  });

  test("test newListener", () => {
    testNewEvent(fn);
    expect(fn).toBeCalledTimes(3);
  });

  test("test removeListener", () => {
    testRemoveEvent(fn);
    expect(fn).toBeCalledTimes(1);
  });

  test("test testPrototype", () => {
    const { count1, count2, count3 } = testPrototype();
    expect(count1).toBe(0);
    expect(count2).toBe(1);
    expect(count3).toBe(2);
  });
});
