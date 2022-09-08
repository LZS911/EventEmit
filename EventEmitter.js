class EventEmitter {
  #maxListeners = 10;
  constructor() {
    this.listeners = Object.create(null);
    this.#maxListeners = 10;
  }

  addListener(eventName, cb) {
    if (
      !this.listeners[eventName || !Array.isArray(this.listeners[eventName])]
    ) {
      this.listeners[eventName] = [cb];
      if (eventName !== "newListener") {
        this.emit("newListener");
      }
      return this;
    }
    if (this.listeners[eventName].length >= this.#maxListeners) {
      console.error(
        "MaxListenersExceededWarning: Possible EventEmitter memory leak detected. %d event6 listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit",
        this.#maxListeners
      );
    }

    this.listeners[eventName].push(cb);

    return this;
  }

  removeListener(eventName, listener) {
    const index = (this.listeners[eventName] || []).indexOf(listener);
    if (index !== -1) {
      this.listeners[eventName].splice(index, 1);
      if (eventName !== "removeListener") {
        this.emit("removeListener");
      }
    }
    return this;
  }

  emit(eventName, ...args) {
    const isExistEvent =
      this.listeners[eventName] && this.listeners[eventName].length > 0;

    if (isExistEvent) {
      this.listeners[eventName].forEach((cb) => {
        cb.apply(null, args);
      });
    }
    return isExistEvent;
  }

  once(eventName, listener) {
    const fn = (...args) => {
      listener.apply(null, args);
      this.removeListener(eventName, fn);
    };
    this.on(eventName, fn);
    return this;
  }

  removeAllListeners(eventNames = []) {
    if (eventNames.length === 0) {
      this.listeners = Object.create(null);
    } else {
      eventNames.forEach((v) => {
        this.listeners[v] = [];
      });
    }
    return this;
  }

  listenerCount(eventName) {
    return this.listeners[eventName]?.length ?? 0;
  }

  setMaxListeners(maxListeners) {
    this.#maxListeners = maxListeners;
  }
  getMaxListeners() {
    return this.#maxListeners;
  }
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

module.exports = EventEmitter;
