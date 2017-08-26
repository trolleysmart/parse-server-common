// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { ShoppingList } from '../schema';

export default class ShoppingListService extends ServiceBase {
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

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
    ServiceBase.addUserLinkQuery(conditions, query, 'sharedWithUser', 'sharedWithUsers');

    return query;
  };
}
