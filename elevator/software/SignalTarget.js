import EventTarget from './EventTarget.js';

// since we don't like to write long method names and
// we also don't like to write new CustomEvent(type, {detail})
// every single time, we can lightly wrap the EventTarget
// making more easy to deal with.
export default class SignalTarget extends EventTarget {

  // a well known `obj.on(type, callback)` shortcut
  on(...args) {
    this.addEventListener(...args);
    return this;
  }

  // a way to handle events that does not need bindings all over
  handleEvent(event) { this[`on${event.type}`](event); }

  // and a mechanical "signal" to notify any hardware
  // that is listening to the current instance.
  signal(signal, detail) {
    this.dispatchEvent(new CustomEvent(signal, {detail}));
  }
}
