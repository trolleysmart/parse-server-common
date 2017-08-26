// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { UserFeedback } from '../schema';

export default class UserFeedbackService extends ServiceBase {
  constructor() {
    super(UserFeedback, UserFeedbackService.buildSearchQuery, UserFeedbackService.buildIncludeQuery, 'user feedback');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'user');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(UserFeedback, criteria);
    const query = UserFeedbackService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addUserLinkQuery(conditions, query, 'user', 'user');

    return query;
  };
}
