// @flow

import Immutable from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { MasterProductPrice, ShoppingList, StapleShoppingList } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class ShoppingListService {
  static create = info =>
    new Promise((resolve, reject) => {
      ShoppingList.spawn(info).save().then(result => resolve(result.id)).catch(error => reject(error));
    });

  static read = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(ShoppingList)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No shopping list found with Id: ${id}`);
          } else {
            resolve(new ShoppingList(results[0]).getInfo());
          }
        })
        .catch(error => reject(error));
    });

  static update = info =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(ShoppingList)
        .equalTo('objectId', info.get('id'))
        .limit(1)
        .find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No shopping list found with Id: ${info.get('id')}`);
          } else {
            const object = new ShoppingList(results[0]);

            object.updateInfo(info).saveObject().then(() => resolve(object.getId())).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static delete = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(ShoppingList)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No shopping list found with Id: ${id}`);
          } else {
            results[0].destroy().then(() => resolve()).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static search = criteria =>
    new Promise((resolve, reject) =>
      ShoppingListService.buildSearchQuery(criteria)
        .find()
        .then(results => resolve(Immutable.fromJS(results).map(_ => new ShoppingList(_).getInfo())))
        .catch(error => reject(error)),
    );

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = ShoppingListService.buildSearchQuery(criteria).each(_ => event.raise(new ShoppingList(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = criteria =>
    new Promise((resolve, reject) =>
      ShoppingListService.buildSearchQuery(criteria).count().then(total => resolve(total > 0)).catch(error => reject(error)),
    );

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(ShoppingList, criteria);

    if (criteria.has('includeStapleShoppingList')) {
      const value = criteria.get('includeStapleShoppingList');

      if (value) {
        query.include('stapleShoppingList');
      }
    }

    if (criteria.has('includeMasterProductPrice')) {
      const value = criteria.get('includeMasterProductPrice');

      if (value) {
        query.include('masterProductPrice');
      }
    }

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('includeItemsMarkedAsDone')) {
      const value = conditions.get('includeItemsMarkedAsDone');

      if (value) {
        query.exists('doneDate');
      }
    }

    if (conditions.has('excludeItemsMarkedAsDone')) {
      const value = conditions.get('excludeItemsMarkedAsDone');

      if (value) {
        query.doesNotExist('doneDate');
      }
    }

    if (conditions.has('includeStapleShoppingListOnly')) {
      const value = conditions.get('includeStapleShoppingListOnly');

      if (value) {
        query.exists('stapleShoppingList');
      }
    }

    if (conditions.has('includeMasterProductPriceOnly')) {
      const value = conditions.get('includeMasterProductPriceOnly');

      if (value) {
        query.exists('masterProductPrice');
      }
    }

    if (conditions.has('userId')) {
      const value = conditions.get('userId');

      if (value) {
        query.equalTo('user', ParseWrapperService.createUserWithoutData(value));
      }
    }

    if (conditions.has('stapleShoppingListId')) {
      const value = conditions.get('stapleShoppingListId');

      if (value) {
        query.equalTo('stapleShoppingList', StapleShoppingList.createWithoutData(value));
      }
    }

    if (conditions.has('masterProductPriceId')) {
      const value = conditions.get('masterProductPriceId');

      if (value) {
        query.equalTo('masterProductPrice', MasterProductPrice.createWithoutData(value));
      }
    }

    return query;
  };
}
