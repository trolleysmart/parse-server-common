// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { ShoppingList, ShoppingListItem, ProductPrice, StapleItem, Store, Tag } from '../schema';

export default class ShoppingListItemService extends ServiceBase {
  constructor() {
    super(ShoppingListItem, ShoppingListItemService.buildSearchQuery, ShoppingListItemService.buildIncludeQuery, 'shopping list item');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'user');
    ServiceBase.addIncludeQuery(criteria, query, 'shoppingList');
    ServiceBase.addIncludeQuery(criteria, query, 'productPrice');
    ServiceBase.addIncludeQuery(criteria, query, 'stapleItem');
    ServiceBase.addIncludeQuery(criteria, query, 'store');
    ServiceBase.addIncludeQuery(criteria, query, 'tags');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(ShoppingListItem, criteria);
    const query = ShoppingListItemService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');
    ServiceBase.addLinkQuery(conditions, query, 'shoppingList', 'shoppingList', ShoppingList);
    ServiceBase.addLinkQuery(conditions, query, 'productPrice', 'productPrice', ProductPrice);
    ServiceBase.addLinkQuery(conditions, query, 'stapleItem', 'stapleItem', StapleItem);
    ServiceBase.addLinkQuery(conditions, query, 'store', 'store', Store);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);

    return query;
  };
}
