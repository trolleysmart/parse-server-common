import uuid from 'uuid/v4';
import CrawlSession from './crawl-session';

describe('constructor', () => {
  test('should set class name', () => {
    expect(CrawlSession.spawn('sessionKey', new Date(), new Date())
        .className)
      .toBe('CrawlSession');
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = CrawlSession.spawn('sessionKey', new Date(), new Date());

    expect(new CrawlSession(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = CrawlSession.spawn('sessionKey', new Date(), new Date());

    expect(new CrawlSession(object)
        .getId())
      .toBe(object.id);
  });

  test('getSessionKey should return provided session key', () => {
    const expectedValue = uuid();
    const object = CrawlSession.spawn(expectedValue, new Date(), new Date());

    expect(new CrawlSession(object)
        .getSessionKey())
      .toBe(expectedValue);
  });

  test('getStartDateTime should return provided start date time', () => {
    const expectedValue = new Date();
    const object = CrawlSession.spawn('sessionKey', expectedValue, new Date());

    expect(new CrawlSession(object)
        .getStartDateTime())
      .toBe(expectedValue);
  });

  test('getEndDateTime should return none if no end date time provided', () => {
    const object = CrawlSession.spawn('sessionKey', new Date());

    expect(new CrawlSession(object)
        .getEndDateTime()
        .isNone())
      .toBeTruthy();
  });

  test('getEndDateTime should return provided end date time', () => {
    const expectedValue = new Date();
    const object = CrawlSession.spawn('sessionKey', new Date(), expectedValue);

    expect(new CrawlSession(object)
        .getEndDateTime()
        .some())
      .toBe(expectedValue);
  });

  test('setEndDateTime should set end date time', () => {
    const expectedValue = new Date();
    const object = CrawlSession.spawn('sessionKey', new Date());

    object.setEndDateTime(expectedValue);

    expect(new CrawlSession(object)
        .getEndDateTime()
        .some())
      .toBe(expectedValue);
  });
});
