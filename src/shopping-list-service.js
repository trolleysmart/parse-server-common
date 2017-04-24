import Immutable from 'immutable';
import {
  ParseWrapperService,
  User,
} from 'micro-business-parse-server-common';
import {
  ShoppingList,
} from './schema';

class ShoppingListService {
  static create(info) {
    return new Promise((resolve, reject) => {
      ShoppingList.spawn(info)
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(ShoppingList);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No shopping lists found with Id: ${id}`);
          } else {
            resolve(new ShoppingList(results[0])
              .getInfo());
          }
        })
        .catch(error => reject(error));
    });
  }

  static update(id, info) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(ShoppingList);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No shopping list found with Id: ${id}`);
          } else {
            const object = new ShoppingList(results[0]);

            object.updateInfo(info)
              .saveObject()
              .then(() => resolve(object.getId()))
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(ShoppingList);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No shopping list found with Id: ${id}`);
          } else {
            results[0].destroy()
              .then(() => resolve())
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
  }

  static search(criteria) {
    return new Promise((resolve, reject) => ShoppingListService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new ShoppingList(_)
          .getInfo())))
      .catch(error => reject(error)));
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => ShoppingListService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(ShoppingList);

    if (criteria.has('userId') && criteria.get('userId')) {
      query.equalTo('user', User.createWithoutData(criteria.get('userId')));
    }

    if (criteria.has('latest') && criteria.get('latest')) {
      query.descending('createdAt');
      query.limit(1);
    }

    return query;
  }
}

export {
  ShoppingListService,
};

export default ShoppingListService;
