import uuid from 'uuid/v4';
import {
  CrawlSession,
} from './crawl-session';

describe('constructor', () => {
  test('should set class name', () => {
    expect(CrawlSession.spawn('sessionKey', new Date(), {})
        .className)
      .toBe('CrawlSession');
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = CrawlSession.spawn('sessionKey', new Date(), {});

    expect(new CrawlSession(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = CrawlSession.spawn('sessionKey', new Date(), {});

    expect(new CrawlSession(object)
        .getId())
      .toBe(object.id);
  });

  test('getSessionKey should return provided session key', () => {
    const expectedValue = uuid();
    const object = CrawlSession.spawn(expectedValue, new Date(), {});

    expect(new CrawlSession(object)
        .getSessionKey())
      .toBe(expectedValue);
  });

  test('getStartDateTime should return provided start date time', () => {
    const expectedValue = new Date();
    const object = CrawlSession.spawn('sessionKey', expectedValue, {});

    expect(new CrawlSession(object)
        .getStartDateTime())
      .toBe(expectedValue);
  });

  test('getEndDateTime should return none if end date time is not set yet', () => {
    const object = CrawlSession.spawn('sessionKey', new Date(), {});

    expect(new CrawlSession(object)
        .getEndDateTime()
        .isNone())
      .toBeTruthy();
  });

  test('setEndDateTime should set end date time', () => {
    const expectedValue = new Date();
    const object = CrawlSession.spawn('sessionKey', new Date(), {});

    object.setEndDateTime(expectedValue);

    expect(new CrawlSession(object)
        .getEndDateTime()
        .some())
      .toBe(expectedValue);
  });

  test('getAdditionalInfo should return none if additional info is not provided yet', () => {
    const object = CrawlSession.spawn('sessionKey', new Date());

    expect(new CrawlSession(object)
        .getAdditionalInfo()
        .isNone())
      .toBeTruthy();
  });

  test('getAdditionalInfo should return additional info if additional info is not provided through spawn', () => {
    const expectedValue = {
      val: uuid(),
    };
    const object = CrawlSession.spawn('sessionKey', new Date(), expectedValue);

    expect(new CrawlSession(object)
        .getAdditionalInfo()
        .some())
      .toBe(expectedValue);
  });

  test('setAdditionalInfo should set end date time', () => {
    const expectedValue = {
      val: uuid(),
    };
    const object = CrawlSession.spawn('sessionKey', new Date());

    object.setAdditionalInfo(expectedValue);

    expect(new CrawlSession(object)
        .getAdditionalInfo()
        .some())
      .toBe(expectedValue);
  });
});
