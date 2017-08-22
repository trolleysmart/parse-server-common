// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { CrawlSession } from '../';

export const createCrawlSessionInfo = async () => {
  const crawlSession = Map({
    key: uuid(),
    startDateTime: new Date(),
    endDateTime: new Date(),
    additionalInfo: Map({ info1: uuid(), info2: uuid() }),
  });

  return { crawlSession };
};

export const createCrawlSession = async object => CrawlSession.spawn(object || (await createCrawlSessionInfo()).crawlSession);

export const expectCrawlSession = (object, expectedObject) => {
  expect(object.get('key')).toBe(expectedObject.get('key'));
  expect(object.get('startDateTime')).toEqual(expectedObject.get('startDateTime'));
  expect(object.get('endDateTime')).toEqual(expectedObject.get('endDateTime'));
  expect(object.get('additionalInfo')).toEqual(expectedObject.get('additionalInfo'));
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createCrawlSession()).className).toBe('CrawlSession');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { crawlSession } = await createCrawlSessionInfo();
    const object = await createCrawlSession(crawlSession);
    const info = object.getInfo();

    expectCrawlSession(info, crawlSession);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createCrawlSession();

    expect(new CrawlSession(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createCrawlSession();

    expect(new CrawlSession(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createCrawlSession();
    const { crawlSession: updatedCrawlSession } = await createCrawlSessionInfo();

    object.updateInfo(updatedCrawlSession);

    const info = object.getInfo();

    expectCrawlSession(info, updatedCrawlSession);
  });

  test('getInfo should return provided info', async () => {
    const { crawlSession } = await createCrawlSessionInfo();
    const object = await createCrawlSession(crawlSession);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectCrawlSession(info, crawlSession);
  });
});
