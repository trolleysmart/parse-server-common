// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { CrawlResultService } from '../';
import { createCrawlResultInfo, expectCrawlResult } from '../../schema/__tests__/CrawlResult.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('crawlSession', 'resultSet'),
    includeCrawlSession: true,
  });

const createCriteria = crawlResult =>
  Map({
    conditions: Map({
      crawlSessionId: crawlResult ? crawlResult.get('crawlSessionId') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createCrawlResults = async (count, useSameInfo = false) => {
  let crawlResult;

  if (useSameInfo) {
    const { crawlResult: tempCrawlResult } = await createCrawlResultInfo();

    crawlResult = tempCrawlResult;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalCrawlResult;

          if (useSameInfo) {
            finalCrawlResult = crawlResult;
          } else {
            const { crawlResult: tempCrawlResult } = await createCrawlResultInfo();

            finalCrawlResult = tempCrawlResult;
          }

          return CrawlResultService.read(await CrawlResultService.create(finalCrawlResult), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createCrawlResults;

describe('create', () => {
  test('should return the created crawl result Id', async () => {
    const crawlResultId = await CrawlResultService.create((await createCrawlResultInfo()).crawlResult);

    expect(crawlResultId).toBeDefined();
  });

  test('should create the crawl result', async () => {
    const { crawlResult } = await createCrawlResultInfo();
    const crawlResultId = await CrawlResultService.create(crawlResult);
    const fetchedCrawlResult = await CrawlResultService.read(crawlResultId, createCriteriaWthoutConditions());

    expect(fetchedCrawlResult).toBeDefined();
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
    const { crawlResult: expectedCrawlResult, crawlSession: expectedCrawlSession } = await createCrawlResultInfo();
    const crawlResultId = await CrawlResultService.create(expectedCrawlResult);
    const crawlResult = await CrawlResultService.read(crawlResultId, createCriteriaWthoutConditions());

    expectCrawlResult(crawlResult, expectedCrawlResult, { crawlResultId, expectedCrawlSession });
  });
});

describe('update', () => {
  test('should reject if the provided crawl result Id does not exist', async () => {
    const crawlResultId = uuid();

    try {
      const crawlResult = await CrawlResultService.read(
        await CrawlResultService.create((await createCrawlResultInfo()).crawlResult),
        createCriteriaWthoutConditions(),
      );

      await CrawlResultService.update(crawlResult.set('id', crawlResultId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl result found with Id: ${crawlResultId}`);
    }
  });

  test('should return the Id of the updated crawl result', async () => {
    const { crawlResult: expectedCrawlResult } = await createCrawlResultInfo();
    const crawlResultId = await CrawlResultService.create((await createCrawlResultInfo()).crawlResult);
    const id = await CrawlResultService.update(expectedCrawlResult.set('id', crawlResultId));

    expect(id).toBe(crawlResultId);
  });

  test('should update the existing crawl result', async () => {
    const { crawlResult: expectedCrawlResult, crawlSession: expectedCrawlSession } = await createCrawlResultInfo();
    const crawlResultId = await CrawlResultService.create((await createCrawlResultInfo()).crawlResult);

    await CrawlResultService.update(expectedCrawlResult.set('id', crawlResultId));

    const crawlResult = await CrawlResultService.read(crawlResultId, createCriteriaWthoutConditions());

    expectCrawlResult(crawlResult, expectedCrawlResult, { crawlResultId, expectedCrawlSession });
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
    const crawlResultId = await CrawlResultService.create((await createCrawlResultInfo()).crawlResult);
    await CrawlResultService.delete(crawlResultId);

    try {
      await CrawlResultService.delete(crawlResultId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl result found with Id: ${crawlResultId}`);
    }
  });
});

describe('search', () => {
  test('should return no crawl result if provided criteria matches no crawl result', async () => {
    const crawlResults = await CrawlResultService.search(createCriteria());

    expect(crawlResults.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { crawlResult: expectedCrawlResult, crawlSession: expectedCrawlSession } = await createCrawlResultInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => CrawlResultService.create(expectedCrawlResult)).toArray()),
    );
    const crawlResults = await CrawlResultService.search(createCriteria(expectedCrawlResult));

    expect(crawlResults.count).toBe(results.count);
    crawlResults.forEach((crawlResult) => {
      expect(results.find(_ => _.localeCompare(crawlResult.get('id')) === 0)).toBeDefined();
      expectCrawlResult(crawlResult, expectedCrawlResult, { crawlResultId: crawlResult.get('id'), expectedCrawlSession });
    });
  });
});

describe('searchAll', () => {
  test('should return no crawl result if provided criteria matches no crawl result', async () => {
    let crawlResults = List();
    const result = CrawlResultService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        crawlResults = crawlResults.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(crawlResults.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { crawlResult: expectedCrawlResult, crawlSession: expectedCrawlSession } = await createCrawlResultInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => CrawlResultService.create(expectedCrawlResult)).toArray()),
    );

    let crawlResults = List();
    const result = CrawlResultService.searchAll(createCriteria(expectedCrawlResult));

    try {
      result.event.subscribe((info) => {
        crawlResults = crawlResults.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(crawlResults.count).toBe(results.count);
    crawlResults.forEach((crawlResult) => {
      expect(results.find(_ => _.localeCompare(crawlResult.get('id')) === 0)).toBeDefined();
      expectCrawlResult(crawlResult, expectedCrawlResult, { crawlResultId: crawlResult.get('id'), expectedCrawlSession });
    });
  });
});

describe('exists', () => {
  test('should return false if no crawl result match provided criteria', async () => {
    expect(await CrawlResultService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any crawl result match provided criteria', async () => {
    const crawlResults = await createCrawlResults(chance.integer({ min: 1, max: 10 }), true);

    expect(await CrawlResultService.exists(createCriteria(crawlResults.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no crawl result match provided criteria', async () => {
    expect(await CrawlResultService.count(createCriteria())).toBe(0);
  });

  test('should return the count of crawl result match provided criteria', async () => {
    const crawlResults = await createCrawlResults(chance.integer({ min: 1, max: 10 }), true);

    expect(await CrawlResultService.count(createCriteria(crawlResults.first()))).toBe(crawlResults.count());
  });
});
