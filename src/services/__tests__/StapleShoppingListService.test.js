// @flow

import { List, Map } from 'immutable';
import { UserService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleShoppingListService } from '../';
import { createStapleShoppingListInfo } from '../../schema/__tests__/StapleShoppingList.test';

function expectStapleShoppingListInfo(stapleShoppingListInfo, expectedShoppingListInfo, shoppingListId) {
  expect(stapleShoppingListInfo.get('id')).toBe(shoppingListId);
  expect(stapleShoppingListInfo.get('userId')).toBe(expectedShoppingListInfo.get('userId'));
  expect(stapleShoppingListInfo.get('items')).toEqual(expectedShoppingListInfo.get('items'));
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

beforeEach(async () => {
  const user = await UserService.signUpWithUsernameAndPassword(`${uuid()}@email.com`, '123456');

  userId = user.get('id');
});

describe('create', () => {
  test('should return the created staple shopping list Id', async () => {
    const result = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));

    expect(result).toBeDefined();
  });

  test('should create the staple shopping list', async () => {
    const expectedShoppingListInfo = createStapleShoppingListInfo(userId);
    const stapleShoppingListId = await StapleShoppingListService.create(expectedShoppingListInfo);
    const stapleShoppingListInfo = await StapleShoppingListService.read(stapleShoppingListId);

    expectStapleShoppingListInfo(stapleShoppingListInfo, expectedShoppingListInfo, stapleShoppingListId);
  });
});

describe('read', () => {
  test('should reject if the provided staple shopping list Id does not exist', async () => {
    const stapleShoppingListId = uuid();

    try {
      await StapleShoppingListService.read(stapleShoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list found with Id: ${stapleShoppingListId}`);
    }
  });

  test('should read the existing staple shopping list', async () => {
    const expectedStapleShoppingListInfo = createStapleShoppingListInfo(userId);
    const stapleShoppingListId = await StapleShoppingListService.create(expectedStapleShoppingListInfo);
    const stapleShoppingListInfo = await StapleShoppingListService.read(stapleShoppingListId);

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
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const id = await StapleShoppingListService.update(createStapleShoppingListInfo(userId).set('id', stapleShoppingListId));

    expect(id).toBe(stapleShoppingListId);
  });

  test('should update the existing staple shopping list', async () => {
    const expectedShoppingListInfo = createStapleShoppingListInfo(userId);
    const id = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const stapleShoppingListId = await StapleShoppingListService.update(expectedShoppingListInfo.set('id', id));
    const stapleShoppingListInfo = await StapleShoppingListService.read(stapleShoppingListId);

    expectStapleShoppingListInfo(stapleShoppingListInfo, expectedShoppingListInfo, stapleShoppingListId);
  });
});

describe('delete', () => {
  test('should reject if the provided staple shopping list Id does not exist', async () => {
    const stapleShoppingListId = uuid();

    try {
      await StapleShoppingListService.delete(stapleShoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list found with Id: ${stapleShoppingListId}`);
    }
  });

  test('should delete the existing staple shopping list', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    await StapleShoppingListService.delete(stapleShoppingListId);

    try {
      await StapleShoppingListService.read(stapleShoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list found with Id: ${stapleShoppingListId}`);
    }
  });
});

describe('search', () => {
  test('should return no staple shopping list if provided criteria matches no staple shopping list', async () => {
    const stapleShoppingListInfos = await StapleShoppingListService.search(createCriteria());

    expect(stapleShoppingListInfos.count()).toBe(0);
  });

  test('should return the staple shopping lists matches the criteria', async () => {
    const expectedShoppingListInfo = createStapleShoppingListInfo(userId);
    const stapleShoppingListId = await StapleShoppingListService.create(expectedShoppingListInfo);
    const stapleShoppingListInfos = await StapleShoppingListService.search(
      createCriteriaUsingProvidedStapleShoppingListInfo(expectedShoppingListInfo),
    );

    expect(stapleShoppingListInfos.count()).toBe(1);

    const stapleShoppingListInfo = stapleShoppingListInfos.first();

    expectStapleShoppingListInfo(stapleShoppingListInfo, expectedShoppingListInfo, stapleShoppingListId);
  });
});

describe('searchAll', () => {
  test('should return no staple shopping list if provided criteria matches no staple shopping list', async () => {
    const result = StapleShoppingListService.searchAll(createCriteria());

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
    const expectedShoppingListInfo = createStapleShoppingListInfo(userId);
    const stapleShoppingListId1 = await StapleShoppingListService.create(expectedShoppingListInfo);
    const stapleShoppingListId2 = await StapleShoppingListService.create(expectedShoppingListInfo);
    const result = StapleShoppingListService.searchAll(createCriteriaUsingProvidedStapleShoppingListInfo(expectedShoppingListInfo));

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
    const response = await StapleShoppingListService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any staple shopping list match provided criteria', async () => {
    const stapleShoppingListInfo = createStapleShoppingListInfo(userId);

    await StapleShoppingListService.create(stapleShoppingListInfo);

    const response = await StapleShoppingListService.exists(createCriteriaUsingProvidedStapleShoppingListInfo(stapleShoppingListInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no staple shopping list match provided criteria', async () => {
    const response = await StapleShoppingListService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of staple shopping list match provided criteria', async () => {
    const stapleShoppingListInfo = createStapleShoppingListInfo();

    await StapleShoppingListService.create(stapleShoppingListInfo);
    await StapleShoppingListService.create(stapleShoppingListInfo);

    const response = await StapleShoppingListService.count(createCriteriaUsingProvidedStapleShoppingListInfo(stapleShoppingListInfo));

    expect(response).toBe(2);
  });
});
