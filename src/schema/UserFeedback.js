// @flow

import Immutable, { Map } from 'immutable';
import { BaseObject } from '@microbusiness/parse-server-common';

export default class UserFeedback extends BaseObject {
  static spawn = (info) => {
    const object = new UserFeedback();

    UserFeedback.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('feedback', info.get('feedback').toJS());
    BaseObject.createUserPointer(object, info, 'user');
  };

  constructor(object) {
    super(object, 'UserFeedback');
  }

  updateInfo = (info) => {
    UserFeedback.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const user = object.get('user');

    return Map({
      id: this.getId(),
      user,
      userId: user ? user.id : undefined,
      feedback: Immutable.fromJS(object.get('feedback')),
    });
  };
}
