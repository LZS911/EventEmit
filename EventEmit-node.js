const { EventEmitter } = require("node:events");

const event = new EventEmitter();

const testAddListener = (fn) => {
  event.addListener("event1", fn);
  return event.emit("event1");
};

const testRemoveListeners = (fn) => {
  event.addListener("event2", fn);
  event.emit("event2");
  event.removeListener("event2", fn);
  event.emit("event2");
  return event.emit("event2");
};

const testOn = (fn) => {
  event.addListener("event3", fn);

  event.emit("event3");
};

const testOnce = (fn) => {
  event.once("event4", fn);

  event.emit("event4");
  event.emit("event4");
  event.emit("event4");
};

const testSetMaxListeners = (fn) => {
  event.setMaxListeners(1);
  event.on("event6", fn);
  event.on("event6", fn);
  event.emit("event6");
  event.setMaxListeners(10);
};

const testNewEvent = (fn) => {
  event.on("newListener", fn);
  event.on("event5", fn);
  event.emit("event5");
  event.emit("event5");
};

const testRemoveEvent = (fn) => {
  event.on("removeListener", fn);
};

const testPrototype = () => {
  const count1 = event.listenerCount("event4");
  const count2 = event.listenerCount("event5");
  const count3 = event.listenerCount("event6");
  return {
    count1,
    count2,
    count3,
  };
};

module.exports = {
  testAddListener,
  testRemoveListeners,
  testOn,
  testOnce,
  testNewEvent,
  testSetMaxListeners,
  testRemoveEvent,
  testPrototype,
};
