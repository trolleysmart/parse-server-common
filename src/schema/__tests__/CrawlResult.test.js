// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { CrawlResult } from '../';
import createCrawlSessions from '../../services/__tests__/CrawlSessionService.test';

export const createCrawlResultInfo = async () => {
  const crawlSession = (await createCrawlSessions(1)).first();
  const crawlResult = Map({
    resultSet: Map({
      price: uuid(),
    }),
    crawlSessionId: crawlSession.get('id'),
  });

  return { crawlResult, crawlSession };
};

export const createCrawlResult = async object => CrawlResult.spawn(object || (await createCrawlResultInfo()).crawlResult);

export const expectCrawlResult = (object, expectedObject, { crawlResultId, expectedCrawlSession } = {}) => {
  expect(object.get('resultSet')).toEqual(expectedObject.get('resultSet'));
  expect(object.get('crawlSessionId')).toBe(expectedObject.get('crawlSessionId'));

  if (crawlResultId) {
    expect(object.get('id')).toBe(crawlResultId);
  }

  if (expectedCrawlSession) {
    expect(object.get('crawlSession')).toEqual(expectedCrawlSession);
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createCrawlResult()).className).toBe('CrawlResult');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { crawlResult } = await createCrawlResultInfo();
    const object = await createCrawlResult(crawlResult);
    const info = object.getInfo();

    expectCrawlResult(info, crawlResult);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createCrawlResult();

    expect(new CrawlResult(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createCrawlResult();

    expect(new CrawlResult(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createCrawlResult();
    const { crawlResult: updatedCrawlResult } = await createCrawlResultInfo();

    object.updateInfo(updatedCrawlResult);

    const info = object.getInfo();

    expectCrawlResult(info, updatedCrawlResult);
  });

  test('getInfo should return provided info', async () => {
    const { crawlResult } = await createCrawlResultInfo();
    const object = await createCrawlResult(crawlResult);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectCrawlResult(info, crawlResult);
  });
});
