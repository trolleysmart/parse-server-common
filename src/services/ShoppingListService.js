// @flow

import Immutable from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { ShoppingList } from '../schema';
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

    if (criteria.has('includeMasterProductPrices')) {
      const value = criteria.get('includeMasterProductPrices');

      if (value) {
        query.include('masterProductPrices');
      }
    }

    if (!criteria.has('conditions')) {
      return ParseWrapperService.createQueryIncludingObjectIds(ShoppingList, query, criteria);
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('userId')) {
      const value = conditions.get('userId');

      if (value) {
        query.equalTo('user', ParseWrapperService.createUserWithoutData(value));
      }
    }

    return ParseWrapperService.createQueryIncludingObjectIds(ShoppingList, query, criteria);
  };
}
