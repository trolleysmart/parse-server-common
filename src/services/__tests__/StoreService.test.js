// @flow

import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StoreService } from '../';
import { createStoreInfo } from '../../schema/__tests__/Store.test';

export const createStores = async count =>
  Immutable.fromJS(await Promise.all(Range(0, count).map(async () => StoreService.read(await StoreService.create(createStoreInfo()))).toArray()));

function expectStoreInfo(storeInfo, expectedStoreInfo, storeId) {
  expect(storeInfo.get('id')).toBe(storeId);
  expect(storeInfo.get('name')).toBe(expectedStoreInfo.get('name'));
  expect(storeInfo.get('imageUrl')).toBe(expectedStoreInfo.get('imageUrl'));
}

function createCriteria() {
  return Map({
    fields: List.of('key', 'name', 'imageUrl'),
    conditions: Map({
      key: uuid(),
      name: uuid(),
    }),
  });
}

function createCriteriaUsingProvidedStoreInfo(storeInfo) {
  return Map({
    fields: List.of('key', 'name', 'imageUrl'),
    conditions: Map({
      key: storeInfo.get('key'),
      name: storeInfo.get('name'),
    }),
  });
}

describe('create', () => {
  test('should return the created store Id', async () => {
    const result = await StoreService.create(createStoreInfo());

    expect(result).toBeDefined();
  });

  test('should create the store', async () => {
    const expectedStoreInfo = createStoreInfo();
    const storeId = await StoreService.create(expectedStoreInfo);
    const storeInfo = await StoreService.read(storeId);

    expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
  });
});

describe('read', () => {
  test('should reject if the provided store Id does not exist', async () => {
    const storeId = uuid();

    try {
      await StoreService.read(storeId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store found with Id: ${storeId}`);
    }
  });

  test('should read the existing store', async () => {
    const expectedStoreInfo = createStoreInfo();
    const storeId = await StoreService.create(expectedStoreInfo);
    const storeInfo = await StoreService.read(storeId);

    expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
  });
});

describe('update', () => {
  test('should reject if the provided store Id does not exist', async () => {
    const storeId = uuid();

    try {
      await StoreService.update(createStoreInfo().set('id', storeId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store found with Id: ${storeId}`);
    }
  });

  test('should return the Id of the updated store', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const id = await StoreService.update(createStoreInfo().set('id', storeId));

    expect(id).toBe(storeId);
  });

  test('should update the existing store', async () => {
    const expectedStoreInfo = createStoreInfo();
    const id = await StoreService.create(createStoreInfo());
    const storeId = await StoreService.update(expectedStoreInfo.set('id', id));
    const storeInfo = await StoreService.read(storeId);

    expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
  });
});

describe('delete', () => {
  test('should reject if the provided store Id does not exist', async () => {
    const storeId = uuid();

    try {
      await StoreService.delete(storeId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store found with Id: ${storeId}`);
    }
  });

  test('should delete the existing store', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    await StoreService.delete(storeId);

    try {
      await StoreService.read(storeId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store found with Id: ${storeId}`);
    }
  });
});

describe('search', () => {
  test('should return no store if provided criteria matches no store', async () => {
    const storeInfos = await StoreService.search(createCriteria());

    expect(storeInfos.count()).toBe(0);
  });

  test('should return the stores matches the criteria', async () => {
    const expectedStoreInfo = createStoreInfo();
    const storeId = await StoreService.create(expectedStoreInfo);
    const storeInfos = await StoreService.search(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));

    expect(storeInfos.count()).toBe(1);

    const storeInfo = storeInfos.first();
    expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
  });
});

describe('searchAll', () => {
  test('should return no store if provided criteria matches no store', async () => {
    const result = StoreService.searchAll(createCriteria());

    try {
      let stores = List();

      result.event.subscribe((info) => {
        stores = stores.push(info);
      });

      await result.promise;
      expect(stores.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the stores matches the criteria', async () => {
    const expectedStoreInfo = createStoreInfo();
    const storeId1 = await StoreService.create(expectedStoreInfo);
    const storeId2 = await StoreService.create(expectedStoreInfo);

    const result = StoreService.searchAll(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));
    try {
      let stores = List();

      result.event.subscribe((info) => {
        stores = stores.push(info);
      });

      await result.promise;
      expect(stores.count()).toBe(2);
      expect(stores.find(_ => _.get('id').localeCompare(storeId1) === 0)).toBeTruthy();
      expect(stores.find(_ => _.get('id').localeCompare(storeId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no store match provided criteria', async () => {
    const response = await StoreService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any store match provided criteria', async () => {
    const storeInfo = createStoreInfo();

    await StoreService.create(storeInfo);
    const response = StoreService.exists(createCriteriaUsingProvidedStoreInfo(storeInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store match provided criteria', async () => {
    const response = await StoreService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of store match provided criteria', async () => {
    const storeInfo = createStoreInfo();

    await StoreService.create(storeInfo);
    await StoreService.create(storeInfo);

    const response = await StoreService.count(createCriteriaUsingProvidedStoreInfo(storeInfo));

    expect(response).toBe(2);
  });
});
