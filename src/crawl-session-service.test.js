import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import {
  CrawlSessionService,
} from './crawl-session-service';
import {
  createCrawlSessionInfo,
} from './schema/crawl-session.test';

function expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId) {
  expect(crawlSessionInfo.get('id'))
    .toBe(crawlSessionId);
  expect(crawlSessionInfo.get('sessionKey'))
    .toBe(expectedCrawlSessionInfo.get('sessionKey'));
  expect(crawlSessionInfo.get('startDateTime')
      .some())
    .toEqual(expectedCrawlSessionInfo.get('startDateTime').some());
  expect(crawlSessionInfo.get('endDateTime')
      .some())
    .toEqual(expectedCrawlSessionInfo.get('endDateTime').some());
  expect(crawlSessionInfo.get('additionalInfo')
      .some())
    .toEqual(expectedCrawlSessionInfo.get('additionalInfo').some());
}

export function createCriteria() {
  return Map({
    sessionKey: uuid(),
  });
}

export function createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo) {
  return Map({
    sessionKey: crawlSessionInfo.get('sessionKey'),
  });
}

describe('create', () => {
  test('should return the created crawl session Id', (done) => {
    CrawlSessionService.create(createCrawlSessionInfo())
      .then((result) => {
        expect(result)
          .toBeDefined();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should create the crawl session', (done) => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    let crawlSessionId;

    CrawlSessionService.create(expectedCrawlSessionInfo)
      .then((id) => {
        crawlSessionId = id;

        return CrawlSessionService.read(crawlSessionId);
      })
      .then((crawlSessionInfo) => {
        expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('read', () => {
  test('should reject if the provided crawl session Id does not exist', (done) => {
    const crawlSessionId = uuid();

    CrawlSessionService.read(crawlSessionId)
      .catch((error) => {
        expect(error)
          .toBe(`No crawl session found with Id: ${crawlSessionId}`);
        done();
      });
  });

  test('should read the existing crawl session', (done) => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    let crawlSessionId;

    CrawlSessionService.create(expectedCrawlSessionInfo)
      .then((id) => {
        crawlSessionId = id;

        return CrawlSessionService.read(crawlSessionId);
      })
      .then((crawlSessionInfo) => {
        expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('update', () => {
  test('should reject if the provided crawl session Id does not exist', (done) => {
    const crawlSessionId = uuid();

    CrawlSessionService.update(crawlSessionId, createCrawlSessionInfo())
      .catch((error) => {
        expect(error)
          .toBe(`No crawl session found with Id: ${crawlSessionId}`);
        done();
      });
  });

  test('should return the Id of the updated crawl session', (done) => {
    let crawlSessionId;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then((id) => {
        crawlSessionId = id;

        return CrawlSessionService.update(crawlSessionId, createCrawlSessionInfo());
      })
      .then((id) => {
        expect(id)
          .toBe(crawlSessionId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should update the existing crawl session', (done) => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    let crawlSessionId;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then(id => CrawlSessionService.update(id, expectedCrawlSessionInfo))
      .then((id) => {
        crawlSessionId = id;

        return CrawlSessionService.read(crawlSessionId);
      })
      .then((crawlSessionInfo) => {
        expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('delete', () => {
  test('should reject if the provided crawl session Id does not exist', (done) => {
    const crawlSessionId = uuid();

    CrawlSessionService.delete(crawlSessionId)
      .catch((error) => {
        expect(error)
          .toBe(`No crawl session found with Id: ${crawlSessionId}`);
        done();
      });
  });

  test('should delete the existing crawl session', (done) => {
    let crawlSessionId;

    CrawlSessionService.create(createCrawlSessionInfo())
      .then((id) => {
        crawlSessionId = id;
        return CrawlSessionService.delete(crawlSessionId);
      })
      .then(() => CrawlSessionService.read(crawlSessionId))
      .catch((error) => {
        expect(error)
          .toBe(`No crawl session found with Id: ${crawlSessionId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no crawl session if provided criteria matches no crawl session', (done) => {
    CrawlSessionService.search(createCriteria())
      .then((crawlSessionInfos) => {
        expect(crawlSessionInfos.size)
          .toBe(0);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the crawl sessions matches the criteria', (done) => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    let crawlSessionId;

    CrawlSessionService.create(expectedCrawlSessionInfo)
      .then((id) => {
        crawlSessionId = id;

        return CrawlSessionService.search(createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo));
      })
      .then((crawlSessionInfos) => {
        expect(crawlSessionInfos.size)
          .toBe(1);

        const crawlSessionInfo = crawlSessionInfos.first();
        expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the the latest crawl sessions matches the criteria when latest is set', (done) => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();
    let crawlSessionId;

    CrawlSessionService.create(expectedCrawlSessionInfo)
    .then(() => CrawlSessionService.create(expectedCrawlSessionInfo))
      .then((id) => {
        crawlSessionId = id;

        const criteria = createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo);

        return CrawlSessionService.search(criteria.set('latest', true));
      })
      .then((crawlSessionInfos) => {
        expect(crawlSessionInfos.size)
          .toBe(1);

        const crawlSessionInfo = crawlSessionInfos.first();
        expectCrawlSessionInfo(crawlSessionInfo, expectedCrawlSessionInfo, crawlSessionId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('searchAll', () => {
  test('should return no crawl session if provided criteria matches no crawl session', (done) => {
    const result = CrawlSessionService.searchAll(createCriteria());
    let crawlSessions = List();

    result.event.subscribe((crawlSession) => {
      crawlSessions = crawlSessions.push(crawlSession);
    });
    result.promise.then(() => {
      expect(crawlSessions.size)
          .toBe(0);
      done();
    })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the crawl sessions matches the criteria', (done) => {
    const expectedCrawlSessionInfo = createCrawlSessionInfo();

    Promise.all([CrawlSessionService.create(expectedCrawlSessionInfo), CrawlSessionService.create(expectedCrawlSessionInfo)])
      .then((ids) => {
        const crawlSessionIds = List.of(ids[0], ids[1]);
        const result = CrawlSessionService.searchAll(createCriteriaUsingProvidedCrawlSessionInfo(expectedCrawlSessionInfo));
        let crawlSessions = List();

        result.event.subscribe((crawlSession) => {
          crawlSessions = crawlSessions.push(crawlSession);
        });
        result.promise.then(() => {
          expect(crawlSessions.size)
              .toBe(crawlSessionIds.size);
          done();
        })
          .catch((error) => {
            fail(error);
            done();
          });
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('exists', () => {
  test('should return false if no crawl session match provided criteria', (done) => {
    CrawlSessionService.exists(createCriteria())
      .then((response) => {
        expect(response)
          .toBeFalsy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return true if any crawl session match provided criteria', (done) => {
    const crawlSessionInfo = createCrawlSessionInfo();

    CrawlSessionService.create(crawlSessionInfo)
      .then(() => CrawlSessionService.exists(createCriteriaUsingProvidedCrawlSessionInfo(crawlSessionInfo)))
      .then((response) => {
        expect(response)
          .toBeTruthy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});
