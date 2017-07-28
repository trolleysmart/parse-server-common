// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { UserFeedback } from '../schema';
import ServiceBase from './ServiceBase';

export default class UserFeedbackService extends ServiceBase {
  static messagePrefix = 'No user feedback found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(UserFeedback, info, acl, sessionToken);

  static read = async (info, sessionToken) => ServiceBase.read(UserFeedback, info, sessionToken, UserFeedbackService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(UserFeedback, info, sessionToken, UserFeedbackService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(UserFeedback, info, sessionToken, UserFeedbackService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(UserFeedback, UserFeedbackService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(UserFeedback, UserFeedbackService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(UserFeedbackService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(UserFeedbackService.buildSearchQuery, criteria, sessionToken);

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(UserFeedback, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('userId')) {
      const value = conditions.get('userId');

      if (value) {
        query.equalTo('user', ParseWrapperService.createUserWithoutData(value));
      }
    }

    return query;
  };
}
