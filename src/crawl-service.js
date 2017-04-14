import ParseWrapperService from './parse-wrapper-service';
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
}

export default CrawlService;
