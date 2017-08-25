// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { ShoppingList } from '../schema';

export default class ShoppingListService extends ServiceBase {
  static messagePrefix = 'No shopping list found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(ShoppingList, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(ShoppingList, id, sessionToken, ShoppingListService.messagePrefix, query =>
      ShoppingListService.buildIncludeQuery(query, criteria),
    );

  static update = async (info, sessionToken) => ServiceBase.update(ShoppingList, info, sessionToken, ShoppingListService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(ShoppingList, id, sessionToken, ShoppingListService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(ShoppingList, ShoppingListService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(ShoppingList, ShoppingListService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(ShoppingListService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(ShoppingListService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    if (criteria.has('includeUser')) {
      const value = criteria.get('includeUser');

      if (value) {
        query.include('user');
      }
    }

    if (criteria.has('includeSharedWithUsers')) {
      const value = criteria.get('SharedWithUsersinclude');

      if (value) {
        query.include('sharedWithUsers');
      }
    }

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(ShoppingList, criteria);
    const query = ShoppingListService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
    ServiceBase.addUserLinkQuery(conditions, query, 'sharedWithUser', 'sharedWithUsers');

    return query;
  };
}
