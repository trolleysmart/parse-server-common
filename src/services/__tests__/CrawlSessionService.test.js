// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { CrawlSessionService } from '../';
import { createCrawlSessionInfo } from '../../schema/__tests__/CrawlSession.test';

function expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId) {
  expect(crawlSessionInfo.get('id')).toBe(crawlSessionId);
  expect(crawlSessionInfo.get('sessionKey')).toBe(expectedCrawlSessionInfo.get('sessionKey'));
  expect(crawlSessionInfo.get('startDateTime')).toEqual(expectedCrawlSessionInfo.get('startDateTime'));
  expect(crawlSessionInfo.get('endDateTime')).toEqual(expectedCrawlSessionInfo.get('endDateTime'));
  expect(crawlSessionInfo.get('additionalInfo')).toEqual(expectedCrawlSessionInfo.get('additionalInfo'));
}

export function createCriteria() {
  return Map({
    fields: List.of('sessionKey', 'startDateTime', 'endDateTime', 'additionalInfo'),
    conditions: Map({
      sessionKey: uuid(),
    }),
  });
}

export function createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo) {
  return Map({
    fields: List.of('sessionKey', 'startDateTime', 'endDateTime', 'additionalInfo'),
    conditions: Map({
      sessionKey: crawlSessionInfo.get('sessionKey'),
    }),
  });
}

describe('create', () => {
  test('should return the created crawl session Id', async () => {
    const result = await CrawlSessionService.create(createCrawlSessionInfo());

    expect(result).toBeDefined();
  });

  test('should create the crawl session', async () => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    const crawlSessionId = await CrawlSessionService.create(expectedCrawlSessionInfo);
    const crawlSessionInfo = await CrawlSessionService.read(crawlSessionId);

    expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
  });
});

describe('read', () => {
  test('should reject if the provided crawl session Id does not exist', async () => {
    const crawlSessionId = uuid();

    try {
      await CrawlSessionService.read(crawlSessionId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });

  test('should read the existing crawl session', async () => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    const crawlSessionId = await CrawlSessionService.create(expectedCrawlSessionInfo);
    const crawlSessionInfo = await CrawlSessionService.read(crawlSessionId);

    expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
  });
});

describe('update', () => {
  test('should reject if the provided crawl session Id does not exist', async () => {
    const crawlSessionId = uuid();

    try {
      await CrawlSessionService.update(createCrawlSessionInfo().set('id', crawlSessionId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });

  test('should return the Id of the updated crawl session', async () => {
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    const id = await CrawlSessionService.update(createCrawlSessionInfo().set('id', crawlSessionId));

    expect(id).toBe(crawlSessionId);
  });

  test('should update the existing crawl session', async () => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    const id = await CrawlSessionService.create(createCrawlSessionInfo());
    const crawlSessionId = await CrawlSessionService.update(expectedCrawlSessionInfo.set('id', id));
    const crawlSessionInfo = await CrawlSessionService.read(crawlSessionId);

    expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
  });
});

describe('delete', () => {
  test('should reject if the provided crawl session Id does not exist', async () => {
    const crawlSessionId = uuid();

    try {
      await CrawlSessionService.delete(crawlSessionId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });

  test('should delete the existing crawl session', async () => {
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    await CrawlSessionService.delete(crawlSessionId);

    try {
      await CrawlSessionService.read(crawlSessionId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });
});

describe('search', () => {
  test('should return no crawl session if provided criteria matches no crawl session', async () => {
    const crawlSessionInfos = await CrawlSessionService.search(createCriteria());

    expect(crawlSessionInfos.count()).toBe(0);
  });

  test('should return the crawl sessions matches the criteria', async () => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    const crawlSessionId = await CrawlSessionService.create(expectedCrawlSessionInfo);
    const crawlSessionInfos = await CrawlSessionService.search(createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo));

    expect(crawlSessionInfos.count()).toBe(1);

    const crawlSessionInfo = crawlSessionInfos.first();
    expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
  });
});

describe('searchAll', () => {
  test('should return no crawl session if provided criteria matches no crawl session', async () => {
    const result = CrawlSessionService.searchAll(createCriteria());

    try {
      let crawlSessions = List();

      result.event.subscribe((info) => {
        crawlSessions = crawlSessions.push(info);
      });

      await result.promise;
      expect(crawlSessions.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the crawl sessions matches the criteria', async () => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    const crawlSessionId1 = await CrawlSessionService.create(expectedCrawlSessionInfo);
    const crawlSessionId2 = await CrawlSessionService.create(expectedCrawlSessionInfo);

    const result = CrawlSessionService.searchAll(createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo));
    try {
      let crawlSessions = List();

      result.event.subscribe((info) => {
        crawlSessions = crawlSessions.push(info);
      });

      await result.promise;
      expect(crawlSessions.count()).toBe(2);
      expect(crawlSessions.find(_ => _.get('id').localeCompare(crawlSessionId1) === 0)).toBeTruthy();
      expect(crawlSessions.find(_ => _.get('id').localeCompare(crawlSessionId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no crawl session match provided criteria', async () => {
    const response = await CrawlSessionService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any crawl session match provided criteria', async () => {
    const crawlSessionInfo = createCrawlSessionInfo();

    await CrawlSessionService.create(crawlSessionInfo);
    const response = CrawlSessionService.exists(createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no crawl session match provided criteria', async () => {
    const response = await CrawlSessionService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of crawl session match provided criteria', async () => {
    const crawlSessionInfo = createCrawlSessionInfo();

    await CrawlSessionService.create(crawlSessionInfo);
    await CrawlSessionService.create(crawlSessionInfo);

    const response = await CrawlSessionService.count(createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo));

    expect(response).toBe(2);
  });
});
