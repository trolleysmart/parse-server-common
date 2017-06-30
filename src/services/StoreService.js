// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { Store } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StoreService {
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

    if (conditions.has('name')) {
      const value = conditions.get('name');

      if (value) {
        query.equalTo('lowerCaseName', value.toLowerCase());
      }
    }

    if (conditions.has('startsWith_name')) {
      const value = conditions.get('startsWith_name');

      if (value) {
        query.startsWith('lowerCaseName', value.toLowerCase());
      }
    }

    if (conditions.has('contains_name')) {
      const value = conditions.get('contains_name');

      if (value) {
        query.contains('lowerCaseName', value.toLowerCase());
      }
    }

    if (conditions.has('contains_names')) {
      const values = conditions.get('contains_names');

      if (values && values.count() === 1) {
        query.contains('lowerCaseName', values.first().toLowerCase());
      } else if (values && values.count() > 1) {
        query.matches('lowerCaseName', values.map(value => `(?=.*${value.toLowerCase()})`).reduce((reduction, value) => reduction + value));
      }
    }

    return query;
  };
}
