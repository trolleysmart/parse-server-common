// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { MasterProduct, Tag } from '../schema';
import ServiceBase from './ServiceBase';

export default class MasterProductService extends ServiceBase {
  static messagePrefix = 'No master product found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(MasterProduct, info, acl, sessionToken);

  static read = async (info, sessionToken) => ServiceBase.read(MasterProduct, info, sessionToken, MasterProductService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(MasterProduct, info, sessionToken, MasterProductService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(MasterProduct, info, sessionToken, MasterProductService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(MasterProduct, MasterProductService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(MasterProduct, MasterProductService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(MasterProductService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(MasterProductService.buildSearchQuery, criteria, sessionToken);

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(MasterProduct, criteria);

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

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');
    ServiceBase.addStringSearchToQuery(conditions, query, 'description', 'lowerCaseDescription');

    if (conditions.has('barcode')) {
      const value = conditions.get('barcode');

      if (value) {
        query.equalTo('barcode', value);
      }
    }

    if (conditions.has('imageUrl')) {
      const value = conditions.get('imageUrl');

      if (value) {
        query.equalTo('imageUrl', value);
      }
    }

    if (conditions.has('size')) {
      const value = conditions.get('size');

      if (value) {
        query.equalTo('size', value);
      }
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
