// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { UserFeedback } from '../';

export function createUserFeedbackInfo(userId) {
  return Map({
    userId: userId || uuid(),
    feedback: Map({ input1: uuid(), input2: uuid() }),
  });
}

export function createUserFeedback(userFeedbackInfo) {
  return UserFeedback.spawn(userFeedbackInfo || createUserFeedbackInfo());
}

function expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo) {
  expect(userFeedbackInfo.get('userId')).toBe(expectedUserFeedbackInfo.get('userId'));
  expect(userFeedbackInfo.get('feedback')).toEqual(expectedUserFeedbackInfo.get('feedback'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createUserFeedback().className).toBe('UserFeedback');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const userFeedbackInfo = createUserFeedbackInfo();
    const object = createUserFeedback(userFeedbackInfo);
    const info = object.getInfo();

    expectUserFeedbackInfo(info, userFeedbackInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = UserFeedback.spawn(createUserFeedbackInfo());

    expect(new UserFeedback(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createUserFeedback();

    expect(new UserFeedback(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createUserFeedback();
    const updatedStoreInfo = createUserFeedbackInfo();

    object.updateInfo(updatedStoreInfo);

    const info = object.getInfo();

    expectUserFeedbackInfo(info, updatedStoreInfo);
  });

  test('getInfo should return provided info', () => {
    const storeInfo = createUserFeedbackInfo();
    const object = createUserFeedback(storeInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectUserFeedbackInfo(info, storeInfo);
  });
});
