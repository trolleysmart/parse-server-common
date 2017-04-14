import ParseWrapperService from './parse-wrapper-service';
import CrawlSession from './schema/crawl-session';
import StoreCrawlerConfiguration from './schema/store-crawler-configuration';

class CrawlService {
  static getStoreCrawlerConfig(key) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(StoreCrawlerConfiguration);

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

  static updateCrawlSessionEndDateTime(id, endDateTime) {
    return new Promise((resolve, reject) => {
      CrawlService.getExistingCrawlSession(id)
        .then((crawlSession) => {
          crawlSession.setEndDateTime(endDateTime);

          return crawlSession.saveObject();
        })
        .then(crawSession => resolve(new CrawlSession(crawSession).getId()))
        .catch(error => reject(error));
    });
  }

  static getExistingCrawlSessionInfo(id) {
    return new Promise((resolve, reject) => {
      CrawlService.getExistingCrawlSession(id)
        .then((crawlSession) => {
          resolve({
            sessionKey: crawlSession.getSessionKey(),
            startDateTime: crawlSession.getStartDateTime(),
            endDateTime: crawlSession.getEndDateTime(),
          });
        })
        .catch(error => reject(error));
    });
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
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default CrawlService;
