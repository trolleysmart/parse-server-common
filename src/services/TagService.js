// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { Tag } from '../schema';
import ServiceBase from './ServiceBase';

export default class TagService extends ServiceBase {
  static messagePrefix = 'No tag found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(Tag, info, acl, sessionToken);

  static read = async (id, sessionToken) => ServiceBase.read(Tag, id, sessionToken, TagService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(Tag, info, sessionToken, TagService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(Tag, id, sessionToken, TagService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(Tag, TagService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(Tag, TagService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(TagService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(TagService.buildSearchQuery, criteria, sessionToken);

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(Tag, criteria);

    if (criteria.has('includeTags')) {
      const value = criteria.get('includeTags');

      if (value) {
        query.include('tags');
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

    if (conditions.has('forDisplay')) {
      const value = conditions.get('forDisplay');

      query.equalTo('forDisplay', value);
    }

    if (conditions.has('tag')) {
      const value = conditions.get('tag');

      if (value) {
        query.equalTo('tags', value);
      }
    }

    if (conditions.has('tags')) {
      const value = conditions.get('tags');

      if (value) {
        query.containedIn('tags', value.toArray());
      }
    }

    if (conditions.has('tagId')) {
      const value = conditions.get('tagId');

      if (value) {
        query.equalTo('tags', Tag.createWithoutData(value));
      }
    }

    if (conditions.has('tagIds')) {
      const value = conditions.get('tagIds');

      if (value) {
        query.containedIn('tags', value.map(tagId => Tag.createWithoutData(tagId)).toArray());
      }
    }

    return query;
  };
}
