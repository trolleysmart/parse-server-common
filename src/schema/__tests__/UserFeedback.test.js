// @flow

import { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { UserFeedback } from '../';

export const createUserFeedbackInfo = async () => {
  const user = await ParseWrapperService.createNewUser({ username: `${uuid()}@email.com`, password: '123456' }).signUp();
  const userFeedback = Map({
    userId: user.id,
    feedback: Map({ info1: uuid(), info2: uuid() }),
  });

  return { userFeedback, user };
};

export const createUserFeedback = async object => UserFeedback.spawn(object || (await createUserFeedbackInfo()).userFeedback);

export const expectUserFeedback = (object, expectedObject, { userFeedbackId, expectedUser } = {}) => {
  expect(object.get('userId')).toBe(expectedObject.get('userId'));
  expect(object.get('feedback')).toEqual(expectedObject.get('feedback'));

  if (userFeedbackId) {
    expect(object.get('id')).toBe(userFeedbackId);
  }

  if (expectedUser) {
    expect(object.get('user').id).toEqual(expectedUser.id);
    expect(object.get('user').username).toEqual(expectedUser.username);
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createUserFeedback()).className).toBe('UserFeedback');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { userFeedback } = await createUserFeedbackInfo();
    const object = await createUserFeedback(userFeedback);
    const info = object.getInfo();

    expectUserFeedback(info, userFeedback);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createUserFeedback();

    expect(new UserFeedback(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createUserFeedback();

    expect(new UserFeedback(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createUserFeedback();
    const { userFeedback: updatedUserFeedback } = await createUserFeedbackInfo();

    object.updateInfo(updatedUserFeedback);

    const info = object.getInfo();

    expectUserFeedback(info, updatedUserFeedback);
  });

  test('getInfo should return provided info', async () => {
    const { userFeedback } = await createUserFeedbackInfo();
    const object = await createUserFeedback(userFeedback);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectUserFeedback(info, userFeedback);
  });
});
