// @flow

import Immutable from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { Tag } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class TagService {
  static create = info =>
    new Promise((resolve, reject) => {
      Tag.spawn(info).save().then(result => resolve(result.id)).catch(error => reject(error));
    });

  static read = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(Tag)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No tag found with Id: ${id}`);
          } else {
            resolve(new Tag(results[0]).getInfo());
          }
        })
        .catch(error => reject(error));
    });

  static update = info =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(Tag)
        .equalTo('objectId', info.get('id'))
        .limit(1)
        .find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No tag found with Id: ${info.get('id')}`);
          } else {
            const object = new Tag(results[0]);

            object.updateInfo(info).saveObject().then(() => resolve(object.getId())).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static delete = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(Tag)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No tag found with Id: ${id}`);
          } else {
            results[0].destroy().then(() => resolve()).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static search = criteria =>
    new Promise((resolve, reject) =>
      TagService.buildSearchQuery(criteria)
        .find()
        .then(results => resolve(Immutable.fromJS(results).map(_ => new Tag(_).getInfo())))
        .catch(error => reject(error)),
    );

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = TagService.buildSearchQuery(criteria).each(_ => event.raise(new Tag(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = criteria =>
    new Promise((resolve, reject) => TagService.buildSearchQuery(criteria).count().then(total => resolve(total > 0)).catch(error => reject(error)));

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(Tag, criteria);
    const conditions = criteria.get('conditions');

    if (conditions.has('name')) {
      const value = conditions.get('name');

      if (value) {
        query.equalTo('name', value);
      }
    }

    if (conditions.has('startsWith_name')) {
      const value = conditions.get('startsWith_name');

      if (value) {
        query.startsWith('name', value);
      }
    }

    if (conditions.has('contains_name')) {
      const value = conditions.get('contains_name');

      if (value) {
        query.contains('name', value);
      }
    }

    if (conditions.has('weight')) {
      const value = conditions.get('weight');

      if (value) {
        query.equalTo('weight', value);
      }
    }

    return query;
  };
}
