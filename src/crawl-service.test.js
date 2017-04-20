import Immutable from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import {
  CrawlService,
} from './crawl-service';
import {
  StoreCrawlerConfiguration,
} from './schema/store-crawler-configuration';

describe('getStoreCrawlerConfig', () => {
  test('should return config for the provided key', (done) => {
    const key = uuid();
    const expectedValue = Immutable.fromJS({
      val: uuid(),
    });

    return StoreCrawlerConfiguration.spawn(key, expectedValue)
      .save()
      .then(() => {
        CrawlService.getStoreCrawlerConfig(key)
          .then((result) => {
            expect(result)
              .toEqual(expectedValue);
            done();
          });
      });
  });

  test('should reject if key does not exists', () => {
    const key = uuid();

    return CrawlService.getStoreCrawlerConfig(key)
      .catch((error) => {
        expect(error)
          .toBe(`No store crawler config found for key: ${key}`);
      });
  });
});

describe('createNewCrawlSession', () => {
  test('should return the Id of the created session', () =>
    CrawlService.createNewCrawlSession(uuid(), new Date())
    .then(result => expect(result)
      .toBeDefined()),
  );

  test('should return the created session info', (done) => {
    const expectedSessionKey = uuid();
    const expectedStartDateTime = new Date();

    return CrawlService.createNewCrawlSession(expectedSessionKey, expectedStartDateTime)
      .then((id) => {
        CrawlService.getExistingCrawlSessionInfo(id)
          .then((sessionInfo) => {
            expect(sessionInfo.get('sessionKey'))
              .toEqual(expectedSessionKey);
            expect(sessionInfo.get('startDateTime'))
              .toEqual(expectedStartDateTime);
            expect(sessionInfo.get('endDateTime')
                .isNone())
              .toBeTruthy();
            expect(sessionInfo.get('additionalInfo')
                .isNone())
              .toBeTruthy();

            done();
          });
      });
  });
});
