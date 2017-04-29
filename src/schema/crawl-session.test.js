import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import {
  CrawlSession,
} from './crawl-session';

export function createCrawlSessionInfo() {
  return Map({
    sessionKey: uuid(),
    startDateTime: new Date(),
    endDateTime: new Date(),
    additionalInfo: Map({
      val: uuid(),
    }),
  });
}

export function createCrawlSession(crawlSessionInfo) {
  return CrawlSession.spawn(crawlSessionInfo || createCrawlSessionInfo());
}

function expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo) {
  expect(crawlSessionInfo.get('sessionKey'))
    .toBe(expectedCrawlSessionInfo.get('sessionKey'));
  expect(crawlSessionInfo.get('startDateTime'))
    .toBe(expectedCrawlSessionInfo.get('startDateTime'));
  expect(crawlSessionInfo.get('endDateTime'))
    .toBe(expectedCrawlSessionInfo.get('endDateTime'));
  expect(crawlSessionInfo.get('additionalInfo'))
    .toEqual(expectedCrawlSessionInfo.get('additionalInfo'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createCrawlSession()
        .className)
      .toBe('CrawlSession');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const crawlSessionInfo = createCrawlSessionInfo();
    const object = createCrawlSession(crawlSessionInfo);
    const info = object.getInfo();

    expectCrawlSessionInfo(info, crawlSessionInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = createCrawlSession();

    expect(new CrawlSession(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createCrawlSession();

    expect(new CrawlSession(object)
        .getId())
      .toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createCrawlSession();
    const updatedCrawlSessionInfo = createCrawlSessionInfo();

    object.updateInfo(updatedCrawlSessionInfo);

    const info = object.getInfo();

    expectCrawlSessionInfo(info, updatedCrawlSessionInfo);
  });

  test('getInfo should return provided info', () => {
    const crawlSessionInfo = createCrawlSessionInfo();
    const object = createCrawlSession(crawlSessionInfo);
    const info = object.getInfo();

    expect(info.get('id'))
      .toBe(object.getId());
    expectCrawlSessionInfo(info, crawlSessionInfo);
  });
});
