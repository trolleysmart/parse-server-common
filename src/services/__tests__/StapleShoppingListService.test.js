// @flow

import { List, Map } from 'immutable';
import { ParseWrapperService, UserService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleShoppingListService } from '../';
import { createStapleShoppingListInfo } from '../../schema/__tests__/StapleShoppingList.test';

function expectStapleShoppingListInfo(stapleShoppingListInfo, expectedStapleShoppingListInfo, shoppingListId) {
  expect(stapleShoppingListInfo.get('id')).toBe(shoppingListId);
  expect(stapleShoppingListInfo.get('userId')).toBe(expectedStapleShoppingListInfo.get('userId'));
  expect(stapleShoppingListInfo.get('items')).toEqual(expectedStapleShoppingListInfo.get('items'));
}

function createCriteria() {
  return Map({
    fields: List.of('user', 'items'),
    conditions: Map({
      userId: uuid(),
    }),
  });
}

function createCriteriaUsingProvidedStapleShoppingListInfo(stapleShoppingListInfo) {
  return Map({
    fields: List.of('user', 'items'),
    conditions: Map({
      userId: stapleShoppingListInfo.get('userId'),
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
  test('should return the created staple shopping list Id', async () => {
    const result = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);

    expect(result).toBeDefined();
  });

  test('should create the staple shopping list', async () => {
    const expectedStapleShoppingListInfo = createStapleShoppingListInfo(userId);
    const stapleShoppingListId = await StapleShoppingListService.create(expectedStapleShoppingListInfo, acl);
    const stapleShoppingListInfo = await StapleShoppingListService.read(stapleShoppingListId, sessionToken);

    expectStapleShoppingListInfo(stapleShoppingListInfo, expectedStapleShoppingListInfo, stapleShoppingListId);
  });
});

describe('read', () => {
  test('should reject if the provided staple shopping list Id does not exist', async () => {
    const stapleShoppingListId = uuid();

    try {
      await StapleShoppingListService.read(stapleShoppingListId, sessionToken);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list found with Id: ${stapleShoppingListId}`);
    }
  });

  test('should read the existing staple shopping list', async () => {
    const expectedStapleShoppingListInfo = createStapleShoppingListInfo(userId);
    const stapleShoppingListId = await StapleShoppingListService.create(expectedStapleShoppingListInfo, acl);
    const stapleShoppingListInfo = await StapleShoppingListService.read(stapleShoppingListId, sessionToken);

    expectStapleShoppingListInfo(stapleShoppingListInfo, expectedStapleShoppingListInfo, stapleShoppingListId);
  });
});

describe('update', () => {
  test('should reject if the provided staple shopping list Id does not exist', async () => {
    const stapleShoppingListId = uuid();

    try {
      await StapleShoppingListService.update(createStapleShoppingListInfo().set('id', stapleShoppingListId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list found with Id: ${stapleShoppingListId}`);
    }
  });

  test('should return the Id of the updated staple shopping list', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const id = await StapleShoppingListService.update(createStapleShoppingListInfo(userId).set('id', stapleShoppingListId), sessionToken);

    expect(id).toBe(stapleShoppingListId);
  });

  test('should update the existing staple shopping list', async () => {
    const expectedStapleShoppingListInfo = createStapleShoppingListInfo(userId);
    const id = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const stapleShoppingListId = await StapleShoppingListService.update(expectedStapleShoppingListInfo.set('id', id), sessionToken);
    const stapleShoppingListInfo = await StapleShoppingListService.read(stapleShoppingListId, sessionToken);

    expectStapleShoppingListInfo(stapleShoppingListInfo, expectedStapleShoppingListInfo, stapleShoppingListId);
  });
});

describe('delete', () => {
  test('should reject if the provided staple shopping list Id does not exist', async () => {
    const stapleShoppingListId = uuid();

    try {
      await StapleShoppingListService.delete(stapleShoppingListId, sessionToken);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list found with Id: ${stapleShoppingListId}`);
    }
  });

  test('should delete the existing staple shopping list', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    await StapleShoppingListService.delete(stapleShoppingListId, sessionToken);

    try {
      await StapleShoppingListService.read(stapleShoppingListId, sessionToken);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list found with Id: ${stapleShoppingListId}`);
    }
  });
});

describe('search', () => {
  test('should return no staple shopping list if provided criteria matches no staple shopping list', async () => {
    const stapleShoppingListInfos = await StapleShoppingListService.search(createCriteria(), sessionToken);

    expect(stapleShoppingListInfos.count()).toBe(0);
  });

  test('should return the staple shopping lists matches the criteria', async () => {
    const expectedStapleShoppingListInfo = createStapleShoppingListInfo(userId);
    const stapleShoppingListId = await StapleShoppingListService.create(expectedStapleShoppingListInfo, acl);
    const stapleShoppingListInfos = await StapleShoppingListService.search(
      createCriteriaUsingProvidedStapleShoppingListInfo(expectedStapleShoppingListInfo),
      sessionToken,
    );

    expect(stapleShoppingListInfos.count()).toBe(1);

    const stapleShoppingListInfo = stapleShoppingListInfos.first();

    expectStapleShoppingListInfo(stapleShoppingListInfo, expectedStapleShoppingListInfo, stapleShoppingListId);
  });
});

describe('searchAll', () => {
  test('should return no staple shopping list if provided criteria matches no staple shopping list', async () => {
    const result = StapleShoppingListService.searchAll(createCriteria(), sessionToken);

    try {
      let stapleShoppingListInfos = List();

      result.event.subscribe(info => (stapleShoppingListInfos = stapleShoppingListInfos.push(info)));

      await result.promise;
      expect(stapleShoppingListInfos.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the staple shopping list matches the criteria', async () => {
    const expectedStapleShoppingListInfo = createStapleShoppingListInfo(userId);
    const stapleShoppingListId1 = await StapleShoppingListService.create(expectedStapleShoppingListInfo, acl);
    const stapleShoppingListId2 = await StapleShoppingListService.create(expectedStapleShoppingListInfo, acl);
    const result = StapleShoppingListService.searchAll(
      createCriteriaUsingProvidedStapleShoppingListInfo(expectedStapleShoppingListInfo),
      sessionToken,
    );

    try {
      let stapleShoppingListInfos = List();

      result.event.subscribe(info => (stapleShoppingListInfos = stapleShoppingListInfos.push(info)));

      await result.promise;
      expect(stapleShoppingListInfos.count()).toBe(2);
      expect(stapleShoppingListInfos.find(_ => _.get('id').localeCompare(stapleShoppingListId1) === 0)).toBeTruthy();
      expect(stapleShoppingListInfos.find(_ => _.get('id').localeCompare(stapleShoppingListId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no staple shopping list match provided criteria', async () => {
    const response = await StapleShoppingListService.exists(createCriteria(), sessionToken);

    expect(response).toBeFalsy();
  });

  test('should return true if any staple shopping list match provided criteria', async () => {
    const stapleShoppingListInfo = createStapleShoppingListInfo(userId);

    await StapleShoppingListService.create(stapleShoppingListInfo, acl);

    const response = await StapleShoppingListService.exists(createCriteriaUsingProvidedStapleShoppingListInfo(stapleShoppingListInfo), sessionToken);

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no staple shopping list match provided criteria', async () => {
    const response = await StapleShoppingListService.count(createCriteria(), sessionToken);

    expect(response).toBe(0);
  });

  test('should return the count of staple shopping list match provided criteria', async () => {
    const stapleShoppingListInfo = createStapleShoppingListInfo();

    await StapleShoppingListService.create(stapleShoppingListInfo, acl);
    await StapleShoppingListService.create(stapleShoppingListInfo, acl);

    const response = await StapleShoppingListService.count(createCriteriaUsingProvidedStapleShoppingListInfo(stapleShoppingListInfo), sessionToken);

    expect(response).toBe(2);
  });
});
