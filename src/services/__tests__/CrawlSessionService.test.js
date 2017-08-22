// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { CrawlSessionService } from '../';
import { createCrawlSessionInfo, expectCrawlSession } from '../../schema/__tests__/CrawlSession.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('key', 'startDateTime', 'endDateTime', 'additionalInfo'),
  });

const createCriteria = crawlSession =>
  Map({
    conditions: Map({
      key: crawlSession ? crawlSession.get('key') : uuid(),
      startDateTime: crawlSession ? crawlSession.get('startDateTime') : new Date(),
      endDateTime: crawlSession ? crawlSession.get('endDateTime') : new Date(),
      additionalInfo: crawlSession ? crawlSession.get('additionalInfo') : Map({ info1: uuid(), info2: uuid() }),
    }),
  }).merge(createCriteriaWthoutConditions());

const createCrawlSessions = async (count, useSameInfo = false) => {
  let crawlSession;

  if (useSameInfo) {
    const { crawlSession: tempCrawlSession } = await createCrawlSessionInfo();

    crawlSession = tempCrawlSession;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalCrawlSession;

          if (useSameInfo) {
            finalCrawlSession = crawlSession;
          } else {
            const { crawlSession: tempCrawlSession } = await createCrawlSessionInfo();

            finalCrawlSession = tempCrawlSession;
          }

          return CrawlSessionService.read(await CrawlSessionService.create(finalCrawlSession), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createCrawlSessions;

describe('create', () => {
  test('should return the created crawl session Id', async () => {
    const crawlSessionId = await CrawlSessionService.create((await createCrawlSessionInfo()).crawlSession);

    expect(crawlSessionId).toBeDefined();
  });

  test('should create the crawl session', async () => {
    const { crawlSession } = await createCrawlSessionInfo();
    const crawlSessionId = await CrawlSessionService.create(crawlSession);
    const fetchedCrawlSession = await CrawlSessionService.read(crawlSessionId, createCriteriaWthoutConditions());

    expect(fetchedCrawlSession).toBeDefined();
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
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const crawlSessionId = await CrawlSessionService.create(expectedCrawlSession);
    const crawlSession = await CrawlSessionService.read(crawlSessionId, createCriteriaWthoutConditions());

    expectCrawlSession(crawlSession, expectedCrawlSession);
  });
});

describe('update', () => {
  test('should reject if the provided crawl session Id does not exist', async () => {
    const crawlSessionId = uuid();

    try {
      const crawlSession = await CrawlSessionService.read(
        await CrawlSessionService.create((await createCrawlSessionInfo()).crawlSession),
        createCriteriaWthoutConditions(),
      );

      await CrawlSessionService.update(crawlSession.set('id', crawlSessionId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });

  test('should return the Id of the updated crawl session', async () => {
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const crawlSessionId = await CrawlSessionService.create((await createCrawlSessionInfo()).crawlSession);
    const id = await CrawlSessionService.update(expectedCrawlSession.set('id', crawlSessionId));

    expect(id).toBe(crawlSessionId);
  });

  test('should update the existing crawl session', async () => {
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const crawlSessionId = await CrawlSessionService.create((await createCrawlSessionInfo()).crawlSession);

    await CrawlSessionService.update(expectedCrawlSession.set('id', crawlSessionId));

    const crawlSession = await CrawlSessionService.read(crawlSessionId, createCriteriaWthoutConditions());

    expectCrawlSession(crawlSession, expectedCrawlSession);
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
    const crawlSessionId = await CrawlSessionService.create((await createCrawlSessionInfo()).crawlSession);
    await CrawlSessionService.delete(crawlSessionId);

    try {
      await CrawlSessionService.delete(crawlSessionId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });
});

describe('search', () => {
  test('should return no crawl session if provided criteria matches no crawl session', async () => {
    const crawlSessions = await CrawlSessionService.search(createCriteria());

    expect(crawlSessions.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => CrawlSessionService.create(expectedCrawlSession)).toArray()),
    );
    const crawlSessions = await CrawlSessionService.search(createCriteria(expectedCrawlSession));

    expect(crawlSessions.count).toBe(results.count);
    crawlSessions.forEach((crawlSession) => {
      expect(results.find(_ => _.localeCompare(crawlSession.get('id')) === 0)).toBeDefined();
      expectCrawlSession(crawlSession, expectedCrawlSession);
    });
  });
});

describe('searchAll', () => {
  test('should return no crawl session if provided criteria matches no crawl session', async () => {
    let crawlSessions = List();
    const result = CrawlSessionService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        crawlSessions = crawlSessions.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(crawlSessions.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => CrawlSessionService.create(expectedCrawlSession)).toArray()),
    );

    let crawlSessions = List();
    const result = CrawlSessionService.searchAll(createCriteria(expectedCrawlSession));

    try {
      result.event.subscribe((info) => {
        crawlSessions = crawlSessions.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(crawlSessions.count).toBe(results.count);
    crawlSessions.forEach((crawlSession) => {
      expect(results.find(_ => _.localeCompare(crawlSession.get('id')) === 0)).toBeDefined();
      expectCrawlSession(crawlSession, expectedCrawlSession);
    });
  });
});

describe('exists', () => {
  test('should return false if no crawl session match provided criteria', async () => {
    expect(await CrawlSessionService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any crawl session match provided criteria', async () => {
    const crawlSessions = await createCrawlSessions(chance.integer({ min: 1, max: 10 }), true);

    expect(await CrawlSessionService.exists(createCriteria(crawlSessions.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no crawl session match provided criteria', async () => {
    expect(await CrawlSessionService.count(createCriteria())).toBe(0);
  });

  test('should return the count of crawl session match provided criteria', async () => {
    const crawlSessions = await createCrawlSessions(chance.integer({ min: 1, max: 10 }), true);

    expect(await CrawlSessionService.count(createCriteria(crawlSessions.first()))).toBe(crawlSessions.count());
  });
});
