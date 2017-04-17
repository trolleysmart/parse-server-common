import uuid from 'uuid/v4';
import '../bootstrap';
import CrawlService from './crawl-service';
import StoreCrawlerConfiguration from './schema/store-crawler-configuration';

describe('getStoreCrawlerConfig', () => {
  test('should return config for the provided key', (done) => {
    const key = uuid();
    const expectedValue = {
      val: uuid(),
    };

    return StoreCrawlerConfiguration.spawn(key, expectedValue)
      .save()
      .then(() => {
        CrawlService.getStoreCrawlerConfig(key)
          .then(result => {
            expect(result)
              .toEqual(expectedValue);
            done();
          });
      })
  });

  test('should reject if key does not exists', () => {
    const key = uuid();

    return CrawlService.getStoreCrawlerConfig(key)
      .catch((error) => {
        expect(error)
          .toBe(`No store crawler config found for key: ${key}`);
      });
  });

  test('should reject if multiple key exist', (done) => {
    const key = uuid();

    return Promise.all(
        [StoreCrawlerConfiguration.spawn(key, {})
          .save(),
          StoreCrawlerConfiguration.spawn(key, {})
          .save()
        ])
      .then(() => {
        CrawlService.getStoreCrawlerConfig(key)
          .catch((error) => {
            expect(error)
              .toBe(`Multiple store crawler config found for key: ${key}`);
            done();
          });
      });
  });
});

describe('createNewCrawlSession', () => {
  test('should return the Id of the created session', () =>
    CrawlService.createNewCrawlSession(uuid(), new Date())
    .then(result => expect(result)
      .toBeDefined())
  );

  test('should return the Id of the created session', (done) => {
    const expectedSessionKey = uuid();
    const expectedStartDateTime = new Date();

    return CrawlService.createNewCrawlSession(expectedSessionKey, expectedStartDateTime)
      .then(id => {
        CrawlService.getExistingCrawlSessionInfo(id)
          .then(({
            sessionKey,
            startDateTime,
            endDateTime,
          }) => {
            expect(sessionKey)
              .toEqual(expectedSessionKey);
            expect(startDateTime)
              .toEqual(expectedStartDateTime);
            expect(endDateTime.isNone())
              .toBeTruthy();

            done();
          })
      });
  });
});