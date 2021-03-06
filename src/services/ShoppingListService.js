// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from '@microbusiness/parse-server-common';
import { ShoppingList } from '../schema';

export default class ShoppingListService extends ServiceBase {
  static fields = List.of('name', 'user', 'sharedWithUsers', 'status');

  constructor() {
    super(ShoppingList, ShoppingListService.buildSearchQuery, ShoppingListService.buildIncludeQuery, 'shopping list');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'user');
    ServiceBase.addIncludeQuery(criteria, query, 'sharedWithUsers');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(ShoppingList, criteria);
    const query = ShoppingListService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ShoppingListService.fields.forEach((field) => {
      ServiceBase.addExistenceQuery(conditions, query, field);
    });
    ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
    ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
    ServiceBase.addUserLinkQuery(conditions, query, 'sharedWithUser', 'sharedWithUsers');
    ServiceBase.addEqualityQuery(conditions, query, 'status', 'status');

    return query;
  };
}
