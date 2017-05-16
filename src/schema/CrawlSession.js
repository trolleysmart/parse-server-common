// @flow

import Immutable, { Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';

export default class CrawlSession extends BaseObject {
  static spawn = info => {
    const object = new CrawlSession();

    CrawlSession.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('sessionKey', info.get('sessionKey'));
    object.set('startDateTime', info.get('startDateTime'));
    object.set('endDateTime', info.get('endDateTime'));

    const additionalInfo = info.get('additionalInfo');

    object.set('additionalInfo', additionalInfo ? additionalInfo.toJS() : undefined);
  };

  constructor(object) {
    super(object, 'CrawlSession');
  }

  updateInfo = info => {
    const object = this.getObject();

    CrawlSession.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () =>
    Map({
      id: this.getId(),
      sessionKey: this.getObject().get('sessionKey'),
      startDateTime: this.getObject().get('startDateTime'),
      endDateTime: this.getObject().get('endDateTime'),
      additionalInfo: Immutable.fromJS(this.getObject().get('additionalInfo')),
    });
}
