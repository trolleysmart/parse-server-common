// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { ShoppingList, ShoppingListItem, ProductPrice, StapleItem, Store, Tag } from '../schema';

export default class ShoppingListItemService extends ServiceBase {
  static messagePrefix = 'No shopping list item found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(ShoppingListItem, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(ShoppingListItem, id, sessionToken, ShoppingListItemService.messagePrefix, query =>
      ShoppingListItemService.buildIncludeQuery(query, criteria),
    );

  static update = async (info, sessionToken) => ServiceBase.update(ShoppingListItem, info, sessionToken, ShoppingListItemService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(ShoppingListItem, id, sessionToken, ShoppingListItemService.messagePrefix);

  static search = async (criteria, sessionToken) =>
    ServiceBase.search(ShoppingListItem, ShoppingListItemService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) =>
    ServiceBase.searchAll(ShoppingListItem, ShoppingListItemService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(ShoppingListItemService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(ShoppingListItemService.buildSearchQuery, criteria, sessionToken);

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
