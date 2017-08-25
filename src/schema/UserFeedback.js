// @flow

import Immutable, { Map } from 'immutable';
import { BaseObject, ParseWrapperService } from 'micro-business-parse-server-common';

export default class UserFeedback extends BaseObject {
  static spawn = (info) => {
    const object = new UserFeedback();

    UserFeedback.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('feedback', info.get('feedback').toJS());

    if (info.has('userId')) {
      const userId = info.get('userId');

      if (userId) {
        object.set('user', ParseWrapperService.createUserWithoutData(userId));
      }
    } else if (info.has('user')) {
      const user = info.get('user');

      if (user) {
        object.set('user', user);
      }
    }
  };

  constructor(object) {
    super(object, 'UserFeedback');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    UserFeedback.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const user = this.getObject().get('user');

    return Map({
      id: this.getId(),
      user,
      userId: user ? user.id : undefined,
      feedback: Immutable.fromJS(this.getObject().get('feedback')),
    });
  };
}
