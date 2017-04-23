import Immutable, {
  Map,
} from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';
import {
  Maybe,
} from 'monet';

class CrawlSession extends BaseObject {
  static spawn(info) {
    const object = new CrawlSession();

    CrawlSession.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal(object, info) {
    object.set('sessionKey', info.get('sessionKey'));
    object.set('startDateTime', info.get('startDateTime')
      .orSome(undefined));
    object.set('endDateTime', info.get('endDateTime')
      .orSome(undefined));

    const additionalInfo = info.get('additionalInfo');

    if (additionalInfo && additionalInfo.isSome()) {
      object.set('additionalInfo', additionalInfo.some()
        .toJS());
    } else {
      object.set('additionalInfo', undefined);
    }
  }

  constructor(object) {
    super(object, 'CrawlSession');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  updateInfo(info) {
    const object = this.getObject();

    CrawlSession.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    return Map({
      id: this.getId(),
      sessionKey: this.getObject()
        .get('sessionKey'),
      startDateTime: Maybe.fromNull(this.getObject()
        .get('startDateTime')),
      endDateTime: Maybe.fromNull(this.getObject()
        .get('endDateTime')),
      additionalInfo: Maybe.fromNull(Immutable.fromJS(this.getObject()
        .get('additionalInfo'))),
    });
  }
}

export {
  CrawlSession,
};

export default CrawlSession;
