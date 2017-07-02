// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { Store, Tag, StoreTag } from '../schema';
import ServiceBase from './ServiceBase';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StoreTagService extends ServiceBase {
  static create = async (info) => {
    const result = await StoreTag.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(StoreTag).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store tag found with Id: ${id}`);
    }

    return new StoreTag(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(StoreTag).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store tag found with Id: ${info.get('id')}`);
    } else {
      const object = new StoreTag(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(StoreTag).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store tag found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await StoreTagService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new StoreTag(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StoreTagService.buildSearchQuery(criteria).each(_ => event.raise(new StoreTag(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await StoreTagService.count(criteria);

    return total > 0;
  };

  static count = async criteria => StoreTagService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(StoreTag, criteria);

    if (criteria.has('includeStoreTags')) {
      const value = criteria.get('includeStoreTags');

      if (value) {
        query.include('storeTags');
      }
    }

    if (criteria.has('includeStore')) {
      const value = criteria.get('includeStore');

      if (value) {
        query.include('store');
      }
    }

    if (criteria.has('includeTag')) {
      const value = criteria.get('includeTag');

      if (value) {
        query.include('tag');
      }
    }

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

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

    if (conditions.has('weight')) {
      const value = conditions.get('weight');

      if (value) {
        query.equalTo('weight', value);
      }
    }

    if (conditions.has('url')) {
      const value = conditions.get('url');

      if (value) {
        query.equalTo('url', value);
      }
    }

    if (conditions.has('storeTag')) {
      const value = conditions.get('storeTag');

      if (value) {
        query.equalTo('storeTags', value);
      }
    }

    if (conditions.has('storeTags')) {
      const value = conditions.get('storeTags');

      if (value) {
        query.containedIn('storeTags', value.toArray());
      }
    }

    if (conditions.has('storeTagId')) {
      const value = conditions.get('storeTagId');

      if (value) {
        query.equalTo('storeTags', StoreTag.createWithoutData(value));
      }
    }

    if (conditions.has('storeTagIds')) {
      const value = conditions.get('storeTagIds');

      if (value) {
        query.containedIn('storeTags', value.map(storeTagId => StoreTag.createWithoutData(storeTagId)).toArray());
      }
    }

    if (conditions.has('store')) {
      const value = conditions.get('store');

      if (value) {
        query.equalTo('store', value);
      }
    }

    if (conditions.has('storeId')) {
      const value = conditions.get('storeId');

      if (value) {
        query.equalTo('store', Store.createWithoutData(value));
      }
    }

    if (conditions.has('tag')) {
      const value = conditions.get('tag');

      if (value) {
        query.equalTo('tag', value);
      }
    }

    if (conditions.has('tagId')) {
      const value = conditions.get('tagId');

      if (value) {
        query.equalTo('tag', Tag.createWithoutData(value));
      }
    }

    return query;
  };
}
