// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { Store, Tag, TagMapping } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class TagMappingService {
  static create = async (info) => {
    const result = await TagMapping.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(TagMapping).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No tag mapping found with Id: ${id}`);
    }

    return new TagMapping(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(TagMapping).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No tag mapping found with Id: ${info.get('id')}`);
    } else {
      const object = new TagMapping(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(TagMapping).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No tag mapping found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await TagMappingService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new TagMapping(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = TagMappingService.buildSearchQuery(criteria).each(_ => event.raise(new TagMapping(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await TagMappingService.count(criteria);

    return total > 0;
  };

  static count = async criteria => TagMappingService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(TagMapping, criteria);

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

    if (conditions.has('description')) {
      const value = conditions.get('description');

      if (value) {
        query.equalTo('lowerCaseDescription', value);
      }
    }

    if (conditions.has('startsWith_description')) {
      const value = conditions.get('startsWith_description');

      if (value) {
        query.startsWith('lowerCaseDescription', value);
      }
    }

    if (conditions.has('contains_description')) {
      const value = conditions.get('contains_description');

      if (value) {
        query.contains('lowerCaseDescription', value);
      }
    }

    if (conditions.has('contains_descriptions')) {
      const values = conditions.get('contains_descriptions');

      if (values && values.count() === 1) {
        query.contains('lowerCaseDescription', values.first().toLowerCase());
      } else if (values && values.count() > 1) {
        query.matches('lowerCaseDescription', values.map(value => `(?=.*${value.toLowerCase()})`).reduce((reduction, value) => reduction + value));
      }
    }

    if (conditions.has('weight')) {
      const value = conditions.get('weight');

      if (value) {
        query.equalTo('weight', value);
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
