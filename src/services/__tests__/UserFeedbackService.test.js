// @flow

import { List, Map } from 'immutable';
import { ParseWrapperService, UserService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { UserFeedbackService } from '../';
import { createUserFeedbackInfo } from '../../schema/__tests__/UserFeedback.test';

function expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId) {
  expect(userFeedbackInfo.get('id')).toBe(userFeedbackId);
  expect(userFeedbackInfo.get('userId')).toBe(expectedUserFeedbackInfo.get('userId'));
  expect(userFeedbackInfo.get('feedback')).toEqual(expectedUserFeedbackInfo.get('feedback'));
}

function createCriteria() {
  return Map({
    fields: List.of('user', 'feedback'),
    conditions: Map({
      userId: uuid(),
    }),
  });
}

function createCriteriaUsingProvidedUserFeedbackInfo(userFeedbackInfo) {
  return Map({
    fields: List.of('user', 'feedback'),
    conditions: Map({
      userId: userFeedbackInfo.get('userId'),
    }),
  });
}

let userId;
let sessionToken;
let acl;

beforeEach(async () => {
  const username = `${uuid()}@email.com`;
  const user = ParseWrapperService.createNewUser();

  user.setUsername(username);
  user.setPassword('123456');

  const result = await user.signUp();

  sessionToken = result.getSessionToken();

  acl = ParseWrapperService.createACL(await UserService.getUser(username));
  userId = result.get('id');
});

describe('create', () => {
  test('should return the created user feedback Id', async () => {
    const result = await UserFeedbackService.create(createUserFeedbackInfo(userId), acl);

    expect(result).toBeDefined();
  });

  test('should create the user feedback', async () => {
    const expectedUserFeedbackInfo = createUserFeedbackInfo(userId);
    const userFeedbackId = await UserFeedbackService.create(expectedUserFeedbackInfo, acl);
    const userFeedbackInfo = await UserFeedbackService.read(userFeedbackId, sessionToken);

    expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId);
  });
});

describe('read', () => {
  test('should reject if the provided user feedback Id does not exist', async () => {
    const userFeedbackId = uuid();

    try {
      await UserFeedbackService.read(userFeedbackId, sessionToken);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });

  test('should read the existing user feedback', async () => {
    const expectedUserFeedbackInfo = createUserFeedbackInfo(userId);
    const userFeedbackId = await UserFeedbackService.create(expectedUserFeedbackInfo, acl);
    const userFeedbackInfo = await UserFeedbackService.read(userFeedbackId, sessionToken);

    expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId);
  });
});

describe('update', () => {
  test('should reject if the provided user feedback Id does not exist', async () => {
    const userFeedbackId = uuid();

    try {
      await UserFeedbackService.update(createUserFeedbackInfo().set('id', userFeedbackId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });

  test('should return the Id of the updated user feedback', async () => {
    const userFeedbackId = await UserFeedbackService.create(createUserFeedbackInfo(userId), acl);
    const id = await UserFeedbackService.update(createUserFeedbackInfo(userId).set('id', userFeedbackId), sessionToken);

    expect(id).toBe(userFeedbackId);
  });

  test('should update the existing user feedback', async () => {
    const expectedUserFeedbackInfo = createUserFeedbackInfo(userId);
    const id = await UserFeedbackService.create(createUserFeedbackInfo(userId), acl);
    const userFeedbackId = await UserFeedbackService.update(expectedUserFeedbackInfo.set('id', id), sessionToken);
    const userFeedbackInfo = await UserFeedbackService.read(userFeedbackId, sessionToken);

    expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId);
  });
});

describe('delete', () => {
  test('should reject if the provided user feedback Id does not exist', async () => {
    const userFeedbackId = uuid();

    try {
      await UserFeedbackService.delete(userFeedbackId, sessionToken);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });

  test('should delete the existing user feedback', async () => {
    const userFeedbackId = await UserFeedbackService.create(createUserFeedbackInfo(userId), acl);
    await UserFeedbackService.delete(userFeedbackId, sessionToken);

    try {
      await UserFeedbackService.read(userFeedbackId, sessionToken);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });
});

describe('search', () => {
  test('should return no user feedback if provided criteria matches no user feedback', async () => {
    const userFeedbackInfos = await UserFeedbackService.search(createCriteria(), sessionToken);

    expect(userFeedbackInfos.count()).toBe(0);
  });

  test('should return the user feedbacks matches the criteria', async () => {
    const expectedUserFeedbackInfo = createUserFeedbackInfo(userId);
    const userFeedbackId = await UserFeedbackService.create(expectedUserFeedbackInfo, acl);
    const userFeedbackInfos = await UserFeedbackService.search(createCriteriaUsingProvidedUserFeedbackInfo(expectedUserFeedbackInfo), sessionToken);

    expect(userFeedbackInfos.count()).toBe(1);

    const userFeedbackInfo = userFeedbackInfos.first();

    expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo, userFeedbackId);
  });
});

describe('searchAll', () => {
  test('should return no user feedback if provided criteria matches no user feedback', async () => {
    const result = UserFeedbackService.searchAll(createCriteria(), sessionToken);

    try {
      let userFeedbackInfos = List();

      result.event.subscribe((info) => {
        userFeedbackInfos = userFeedbackInfos.push(info);
      });

      await result.promise;
      expect(userFeedbackInfos.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the user feedback matches the criteria', async () => {
    const expectedUserFeedbackInfo = createUserFeedbackInfo(userId);
    const userFeedbackId1 = await UserFeedbackService.create(expectedUserFeedbackInfo, acl);
    const userFeedbackId2 = await UserFeedbackService.create(expectedUserFeedbackInfo, acl);
    const result = UserFeedbackService.searchAll(createCriteriaUsingProvidedUserFeedbackInfo(expectedUserFeedbackInfo), sessionToken);

    try {
      let userFeedbackInfos = List();

      result.event.subscribe((info) => {
        userFeedbackInfos = userFeedbackInfos.push(info);
      });

      await result.promise;
      expect(userFeedbackInfos.count()).toBe(2);
      expect(userFeedbackInfos.find(_ => _.get('id').localeCompare(userFeedbackId1) === 0)).toBeTruthy();
      expect(userFeedbackInfos.find(_ => _.get('id').localeCompare(userFeedbackId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no user feedback match provided criteria', async () => {
    const response = await UserFeedbackService.exists(createCriteria(), sessionToken);

    expect(response).toBeFalsy();
  });

  test('should return true if any user feedback match provided criteria', async () => {
    const userFeedbackInfo = createUserFeedbackInfo(userId);

    await UserFeedbackService.create(userFeedbackInfo, acl);

    const response = await UserFeedbackService.exists(createCriteriaUsingProvidedUserFeedbackInfo(userFeedbackInfo), sessionToken);

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no user feedback match provided criteria', async () => {
    const response = await UserFeedbackService.count(createCriteria(), sessionToken);

    expect(response).toBe(0);
  });

  test('should return the count of user feedback match provided criteria', async () => {
    const userFeedbackInfo = createUserFeedbackInfo();

    await UserFeedbackService.create(userFeedbackInfo, acl);
    await UserFeedbackService.create(userFeedbackInfo, acl);

    const response = await UserFeedbackService.count(createCriteriaUsingProvidedUserFeedbackInfo(userFeedbackInfo), sessionToken);

    expect(response).toBe(2);
  });
});
