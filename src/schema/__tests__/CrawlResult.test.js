// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { CrawlResult } from '../';
import { createCrawlSession } from './CrawlSession.test';

export function createCrawlResultInfo(crawlSessionId) {
  return Map({
    crawlSessionId: crawlSessionId || createCrawlSession().getId(),
    resultSet: Map({
      price: uuid(),
    }),
  });
}

export function createCrawlResult(crawlSessionPriceInfo) {
  return CrawlResult.spawn(crawlSessionPriceInfo || createCrawlResultInfo());
}

function expectCrawlResultInfo(crawlSessionPriceInfo, expectedCrawlResultInfo) {
  expect(crawlSessionPriceInfo.get('crawlSession').getId()).toBe(expectedCrawlResultInfo.get('crawlSessionId'));
  expect(crawlSessionPriceInfo.get('crawlSessionId')).toBe(expectedCrawlResultInfo.get('crawlSessionId'));
  expect(crawlSessionPriceInfo.get('resultSet')).toEqual(expectedCrawlResultInfo.get('resultSet'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createCrawlResult().className).toBe('CrawlResult');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const crawlSessionPriceInfo = createCrawlResultInfo();
    const object = createCrawlResult(crawlSessionPriceInfo);
    const info = object.getInfo();

    expectCrawlResultInfo(info, crawlSessionPriceInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = createCrawlResult();

    expect(new CrawlResult(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createCrawlResult();

    expect(new CrawlResult(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createCrawlResult();
    const updatedCrawlResultInfo = createCrawlResultInfo();

    object.updateInfo(updatedCrawlResultInfo);

    const info = object.getInfo();

    expectCrawlResultInfo(info, updatedCrawlResultInfo);
  });

  test('getInfo should return provided info', () => {
    const crawlSessionPriceInfo = createCrawlResultInfo();
    const object = createCrawlResult(crawlSessionPriceInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectCrawlResultInfo(info, crawlSessionPriceInfo);
  });
});
