import EventEmitter from 'events';
import {
  Map,
} from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  CrawlResult,
  CrawlSession,
  StoreCrawlerConfiguration,
} from './schema';

class CrawlService {
  static getStoreCrawlerConfig(key) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(StoreCrawlerConfiguration);

      query.equalTo('key', key);
      query.descending('createdAt');
      query.limit(1);

      return query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No store crawler config found for key: ${key}`);
          } else {
            resolve(new StoreCrawlerConfiguration(results[0])
              .getConfig());
          }
        })
        .catch(error => reject(error));
    });
  }

  static setStoreCrawlerConfig(key, config) {
    return new Promise((resolve, reject) => {
      StoreCrawlerConfiguration.spawn(key, config)
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
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
          resolve(CrawlService.mapCrawlSessionParseObjectToDataTransferObject(crawlSession));
        })
        .catch(error => reject(error));
    });
  }

  static getMostRecentCrawlSessionInfo(sessionKey) {
    return new Promise((resolve, reject) => {
      CrawlService.getMostRecentCrawlSession(sessionKey)
        .then((crawlSession) => {
          resolve(CrawlService.mapCrawlSessionParseObjectToDataTransferObject(crawlSession));
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
    const eventEmitter = new EventEmitter();
    const query = ParseWrapperService.createQuery(CrawlResult);

    query.equalTo('crawlSession', CrawlSession.createWithoutData(sessionId));

    const promise = query.each(_ => eventEmitter.emit('newResultSets', new CrawlResult(_)
      .getResultSet()));

    return {
      eventEmitter,
      promise,
    };
  }

  static getExistingCrawlSession(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(CrawlSession);

      query.equalTo('objectId', id);

      return query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No session found for Id: ${id}`);
          } else {
            resolve(new CrawlSession(results[0]));
          }
        })
        .catch(error => reject(error));
    });
  }

  static getMostRecentCrawlSession(sessionKey) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(CrawlSession);

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
        .catch(error => reject(error));
    });
  }

  static mapCrawlSessionParseObjectToDataTransferObject(crawlSession) {
    return Map({
      id: crawlSession.getId(),
      sessionKey: crawlSession.getSessionKey(),
      startDateTime: crawlSession.getStartDateTime(),
      endDateTime: crawlSession.getEndDateTime(),
      additionalInfo: crawlSession.getAdditionalInfo(),
    });
  }
}

export {
  CrawlService,
};

export default CrawlService;
