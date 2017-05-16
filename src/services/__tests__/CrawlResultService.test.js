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
  test('should return the created crawl result Id', done => {
    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => CrawlResultService.create(createCrawlResultInfo(id)))
      .then(result => {
        expect(result).toBeDefined();
        done();
      })
      .catch(error => {
        fail(error);
        done();
      });
  });

  test('should create the crawl result', done => {
    let crawlSessionId;
    let crawlResultId;
    let expectedCrawlResultInfo;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => {
        crawlSessionId = id;
        expectedCrawlResultInfo = createCrawlResultInfo(id);

        return CrawlResultService.create(expectedCrawlResultInfo);
      })
      .then(id => {
        crawlResultId = id;

        return CrawlResultService.read(crawlResultId);
      })
      .then(crawlResultInfo => {
        expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);
        done();
      })
      .catch(error => {
        fail(error);
        done();
      });
  });
});

describe('read', () => {
  test('should reject if the provided crawl result Id does not exist', done => {
    const crawlResultId = uuid();

    CrawlResultService.read(crawlResultId).catch(error => {
      expect(error).toBe(`No crawl result found with Id: ${crawlResultId}`);
      done();
    });
  });

  test('should read the existing crawl result', done => {
    let crawlSessionId;
    let crawlResultId;
    let expectedCrawlResultInfo;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => {
        crawlSessionId = id;
        expectedCrawlResultInfo = createCrawlResultInfo(id);

        return CrawlResultService.create(expectedCrawlResultInfo);
      })
      .then(id => {
        crawlResultId = id;

        return CrawlResultService.read(crawlResultId);
      })
      .then(crawlResultInfo => {
        expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);
        done();
      })
      .catch(error => {
        fail(error);
        done();
      });
  });
});

describe('update', () => {
  test('should reject if the provided crawl result Id does not exist', done => {
    const crawlResultId = uuid();

    CrawlResultService.update(createCrawlResultInfo().set('id', crawlResultId)).catch(error => {
      expect(error).toBe(`No crawl result found with Id: ${crawlResultId}`);
      done();
    });
  });

  test('should return the Id of the updated crawl result', done => {
    let crawlResultId;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => CrawlResultService.create(createCrawlResultInfo(id)))
      .then(id => {
        crawlResultId = id;

        return CrawlResultService.update(createCrawlResultInfo().set('id', crawlResultId));
      })
      .then(id => {
        expect(id).toBe(crawlResultId);
        done();
      })
      .catch(error => {
        fail(error);
        done();
      });
  });

  test('should update the existing crawl result', done => {
    let expectedCrawlResultInfo;
    let expectedCrawlSessionId;
    let crawlResultId;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => {
        expectedCrawlSessionId = id;
        expectedCrawlResultInfo = createCrawlResultInfo(expectedCrawlSessionId);

        return CrawlSessionService.create(createCrawlSessionInfo());
      })
      .then(id => CrawlResultService.create(createCrawlResultInfo(id)))
      .then(id => CrawlResultService.update(expectedCrawlResultInfo.set('id', id)))
      .then(id => {
        crawlResultId = id;

        return CrawlResultService.read(crawlResultId);
      })
      .then(crawlResultInfo => {
        expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, expectedCrawlSessionId);
        done();
      })
      .catch(error => {
        fail(error);
        done();
      });
  });
});

describe('delete', () => {
  test('should reject if the provided crawl result Id does not exist', done => {
    const crawlResultId = uuid();

    CrawlResultService.delete(crawlResultId).catch(error => {
      expect(error).toBe(`No crawl result found with Id: ${crawlResultId}`);
      done();
    });
  });

  test('should delete the existing crawl result', done => {
    let crawlResultId;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => CrawlResultService.create(createCrawlResultInfo(id)))
      .then(id => {
        crawlResultId = id;
        return CrawlResultService.delete(crawlResultId);
      })
      .then(() => CrawlResultService.read(crawlResultId))
      .catch(error => {
        expect(error).toBe(`No crawl result found with Id: ${crawlResultId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no crawl result if provided criteria matches no crawl result', done => {
    CrawlResultService.search(createCriteria())
      .then(crawlResultInfos => {
        expect(crawlResultInfos.size).toBe(0);
        done();
      })
      .catch(error => {
        fail(error);
        done();
      });
  });

  test('should return the crawl results matches the criteria', done => {
    let expectedCrawlResultInfo;
    let crawlResultId;
    let crawlSessionId;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => {
        crawlSessionId = id;
        expectedCrawlResultInfo = createCrawlResultInfo(id);

        return CrawlResultService.create(expectedCrawlResultInfo);
      })
      .then(id => {
        crawlResultId = id;

        return CrawlResultService.search(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));
      })
      .then(crawlResultInfos => {
        expect(crawlResultInfos.size).toBe(1);

        const crawlResultInfo = crawlResultInfos.first();
        expectCrawlResultInfo(crawlResultInfo, expectedCrawlResultInfo, crawlResultId, crawlSessionId);
        done();
      })
      .catch(error => {
        fail(error);
        done();
      });
  });
});

describe('searchAll', () => {
  test('should return no crawl result if provided criteria matches no crawl result', done => {
    const result = CrawlResultService.searchAll(createCriteria());
    let crawlResults = List();

    result.event.subscribe(crawlResult => {
      crawlResults = crawlResults.push(crawlResult);
    });
    result.promise
      .then(() => {
        result.event.unsubscribeAll();
        expect(crawlResults.size).toBe(0);
        done();
      })
      .catch(error => {
        result.event.unsubscribeAll();
        fail(error);
        done();
      });
  });

  test('should return the crawl results matches the criteria', done => {
    let crawlSessionId;
    let expectedCrawlResultInfo;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => {
        crawlSessionId = id;
        expectedCrawlResultInfo = createCrawlResultInfo(crawlSessionId);

        return Promise.all([CrawlResultService.create(expectedCrawlResultInfo), CrawlResultService.create(expectedCrawlResultInfo)]);
      })
      .then(ids => {
        const crawlResultIds = List.of(ids[0], ids[1]);
        const result = CrawlResultService.searchAll(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId));
        let crawlResults = List();

        result.event.subscribe(crawlResult => {
          crawlResults = crawlResults.push(crawlResult);
        });
        result.promise
          .then(() => {
            result.event.unsubscribeAll();
            expect(crawlResults.size).toBe(crawlResultIds.size);
            done();
          })
          .catch(error => {
            result.event.unsubscribeAll();
            fail(error);
            done();
          });
      })
      .catch(error => {
        fail(error);
        done();
      });
  });
});

describe('exists', () => {
  test('should return false if no crawl result match provided criteria', done => {
    CrawlResultService.exists(createCriteria())
      .then(response => {
        expect(response).toBeFalsy();
        done();
      })
      .catch(error => {
        fail(error);
        done();
      });
  });

  test('should return true if any crawl resuult match provided criteria', done => {
    let crawlSessionId;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => {
        crawlSessionId = id;

        return CrawlResultService.create(createCrawlResultInfo(id));
      })
      .then(() => CrawlResultService.exists(createCriteriaUsingProvidedCrawlResultInfo(crawlSessionId)))
      .then(response => {
        expect(response).toBeTruthy();
        done();
      })
      .catch(error => {
        fail(error);
        done();
      });
  });
});
