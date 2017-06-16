// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { StoreCrawlerConfiguration } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StoreCrawlerConfigurationService {
  static create = async (info) => {
    const result = await StoreCrawlerConfiguration.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(StoreCrawlerConfiguration).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store crawler configuration found with Id: ${id}`);
    }

    return new StoreCrawlerConfiguration(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(StoreCrawlerConfiguration).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store crawler configuration found with Id: ${info.get('id')}`);
    } else {
      const object = new StoreCrawlerConfiguration(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(StoreCrawlerConfiguration).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store crawler configuration found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await StoreCrawlerConfigurationService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new StoreCrawlerConfiguration(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StoreCrawlerConfigurationService.buildSearchQuery(criteria).each(_ => event.raise(new StoreCrawlerConfiguration(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await StoreCrawlerConfigurationService.count(criteria);

    return total > 0;
  };

  static count = async criteria => StoreCrawlerConfigurationService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(StoreCrawlerConfiguration, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('key')) {
      const value = conditions.get('key');

      if (value) {
        query.equalTo('key', value);
      }
    }

    return query;
  };
}
