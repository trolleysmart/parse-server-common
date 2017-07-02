// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { Store } from '../schema';
import ServiceBase from './ServiceBase';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StoreService extends ServiceBase {
  static create = async (info) => {
    const result = await Store.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(Store).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store found with Id: ${id}`);
    }

    return new Store(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(Store).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store found with Id: ${info.get('id')}`);
    } else {
      const object = new Store(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(Store).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await StoreService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new Store(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StoreService.buildSearchQuery(criteria).each(_ => event.raise(new Store(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await StoreService.count(criteria);

    return total > 0;
  };

  static count = async criteria => StoreService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(Store, criteria);
    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

    return query;
  };
}
