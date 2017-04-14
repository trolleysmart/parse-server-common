import uuid from 'uuid/v4';
import CrawlSession from './crawl-session';
import CrawlResult from './crawl-result';

function createCrawlSession() {
  return CrawlSession.spawn('sessionKey', new Date());
}

describe('constructor', () => {
  test('should set class name', () => {
    const crawlSession = createCrawlSession();

    expect(CrawlResult.spawn(crawlSession, {})
        .className)
      .toBe('CrawlResult');
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const crawlSession = createCrawlSession();
    const object = CrawlResult.spawn(crawlSession, {});

    expect(new CrawlSession(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const crawlSession = createCrawlSession();
    const object = CrawlResult.spawn(crawlSession, {});

    expect(new CrawlSession(object)
        .getId())
      .toBe(object.id);
  });

  test('getCrawlSession should return provided crawl session', () => {
    const crawlSession = createCrawlSession();
    const object = CrawlResult.spawn(crawlSession, {});

    expect(new CrawlResult(object)
        .getCrawlSession()
        .getId())
      .toBe(crawlSession.getId());
  });

  test('getResult should return provided result', () => {
    const expectedValue = {
      val: uuid(),
    };
    const crawlSession = createCrawlSession();
    const object = CrawlResult.spawn(crawlSession, expectedValue);

    expect(new CrawlResult(object)
        .getResult())
      .toBe(expectedValue);
  });
});
