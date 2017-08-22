// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { UserFeedback } from '../schema';

export default class UserFeedbackService extends ServiceBase {
  static messagePrefix = 'No user feedback found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(UserFeedback, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(UserFeedback, id, sessionToken, UserFeedbackService.messagePrefix, query =>
      UserFeedbackService.buildIncludeQuery(query, criteria),
    );

  static update = async (info, sessionToken) => ServiceBase.update(UserFeedback, info, sessionToken, UserFeedbackService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(UserFeedback, id, sessionToken, UserFeedbackService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(UserFeedback, UserFeedbackService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(UserFeedback, UserFeedbackService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(UserFeedbackService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(UserFeedbackService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    if (criteria.has('includeUser')) {
      const value = criteria.get('includeUser');

      if (value) {
        query.include('user');
      }
    }

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(UserFeedback, criteria);
    const query = UserFeedbackService.buildIncludeQuery(queryWithoutIncludes, criteria);

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

    if (conditions.has('user')) {
      const value = conditions.get('user');

      if (value) {
        query.equalTo('user', value);
      }
    }

    return query;
  };
}
