import uuid from 'uuid/v4';
import CrawlSession from './crawl-session';
import CrawlResult from './crawl-result';

describe('constructor', () => {
  test('should set class name', () => {
    const crawlSession = CrawlSession.spawn();

    expect(CrawlResult.spawn(crawlSession, {})
        .className)
      .toBe('CrawlResult');
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const crawlSession = CrawlSession.spawn();
    const object = CrawlResult.spawn(crawlSession, {});

    expect(new CrawlSession(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const crawlSession = CrawlSession.spawn();
    const object = CrawlResult.spawn(crawlSession, {});

    expect(new CrawlSession(object)
        .getId())
      .toBe(object.id);
  });

  test('getCrawlSession should return provided crawl session', () => {
    const crawlSession = CrawlSession.spawn();
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
    const crawlSession = CrawlSession.spawn();
    const object = CrawlResult.spawn(crawlSession, expectedValue);

    expect(new CrawlResult(object)
        .getResult())
      .toBe(expectedValue);
  });
});
