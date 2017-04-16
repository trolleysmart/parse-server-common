import {
  Maybe,
} from 'monet';
import Common from 'micro-business-parse-server-common';

class CrawlSession extends Common.BaseObject {
  constructor(object) {
    super(object, 'CrawlSession');

    this.getSessionKey = this.getSessionKey.bind(this);
    this.getStartDateTime = this.getStartDateTime.bind(this);
    this.getEndDateTime = this.getEndDateTime.bind(this);
  }

  static spawn(sessionKey, startDateTime, additionalInfo) {
    const object = new CrawlSession();

    object.set('sessionKey', sessionKey);
    object.set('startDateTime', startDateTime);
    object.set('additionalInfo', additionalInfo);

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
    this.getObject()
      .set('endDateTime', endDateTime);
  }

  getAdditionalInfo() {
    return Maybe.fromNull(this.getObject()
      .get('additionalInfo'));
  }

  setAdditionalInfo(additionalInfo) {
    this.getObject()
      .set('additionalInfo', additionalInfo);
  }
}

export default CrawlSession;
