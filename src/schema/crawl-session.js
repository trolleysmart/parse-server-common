import {
  Maybe,
} from 'monet';
import BaseObject from './base-object';

class CrawlSession extends BaseObject {
  constructor(object) {
    super(object, 'CrawlSession');

    this.getSessionKey = this.getSessionKey.bind(this);
    this.getStartDateTime = this.getStartDateTime.bind(this);
    this.getEndDateTime = this.getEndDateTime.bind(this);
  }

  static spawn(sessionKey, startDateTime, endDateTime) {
    const object = new CrawlSession();

    object.set('sessionKey', sessionKey);
    object.set('startDateTime', startDateTime);
    object.set('endDateTime', endDateTime);

    return object;
  }

  getSessionKey() {
    return this.getObject()
      .get('sessionKey');
  }

  getStartDateTime() {
    return this.getObject()
      .get('startDateTime');
  }

  getEndDateTime() {
    return Maybe.fromNull(this.getObject()
      .get('endDateTime'));
  }

  setEndDateTime(endDateTime) {
    return this.getObject()
      .set('endDateTime', endDateTime);
  }
}

export default CrawlSession;
