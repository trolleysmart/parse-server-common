// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import { UserService } from 'micro-business-parse-server-common';
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
  expect(shoppingListInfo.get('stapleShoppingListDescription')).toBe(expectedShoppingListInfo.get('stapleShoppingListDescription'));
  expect(shoppingListInfo.get('masterProductDescription')).toBe(expectedShoppingListInfo.get('masterProductDescription'));
}

function createCriteria() {
  return Map({
    fields: List.of('user', 'doneDate', 'stapleShoppingList', 'masterProductPrice', 'stapleShoppingListDescription', 'masterProductDescription'),
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
    fields: List.of('user', 'doneDate', 'stapleShoppingList', 'masterProductPrice', 'stapleShoppingListDescription', 'masterProductDescription'),
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

beforeEach(async () => {
  const user = await UserService.signUpWithUsernameAndPassword(`${uuid()}@email.com`, '123456');

  userId = user.get('id');
});

describe('create', () => {
  test('should return the created shopping list Id', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const result = await ShoppingListService.create(createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId));

    expect(result).toBeDefined();
  });

  test('should create the shopping list', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedShoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);
    const shoppingListId = await ShoppingListService.create(expectedShoppingListInfo);
    const shoppingListInfo = await ShoppingListService.read(shoppingListId);

    expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId, masterProductPriceId);
  });
});

describe('read', () => {
  test('should reject if the provided shopping list Id does not exist', async () => {
    const shoppingListId = uuid();

    try {
      await ShoppingListService.read(shoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });

  test('should read the existing shopping list', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedStoreInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);
    const shoppingListId = await ShoppingListService.create(expectedStoreInfo);
    const shoppingListInfo = await ShoppingListService.read(shoppingListId);

    expectShoppingListInfo(shoppingListInfo, expectedStoreInfo, shoppingListId, stapleShoppingListId, masterProductPriceId);
  });
});

describe('update', () => {
  test('should reject if the provided shopping list Id does not exist', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const shoppingListId = uuid();

    try {
      await ShoppingListService.update(createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId).set('id', shoppingListId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });

  test('should return the Id of the updated shopping list', async () => {
    const stapleShoppingListId1 = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId1 = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const stapleShoppingListId2 = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId2 = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const shoppingListId = await ShoppingListService.create(createShoppingListInfo(userId, stapleShoppingListId1, masterProductPriceId1));
    const id = await ShoppingListService.update(
      createShoppingListInfo(userId, stapleShoppingListId2, masterProductPriceId2).set('id', shoppingListId),
    );

    expect(id).toBe(shoppingListId);
  });

  test('should update the existing shopping list', async () => {
    const stapleShoppingListId1 = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId1 = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedShoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId1, masterProductPriceId1);
    const stapleShoppingListId2 = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId2 = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const id = await ShoppingListService.create(createShoppingListInfo(userId, stapleShoppingListId2, masterProductPriceId2));
    const shoppingListId = await ShoppingListService.update(expectedShoppingListInfo.set('id', id));
    const shoppingListInfo = await ShoppingListService.read(shoppingListId);

    expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId1, masterProductPriceId1);
  });
});

describe('delete', () => {
  test('should reject if the provided shopping list Id does not exist', async () => {
    const shoppingListId = uuid();

    try {
      await ShoppingListService.delete(shoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });

  test('should delete the existing shopping list', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const shoppingListId = await ShoppingListService.create(createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId));
    await ShoppingListService.delete(shoppingListId);

    try {
      await ShoppingListService.read(shoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });
});

describe('search', () => {
  test('should return no shopping list if provided criteria matches no shopping list', async () => {
    const shoppingList = await ShoppingListService.search(createCriteria());

    expect(shoppingList.count()).toBe(0);
  });

  test('should return the shopping lists matches the criteria', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedShoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);
    const shoppingListId = await ShoppingListService.create(expectedShoppingListInfo);
    const shoppingListInfos = await ShoppingListService.search(
      createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo, stapleShoppingListId, masterProductPriceId),
    );

    expect(shoppingListInfos.count()).toBe(1);

    const shoppingListInfo = shoppingListInfos.first();
    expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId, stapleShoppingListId, masterProductPriceId);
  });
});

describe('searchAll', () => {
  test('should return no shopping list if provided criteria matches no shopping list', async () => {
    const result = ShoppingListService.searchAll(createCriteria());
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
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const expectedShoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);

    await ShoppingListService.create(expectedShoppingListInfo);
    await ShoppingListService.create(expectedShoppingListInfo);

    const result = ShoppingListService.searchAll(
      createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo, stapleShoppingListId, masterProductPriceId),
    );
    let shoppingList = List();

    result.event.subscribe(info => (shoppingList = shoppingList.push(info)));

    try {
      await result.promise;
    } finally {
      /* result.event.unsubscribeAll();*/
    }

    expect(shoppingList.count()).toBe(2);
  });
});

describe('exists', () => {
  test('should return false if no shopping list match provided criteria', async () => {
    const response = await ShoppingListService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any shopping list match provided criteria', async () => {
    const stapleShoppingListId = await StapleShoppingListService.create(createStapleShoppingListInfo(userId));
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo());
    const shoppingListInfo = createShoppingListInfo(userId, stapleShoppingListId, masterProductPriceId);

    await ShoppingListService.create(shoppingListInfo);

    const response = await ShoppingListService.exists(
      createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo, stapleShoppingListId, masterProductPriceId),
    );

    expect(response).toBeTruthy();
  });
});
