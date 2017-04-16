import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import CrawlResult from './schema/crawl-result';

class CountdownCrawlService {
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
      const query = ParseWrapperService.createQuery(CrawlResult);

      query.equalTo('crawlSession', sessionId);

      query.find()
        .then(results => Immutable.fromJS(results)
          .map(_ => new CrawlResult(_)
            .getResultSet()))
        .catch(error => reject(error));
    });
  }
}

export default CountdownCrawlService;
