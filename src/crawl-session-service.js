import Immutable, {
  Map,
} from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  CrawlSession,
} from './schema';

class CrawlSessionService {
  static create(store) {
    return new Promise((resolve, reject) => {
      CrawlSession.spawn(store.get('sessionKey'), store.get('startDateTime'), store.get('additionalInfo'))
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(CrawlSession);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No store found with Id: ${id}`);
          } else {
            resolve(CrawlSessionService.mapParseObjectToDataTransferObject(new CrawlSession(results[0])));
          }
        })
        .catch(error => reject(error));
    });
  }

  static search(criteria) {
    return new Promise((resolve, reject) => CrawlSessionService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new CrawlSession(_))
        .map(CrawlSessionService.mapParseObjectToDataTransferObject)))
      .catch(error => reject(error)));
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => CrawlSessionService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(CrawlSession);

    if (criteria.has('sessionKey') && criteria.get('sessionKey')) {
      query.equalTo('sessionKey', criteria.get('sessionKey'));
    }

    return query;
  }

  static mapParseObjectToDataTransferObject(store) {
    return Map({
      id: store.getId(),
      sessionKey: store.getSessionKey(),
      startDateTime: store.getStartDateTime(),
      endDateTime: store.getEndDateTime(),
      additionalInfo: store.getAdditionalInfo(),
    });
  }
}

export {
  CrawlSessionService,
};

export default CrawlSessionService;
