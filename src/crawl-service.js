import {
  Map,
} from 'immutable';
import Common from 'micro-business-parse-server-common';
import CrawlSession from './schema/crawl-session';
import StoreCrawlerConfiguration from './schema/store-crawler-configuration';

class CrawlService {
  static getStoreCrawlerConfig(key) {
    return new Promise((resolve, reject) => {
      const query = Common.ParseWrapperService.createQuery(StoreCrawlerConfiguration);

      query.equalTo('key', key);

      return query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No store crawler config found for key: ${key}`);
          } else if (results.length !== 1) {
            reject(`Multiple store crawler config found for key: ${key}`);
          } else {
            resolve(new StoreCrawlerConfiguration(results[0])
              .getConfig());
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static createNewCrawlSession(sessionKey, startDateTime) {
    return new Promise((resolve, reject) => {
      CrawlSession.spawn(sessionKey, startDateTime)
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static updateCrawlSession(id, endDateTime, additionalInfo) {
    return new Promise((resolve, reject) => {
      CrawlService.getExistingCrawlSession(id)
        .then((crawlSession) => {
          crawlSession.setEndDateTime(endDateTime);
          crawlSession.setAdditionalInfo(additionalInfo);

          return crawlSession.saveObject();
        })
        .then(crawSession => resolve(new CrawlSession(crawSession)
          .getId()))
        .catch(error => reject(error));
    });
  }

  static getExistingCrawlSessionInfo(id) {
    return new Promise((resolve, reject) => {
      CrawlService.getExistingCrawlSession(id)
        .then((crawlSession) => {
          resolve(CrawlService.mapCrawlSessionToResponseFormat(crawlSession));
        })
        .catch(error => reject(error));
    });
  }

  static getMostRecentCrawlSessionInfo(key) {
    return new Promise((resolve, reject) => {
      CrawlService.getMostRecentCrawlSession(key)
        .then((crawlSession) => {
          resolve(CrawlService.mapCrawlSessionToResponseFormat(crawlSession));
        })
        .catch(error => reject(error));
    });
  }

  static getExistingCrawlSession(id) {
    return new Promise((resolve, reject) => {
      const query = Common.ParseWrapperService.createQuery(CrawlSession);

      query.equalTo('objectId', id);

      return query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No session found for Id: ${id}`);
          } else {
            resolve(new CrawlSession(results[0]));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static getMostRecentCrawlSession(key) {
    return new Promise((resolve, reject) => {
      const query = Common.ParseWrapperService.createQuery(CrawlSession);

      query.equalTo('key', key);
      query.descending('startDateTime');
      query.limit(1);

      return query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No session found for session key: ${key}`);
          } else {
            resolve(new CrawlSession(results[0]));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static mapCrawlSessionToResponseFormat(crawlSession) {
    return Map({
      id: crawlSession.getId(),
      sessionKey: crawlSession.getSessionKey(),
      startDateTime: crawlSession.getStartDateTime(),
      endDateTime: crawlSession.getEndDateTime(),
      additionalInfo: crawlSession.getAdditionalInfo(),
    });
  }
}

export default CrawlService;
