// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { DefaultShoppingList, ShoppingList } from '../schema';

export default class DefaultShoppingListService extends ServiceBase {
  static fields = List.of('user', 'shoppingList');

  constructor() {
    super(DefaultShoppingList, DefaultShoppingListService.buildSearchQuery, DefaultShoppingListService.buildIncludeQuery, 'default shopping list');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'user');
    ServiceBase.addIncludeQuery(criteria, query, 'shoppingList');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(DefaultShoppingList, criteria);
    const query = DefaultShoppingListService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    DefaultShoppingListService.fields.forEach((field) => {
      ServiceBase.addExistenceQuery(conditions, query, field);
    });
    ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
    ServiceBase.addLinkQuery(conditions, query, 'shoppingList', 'shoppingList', ShoppingList);

    return query;
  };
}
