// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { CrawlSessionService } from '../';
import { createCrawlSessionInfo, expectCrawlSession } from '../../schema/__tests__/CrawlSession.test';

const chance = new Chance();
const crawlSessionService = new CrawlSessionService();

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

          return crawlSessionService.read(await crawlSessionService.create(finalCrawlSession), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createCrawlSessions;

describe('create', () => {
  test('should return the created crawl session Id', async () => {
    const crawlSessionId = await crawlSessionService.create((await createCrawlSessionInfo()).crawlSession);

    expect(crawlSessionId).toBeDefined();
  });

  test('should create the crawl session', async () => {
    const { crawlSession } = await createCrawlSessionInfo();
    const crawlSessionId = await crawlSessionService.create(crawlSession);
    const fetchedCrawlSession = await crawlSessionService.read(crawlSessionId, createCriteriaWthoutConditions());

    expect(fetchedCrawlSession).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided crawl session Id does not exist', async () => {
    const crawlSessionId = uuid();

    try {
      await crawlSessionService.read(crawlSessionId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });

  test('should read the existing crawl session', async () => {
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const crawlSessionId = await crawlSessionService.create(expectedCrawlSession);
    const crawlSession = await crawlSessionService.read(crawlSessionId, createCriteriaWthoutConditions());

    expectCrawlSession(crawlSession, expectedCrawlSession);
  });
});

describe('update', () => {
  test('should reject if the provided crawl session Id does not exist', async () => {
    const crawlSessionId = uuid();

    try {
      const crawlSession = await crawlSessionService.read(
        await crawlSessionService.create((await createCrawlSessionInfo()).crawlSession),
        createCriteriaWthoutConditions(),
      );

      await crawlSessionService.update(crawlSession.set('id', crawlSessionId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });

  test('should return the Id of the updated crawl session', async () => {
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const crawlSessionId = await crawlSessionService.create((await createCrawlSessionInfo()).crawlSession);
    const id = await crawlSessionService.update(expectedCrawlSession.set('id', crawlSessionId));

    expect(id).toBe(crawlSessionId);
  });

  test('should update the existing crawl session', async () => {
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const crawlSessionId = await crawlSessionService.create((await createCrawlSessionInfo()).crawlSession);

    await crawlSessionService.update(expectedCrawlSession.set('id', crawlSessionId));

    const crawlSession = await crawlSessionService.read(crawlSessionId, createCriteriaWthoutConditions());

    expectCrawlSession(crawlSession, expectedCrawlSession);
  });
});

describe('delete', () => {
  test('should reject if the provided crawl session Id does not exist', async () => {
    const crawlSessionId = uuid();

    try {
      await crawlSessionService.delete(crawlSessionId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });

  test('should delete the existing crawl session', async () => {
    const crawlSessionId = await crawlSessionService.create((await createCrawlSessionInfo()).crawlSession);
    await crawlSessionService.delete(crawlSessionId);

    try {
      await crawlSessionService.delete(crawlSessionId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No crawl session found with Id: ${crawlSessionId}`);
    }
  });
});

describe('search', () => {
  test('should return no crawl session if provided criteria matches no crawl session', async () => {
    const crawlSessions = await crawlSessionService.search(createCriteria());

    expect(crawlSessions.count()).toBe(0);
  });

  test('should return the crawl session matches the criteria', async () => {
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => crawlSessionService.create(expectedCrawlSession)).toArray()),
    );
    const crawlSessions = await crawlSessionService.search(createCriteria(expectedCrawlSession));

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
    const result = crawlSessionService.searchAll(createCriteria());

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

  test('should return the crawl session matches the criteria', async () => {
    const { crawlSession: expectedCrawlSession } = await createCrawlSessionInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => crawlSessionService.create(expectedCrawlSession)).toArray()),
    );

    let crawlSessions = List();
    const result = crawlSessionService.searchAll(createCriteria(expectedCrawlSession));

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
    expect(await crawlSessionService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any crawl session match provided criteria', async () => {
    const crawlSessions = await createCrawlSessions(chance.integer({ min: 1, max: 10 }), true);

    expect(await crawlSessionService.exists(createCriteria(crawlSessions.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no crawl session match provided criteria', async () => {
    expect(await crawlSessionService.count(createCriteria())).toBe(0);
  });

  test('should return the count of crawl session match provided criteria', async () => {
    const crawlSessions = await createCrawlSessions(chance.integer({ min: 1, max: 10 }), true);

    expect(await crawlSessionService.count(createCriteria(crawlSessions.first()))).toBe(crawlSessions.count());
  });
});
