// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { ShoppingList, ShoppingListItem, ProductPrice, StapleItem, Store, Tag } from '../schema';

export default class ShoppingListItemService extends ServiceBase {
  static fields = List.of(
    'name',
    'description',
    'imageUrl',
    'isPurchased',
    'addedByUser',
    'removedByUser',
    'shoppingList',
    'productPrice',
    'stapleItem',
    'store',
    'tags',
  );

  constructor() {
    super(ShoppingListItem, ShoppingListItemService.buildSearchQuery, ShoppingListItemService.buildIncludeQuery, 'shopping list item');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'addedByUser');
    ServiceBase.addIncludeQuery(criteria, query, 'removedByUser');
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

    ShoppingListItemService.fields.forEach((field) => {
      ServiceBase.addExistenceQuery(conditions, query, field);
    });
    ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
    ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'isPurchased', 'isPurchased');
    ServiceBase.addUserLinkQuery(conditions, query, 'addedByUser', 'addedByUser');
    ServiceBase.addUserLinkQuery(conditions, query, 'removedByUser', 'removedByUser');
    ServiceBase.addLinkQuery(conditions, query, 'shoppingList', 'shoppingList', ShoppingList);
    ServiceBase.addLinkQuery(conditions, query, 'productPrice', 'productPrice', ProductPrice);
    ServiceBase.addLinkQuery(conditions, query, 'stapleItem', 'stapleItem', StapleItem);
    ServiceBase.addLinkQuery(conditions, query, 'store', 'store', Store);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);

    return query;
  };
}
