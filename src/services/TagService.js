// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { Tag } from '../schema';
import ServiceBase from './ServiceBase';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class TagService extends ServiceBase {
  static create = async (info) => {
    const result = await Tag.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(Tag).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No tag found with Id: ${id}`);
    }

    return new Tag(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(Tag).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No tag found with Id: ${info.get('id')}`);
    } else {
      const object = new Tag(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(Tag).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No tag found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await TagService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new Tag(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = TagService.buildSearchQuery(criteria).each(_ => event.raise(new Tag(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await TagService.count(criteria);

    return total > 0;
  };

  static count = async criteria => TagService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(Tag, criteria);

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

    return query;
  };
}
