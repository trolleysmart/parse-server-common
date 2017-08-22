// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { Tag } from '../schema';

export default class TagService extends ServiceBase {
  static messagePrefix = 'No tag found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(Tag, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(Tag, id, sessionToken, TagService.messagePrefix, query => TagService.buildIncludeQuery(query, criteria));

  static update = async (info, sessionToken) => ServiceBase.update(Tag, info, sessionToken, TagService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(Tag, id, sessionToken, TagService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(Tag, TagService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(Tag, TagService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(TagService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(TagService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    if (criteria.has('includeTag')) {
      const value = criteria.get('includeTag');

      if (value) {
        query.include('tag');
      }
    }

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(Tag, criteria);
    const query = TagService.buildIncludeQuery(queryWithoutIncludes, criteria);

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

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'name');

    if (conditions.has('imageUrl')) {
      const value = conditions.get('imageUrl');

      if (value) {
        query.equalTo('imageUrl', value);
      }
    }

    if (conditions.has('level')) {
      const value = conditions.get('level');

      if (value) {
        query.equalTo('level', value);
      }
    }

    if (conditions.has('forDisplay')) {
      const value = conditions.get('forDisplay');

      query.equalTo('forDisplay', value);
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
