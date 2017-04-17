import Immutable, {
  Map,
} from 'immutable';
import Common from 'micro-business-parse-server-common';
import CrawlResult from './schema/crawl-result';
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

  static getMostRecentCrawlSessionInfo(sessionKey) {
    return new Promise((resolve, reject) => {
      CrawlService.getMostRecentCrawlSession(sessionKey)
        .then((crawlSession) => {
          resolve(CrawlService.mapCrawlSessionToResponseFormat(crawlSession));
        })
        .catch(error => reject(error));
    });
  }

  static addResultSet(sessionId, resultSet) {
    return new Promise((resolve, reject) => {
      CrawlResult.spawn(sessionId, resultSet)
        .save()
        .then(object => resolve(new CrawlResult(object)
          .getId()))
        .catch(error => reject(error));
    });
  }

  static getResultSets(sessionId) {
    return new Promise((resolve, reject) => {
      const query = Common.ParseWrapperService.createQuery(CrawlResult);

      query.equalTo('crawlSession', sessionId);

      query.find()
        .then(results => Immutable.fromJS(results)
          .map(_ => new CrawlResult(_)
            .getResultSet()))
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

  static getMostRecentCrawlSession(sessionKey) {
    return new Promise((resolve, reject) => {
      const query = Common.ParseWrapperService.createQuery(CrawlSession);

      query.equalTo('sessionKey', sessionKey);
      query.descending('startDateTime');
      query.limit(1);

      return query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No session found for session key: ${sessionKey}`);
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
