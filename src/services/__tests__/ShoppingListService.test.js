// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import { ParseWrapperService, UserService } from 'micro-business-parse-server-common';
import '../../../bootstrap';
import { MasterProductPriceService, ShoppingListService, StapleShoppingListService } from '../';
import { createMasterProductPriceInfo } from '../../schema/__tests__/MasterProductPrice.test';
import { createShoppingListInfo } from '../../schema/__tests__/ShoppingList.test';
import { createStapleShoppingListInfo } from '../../schema/__tests__/StapleShoppingList.test';

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId, masterProductPriceId) {
  expect(shoppingListInfo.get('id')).toBe(shoppingListId);
  expect(shoppingListInfo.get('userId')).toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('doneDate')).toEqual(expectedShoppingListInfo.get('doneDate'));
  expect(shoppingListInfo.get('stapleShoppingListId')).toEqual(stapleShoppingListId);
  expect(shoppingListInfo.get('masterProductPriceId')).toEqual(masterProductPriceId);
  expect(shoppingListInfo.get('name')).toBe(expectedShoppingListInfo.get('name'));
}

function createCriteria() {
  return Map({
    fields: List.of('user', 'doneDate', 'stapleShoppingList', 'masterProductPrice', 'name'),
    includeStapleShoppingList: true,
    includeMasterProductPrice: true,
    conditions: Map({
      userId: uuid(),
      stapleShoppingListId: uuid(),
      masterProductPriceIdL: uuid(),
      includeItemsMarkedAsDone: true,
    }),
  });
}

function createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo, stapleShoppingListId, masterProductPriceId) {
  return Map({
    fields: List.of('user', 'doneDate', 'stapleShoppingList', 'masterProductPrice', 'name'),
    includeStapleShoppingList: true,
    includeMasterProductPrice: true,
    conditions: Map({
      userId: shoppingListInfo.get('userId'),
      stapleShoppingListId,
      masterProductPriceId,
      includeItemsMarkedAsDone: true,
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
  test('should return the created shopping list Id', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const result = await ShoppingListService.create(createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId), acl);

    expect(result).toBeDefined();
  });

  test('should create the shopping list', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedShoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);
    const shoppingListId = await ShoppingListService.create(expectedShoppingListInfo, acl);
    const shoppingListInfo = await ShoppingListService.read(shoppingListId, sessionToken);

    expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId, masterProductPriceId);
  });
});

describe('read', () => {
  test('should reject if the provided shopping list Id does not exist', async () => {
    const shoppingListId = uuid();

    try {
      await ShoppingListService.read(shoppingListId, sessionToken);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });

  test('should read the existing shopping list', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedStoreInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);
    const shoppingListId = await ShoppingListService.create(expectedStoreInfo, acl);
    const shoppingListInfo = await ShoppingListService.read(shoppingListId, sessionToken);

    expectShoppingListInfo(shoppingListInfo, expectedStoreInfo, shoppingListId, stapleShoppingListId, masterProductPriceId);
  });
});

describe('update', () => {
  test('should reject if the provided shopping list Id does not exist', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const shoppingListId = uuid();

    try {
      await ShoppingListService.update(
        createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId).set('id', shoppingListId),
        sessionToken,
      );
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });

  test('should return the Id of the updated shopping list', async () => {
    const stapleShoppingListId1 = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId1 = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const stapleShoppingListId2 = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId2 = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const shoppingListId = await ShoppingListService.create(createShoppingListInfo(userId, stapleShoppingListId1, masterProductPriceId1), acl);
    const id = await ShoppingListService.update(
      createShoppingListInfo(userId, stapleShoppingListId2, masterProductPriceId2).set('id', shoppingListId),
      sessionToken,
    );

    expect(id).toBe(shoppingListId);
  });

  test('should update the existing shopping list', async () => {
    const stapleShoppingListId1 = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId1 = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedShoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId1, masterProductPriceId1);
    const stapleShoppingListId2 = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId2 = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const id = await ShoppingListService.create(createShoppingListInfo(userId, stapleShoppingListId2, masterProductPriceId2), acl);
    const shoppingListId = await ShoppingListService.update(expectedShoppingListInfo.set('id', id), sessionToken);
    const shoppingListInfo = await ShoppingListService.read(shoppingListId, sessionToken);

    expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId1, masterProductPriceId1);
  });
});

describe('delete', () => {
  test('should reject if the provided shopping list Id does not exist', async () => {
    const shoppingListId = uuid();

    try {
      await ShoppingListService.delete(shoppingListId, sessionToken);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });

  test('should delete the existing shopping list', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const shoppingListId = await ShoppingListService.create(createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId), acl);
    await ShoppingListService.delete(shoppingListId, sessionToken);

    try {
      await ShoppingListService.read(shoppingListId, sessionToken);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });
});

describe('search', () => {
  test('should return no shopping list if provided criteria matches no shopping list', async () => {
    const shoppingList = await ShoppingListService.search(createCriteria(), sessionToken);

    expect(shoppingList.count()).toBe(0);
  });

  test('should return the shopping lists matches the criteria', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedShoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);
    const shoppingListId = await ShoppingListService.create(expectedShoppingListInfo, acl);
    const shoppingListInfos = await ShoppingListService.search(
      createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo, stapleShoppingListId, masterProductPriceId),
      sessionToken,
    );

    expect(shoppingListInfos.count()).toBe(1);

    const shoppingListInfo = shoppingListInfos.first();
    expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId, masterProductPriceId);
  });
});

describe('searchAll', () => {
  test('should return no shopping list if provided criteria matches no shopping list', async () => {
    const result = ShoppingListService.searchAll(createCriteria(), sessionToken);
    let shoppingList = List();

    result.event.subscribe(info => (shoppingList = shoppingList.push(info)));

    try {
      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(shoppingList.count()).toBe(0);
  });

  test('should return the shopping list matches the criteria', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedShoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);

    await ShoppingListService.create(expectedShoppingListInfo, acl);
    await ShoppingListService.create(expectedShoppingListInfo, acl);

    const result = ShoppingListService.searchAll(
      createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo, stapleShoppingListId, masterProductPriceId),
      sessionToken,
    );
    let shoppingList = List();

    result.event.subscribe(info => (shoppingList = shoppingList.push(info)));

    try {
      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(shoppingList.count()).toBe(2);
  });
});

describe('exists', () => {
  test('should return false if no shopping list match provided criteria', async () => {
    const response = await ShoppingListService.exists(createCriteria(), sessionToken);

    expect(response).toBeFalsy();
  });

  test('should return true if any shopping list match provided criteria', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const shoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);

    await ShoppingListService.create(shoppingListInfo, acl);

    const response = await ShoppingListService.exists(
      createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo, stapleShoppingListId, masterProductPriceId),
      sessionToken,
    );

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no shopping list match provided criteria', async () => {
    const response = await ShoppingListService.count(createCriteria(), sessionToken);

    expect(response).toBe(0);
  });

  test('should return the count of shopping list match provided criteria', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId), acl);
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const shoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);

    await ShoppingListService.create(shoppingListInfo, acl);
    await ShoppingListService.create(shoppingListInfo, acl);

    const response = await ShoppingListService.count(createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo), sessionToken);

    expect(response).toBe(2);
  });
});
