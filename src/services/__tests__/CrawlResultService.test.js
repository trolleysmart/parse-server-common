// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { CrawlSessionService, CrawlResultService } from '../';
import { createCrawlSessionInfo } from '../../schema/__tests__/CrawlSession.test';
import { createCrawlResultInfo } from '../../schema/__tests__/CrawlResult.test';

function expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId) {
  expect(crawlResultInfo.get('id')).toBe(crawlResultId);
  expect(crawlResultInfo.get('crawlSession').getId()).toBe(crawlSessionId);
  expect(crawlResultInfo.get('resultSet')).toEqual(expectedCrawlResultInfo.get('resultSet'));
}

export function createCriteria() {
  return Map({
    fields: List.of('crawlSession', 'resultSet'),
    conditions: Map({
      crawlSessionId: uuid(),
    }),
  });
}

export function createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId) {
  return Map({
    fields: List.of('crawlSession', 'resultSet'),
    conditions: Map({
      crawlSessionId,
    }),
  });
}

describe('create', () => {
  test('should return the created crawl result Id', async () => {
    const id = await CrawlSessionService.create(createCrawlSessionInfo());
    const result = await CrawlResultService.create(createCrawlResultInfo(id));

    expect(result).toBeDefined();
  });

  test('should create the crawl result', async () => {
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    const expectedCrawlResultInfo = createCrawlResultInfo(crawlSessionId);
    const crawlResultId = await CrawlResultService.create(expectedCrawlResultInfo);
    const crawlResultInfo = await CrawlResultService.read(crawlResultId);

    expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);
  });
});

describe('read', () => {
  test('should reject if the provided crawl result Id does not exist', async () => {
    const crawlResultId = uuid();

    try {
      await CrawlResultService.read(crawlResultId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl result found with Id: ${crawlResultId}`);
    }
  });

  test('should read the existing crawl result', async () => {
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    const expectedCrawlResultInfo = createCrawlResultInfo(crawlSessionId);
    const crawlResultId = await CrawlResultService.create(expectedCrawlResultInfo);
    const crawlResultInfo = await CrawlResultService.read(crawlResultId);

    expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);
  });
});

describe('update', () => {
  test('should reject if the provided crawl result Id does not exist', async () => {
    const crawlResultId = uuid();

    try {
      await CrawlResultService.update(createCrawlResultInfo().set('id', crawlResultId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl result found with Id: ${crawlResultId}`);
    }
  });

  test('should return the Id of the updated crawl result', async () => {
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    const crawlResultId = await CrawlResultService.create(createCrawlResultInfo(crawlSessionId));
    const id = await CrawlResultService.update(createCrawlResultInfo().set('id', crawlResultId));

    expect(id).toBe(crawlResultId);
  });

  test('should update the existing crawl result', async () => {
    const expectedCrawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    const expectedCrawlResultInfo = createCrawlResultInfo(expectedCrawlSessionId);
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    const id = await CrawlResultService.create(createCrawlResultInfo(crawlSessionId));
    const crawlResultId = await CrawlResultService.update(expectedCrawlResultInfo.set('id', id));
    const crawlResultInfo = await CrawlResultService.read(crawlResultId);

    expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, expectedCrawlSessionId);
  });
});

describe('delete', () => {
  test('should reject if the provided crawl result Id does not exist', async () => {
    const crawlResultId = uuid();

    try {
      await CrawlResultService.delete(crawlResultId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl result found with Id: ${crawlResultId}`);
    }
  });

  test('should delete the existing crawl result', async () => {
    const id = await CrawlSessionService.create(createCrawlSessionInfo());
    const crawlResultId = await CrawlResultService.create(createCrawlResultInfo(id));
    await CrawlResultService.delete(crawlResultId);

    try {
      await CrawlResultService.read(crawlResultId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl result found with Id: ${crawlResultId}`);
    }
  });
});

describe('search', () => {
  test('should return no crawl result if provided criteria matches no crawl result', async () => {
    const crawlResultInfos = await CrawlResultService.search(createCriteria());

    expect(crawlResultInfos.count()).toBe(0);
  });

  test('should return the crawl results matches the criteria', async () => {
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    const expectedCrawlResultInfo = createCrawlResultInfo(crawlSessionId);
    const crawlResultId = await CrawlResultService.create(expectedCrawlResultInfo);
    const crawlResultInfos = await CrawlResultService.search(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));

    expect(crawlResultInfos.count()).toBe(1);

    const crawlResultInfo = crawlResultInfos.first();

    expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);
  });
});

describe('searchAll', () => {
  test('should return no crawl result if provided criteria matches no crawl result', async () => {
    const result = CrawlResultService.searchAll(createCriteria());

    try {
      let crawlResults = List();

      result.event.subscribe(crawlResult => (crawlResults = crawlResults.push(crawlResult)));

      await result.promise;
      expect(crawlResults.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the crawl results matches the criteria', async () => {
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    const expectedCrawlResultInfo = createCrawlResultInfo(crawlSessionId);
    const ids = await Promise.all([CrawlResultService.create(expectedCrawlResultInfo), CrawlResultService.create(expectedCrawlResultInfo)]);
    const crawlResultIds = List.of(ids[0], ids[1]);
    let crawlResults = List();
    const result = CrawlResultService.searchAll(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));

    try {
      result.event.subscribe((crawlResult) => {
        crawlResults = crawlResults.push(crawlResult);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(crawlResults.count()).toBe(crawlResultIds.count());
  });
});

describe('exists', () => {
  test('should return false if no crawl result match provided criteria', async () => {
    const response = await CrawlResultService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any crawl resuult match provided criteria', async () => {
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    await CrawlResultService.create(createCrawlResultInfo(crawlSessionId));
    const response = await CrawlResultService.exists(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no crawl result match provided criteria', async () => {
    const response = await CrawlResultService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of crawl result match provided criteria', async () => {
    const crawlSessionId = await CrawlSessionService.create(createCrawlSessionInfo());
    const expectedCrawlResultInfo = createCrawlResultInfo(crawlSessionId);
    await CrawlResultService.create(expectedCrawlResultInfo);
    await CrawlResultService.create(expectedCrawlResultInfo);

    const response = await CrawlResultService.count(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));

    expect(response).toBe(2);
  });
});
