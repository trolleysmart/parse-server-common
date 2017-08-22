// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StapleShoppingListTemplate } from '../schema';

export default class StapleShoppingListTemplateService extends ServiceBase {
  static messagePrefix = 'No staple shopping list template found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StapleShoppingListTemplate, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(StapleShoppingListTemplate, id, sessionToken, StapleShoppingListTemplateService.messagePrefix);

  static update = async (info, sessionToken) =>
    ServiceBase.update(StapleShoppingListTemplate, info, sessionToken, StapleShoppingListTemplateService.messagePrefix);

  static delete = async (id, sessionToken) =>
    ServiceBase.delete(StapleShoppingListTemplate, id, sessionToken, StapleShoppingListTemplateService.messagePrefix);

  static search = async (criteria, sessionToken) =>
    ServiceBase.search(StapleShoppingListTemplate, StapleShoppingListTemplateService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) =>
    ServiceBase.searchAll(StapleShoppingListTemplate, StapleShoppingListTemplateService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StapleShoppingListTemplateService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StapleShoppingListTemplateService.buildSearchQuery, criteria, sessionToken);

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(StapleShoppingListTemplate, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');

    return query;
  };
}
