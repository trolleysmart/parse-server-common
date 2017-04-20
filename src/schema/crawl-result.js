import Immutable from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';
import {
  CrawlSession,
} from './crawl-session';

class CrawlResult extends BaseObject {
  constructor(object) {
    super(object, 'CrawlResult');

    this.getCrawlSession = this.getCrawlSession.bind(this);
    this.getResultSet = this.getResultSet.bind(this);
  }

  static spawn(
    crawlSessionId,
    resultSet,
  ) {
    const object = new CrawlResult();

    object.set('crawlSession', CrawlSession.createWithoutData(crawlSessionId));
    object.set('resultSet', resultSet);

    return object;
  }

  getCrawlSession() {
    return new CrawlSession(this.getObject()
      .get('crawlSession'));
  }

  getResultSet() {
    return Immutable.fromJS(this.getObject()
      .get('resultSet'));
  }
}

export {
  CrawlResult,
};

export default CrawlResult;
