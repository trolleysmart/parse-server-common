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
    object.set('resultSet', info.get('resultSet').toJS());

    if (info.has('crawlSessionId')) {
      const crawlSessionId = info.get('crawlSessionId');

      if (crawlSessionId) {
        object.set('crawlSession', CrawlSession.createWithoutData(crawlSessionId));
      }
    } else if (info.has('crawlSession')) {
      const crawlSession = info.get('crawlSession');

      if (crawlSession) {
        object.set('crawlSession', crawlSession);
      }
    }
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
      resultSet: Immutable.fromJS(this.getObject().get('resultSet')),
      crawlSession: crawlSession.getInfo(),
      crawlSessionId: crawlSession.getId(),
    });
  };
}
