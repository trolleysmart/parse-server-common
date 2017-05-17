// @flow

import Immutable, { Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import CrawlSession from './CrawlSession';

export default class CrawlResult extends BaseObject {
  static spawn = (info) => {
    const object = new CrawlResult();

    CrawlResult.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('crawlSession', CrawlSession.createWithoutData(info.get('crawlSessionId')));
    object.set('resultSet', info.get('resultSet').toJS());
  };

  constructor(object) {
    super(object, 'CrawlResult');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    CrawlResult.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const crawlSession = new CrawlSession(this.getObject().get('crawlSession'));

    return Map({
      id: this.getId(),
      crawlSession,
      crawlSessionId: crawlSession.getId(),
      resultSet: Immutable.fromJS(this.getObject().get('resultSet')),
    });
  };
}
