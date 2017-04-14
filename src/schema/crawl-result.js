import BaseObject from './base-object';
import CrawlSession from './crawl-session';

class CrawlResult extends BaseObject {
  constructor(object) {
    super(object, 'CrawlResult');

    this.getCrawlSession = this.getCrawlSession.bind(this);
    this.getResult = this.getResult.bind(this);
  }

  static spawn(
    crawlSession,
    result,
  ) {
    const object = new CrawlResult();

    object.set('crawlSession', CrawlSession.createWithoutData(crawlSession.getId()));
    object.set('result', result);

    return object;
  }

  getCrawlSession() {
    return new CrawlSession(this.getObject()
      .get('crawlSession'));
  }

  getResult() {
    return this.getObject()
      .get('result');
  }
}

export default CrawlResult;
