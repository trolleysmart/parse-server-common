import EventEmitter from 'events';

class NewSearchResultReceivedEvent extends EventEmitter {
  static newSearchResultReceived() {
    return 'newSearchResultReceived';
  }

  constructor() {
    super();

    this.raise = this.raise.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  raise(searchResult) {
    this.emit(NewSearchResultReceivedEvent.newSearchResultReceived(), searchResult);
  }

  subscribe(callback) {
    this.on(NewSearchResultReceivedEvent.newSearchResultReceived(), callback);
  }
}

export {
  NewSearchResultReceivedEvent,
};

export default NewSearchResultReceivedEvent;
