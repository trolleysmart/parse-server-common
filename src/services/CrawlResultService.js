// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { CrawlResult, CrawlSession } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class CrawlResultService {
  static create = async (info) => {
    const result = await CrawlResult.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(CrawlResult).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No crawl result found with Id: ${id}`);
    }

    return new CrawlResult(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(CrawlResult).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No crawl result found with Id: ${info.get('id')}`);
    } else {
      const object = new CrawlResult(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(CrawlResult).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No crawl result found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await CrawlResultService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new CrawlResult(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = CrawlResultService.buildSearchQuery(criteria).each(_ => event.raise(new CrawlResult(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await CrawlResultService.count(criteria);

    return total > 0;
  };

  static count = async criteria => CrawlResultService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(CrawlResult, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('crawlSessionId')) {
      const value = conditions.get('crawlSessionId');

      if (value) {
        query.equalTo('crawlSession', CrawlSession.createWithoutData(value));
      }
    }

    return query;
  };
}
