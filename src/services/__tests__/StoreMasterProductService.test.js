// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { MasterProductService, StoreService, StoreMasterProductService, StoreTagService } from '../';
import { createStoreMasterProductInfo } from '../../schema/__tests__/StoreMasterProduct.test';
import { createStoreTagInfo } from '../../schema/__tests__/StoreTag.test';
import { createMasterProductInfo } from '../../schema/__tests__/MasterProduct.test';
import { createLightWeightStoreInfo } from '../../schema/__tests__/Store.test';

function expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId) {
  expect(storeMasterProductInfo.get('id')).toBe(storeMasterProductId);
  expect(storeMasterProductInfo.get('name')).toBe(expectedStoreMasterProductInfo.get('name'));
  expect(storeMasterProductInfo.get('description')).toBe(expectedStoreMasterProductInfo.get('description'));
  expect(storeMasterProductInfo.get('barcode')).toBe(expectedStoreMasterProductInfo.get('barcode'));
  expect(storeMasterProductInfo.get('productPageUrl')).toBe(expectedStoreMasterProductInfo.get('productPageUrl'));
  expect(storeMasterProductInfo.get('imageUrl')).toBe(expectedStoreMasterProductInfo.get('imageUrl'));
  expect(storeMasterProductInfo.get('size')).toBe(expectedStoreMasterProductInfo.get('size'));
  expect(storeMasterProductInfo.get('lastCrawlDateTime')).toBe(expectedStoreMasterProductInfo.get('lastCrawlDateTime'));
  expect(storeMasterProductInfo.get('storeTagIds')).toEqual(expectedStoreMasterProductInfo.get('storeTagIds'));
}

export function createCriteria() {
  return Map({
    fields: List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'lastCrawlDateTime', 'storeTags'),
    includeStoreTags: true,
    conditions: Map({
      name: uuid(),
      description: uuid(),
      barcode: uuid(),
      productPageUrl: uuid(),
      imageUrl: uuid(),
      size: uuid(),
      lastCrawlDateTime: new Date(),
    }),
  });
}

export function createCriteriaUsingProvidedStoreMasterProductInfo(storeMasterProductInfo) {
  return Map({
    fields: List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'lastCrawlDateTime', 'storeTags'),
    includeStoreTags: true,
    conditions: Map({
      name: storeMasterProductInfo.get('name'),
      description: storeMasterProductInfo.get('description'),
      barcode: storeMasterProductInfo.get('barcode'),
      productPageUrl: storeMasterProductInfo.get('productPageUrl'),
      imageUrl: storeMasterProductInfo.get('imageUrl'),
      size: storeMasterProductInfo.get('size'),
      lastCrawlDateTime: storeMasterProductInfo.get('lastCrawlDateTime'),
      storeTags: storeMasterProductInfo.get('storeTags'),
    }),
  });
}

describe('create', () => {
  test('should return the created store master product Id', async () => {
    const storeTagId1 = await StoreTagService.create(createStoreTagInfo());
    const storeTagId2 = await StoreTagService.create(createStoreTagInfo());
    const storeId = await StoreService.create(createLightWeightStoreInfo());
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const result = await StoreMasterProductService.create(createStoreMasterProductInfo(List.of(storeTagId1, storeTagId2), storeId, masterProductId));

    expect(result).toBeDefined();
  });

  test('should create the store master product', async () => {
    const storeTagId1 = await StoreTagService.create(createStoreTagInfo());
    const storeTagId2 = await StoreTagService.create(createStoreTagInfo());
    const storeId = await StoreService.create(createLightWeightStoreInfo());
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const expectedStoreMasterProductInfo = createStoreMasterProductInfo(List.of(storeTagId1, storeTagId2), storeId, masterProductId);
    const storeMasterProductId = await StoreMasterProductService.create(expectedStoreMasterProductInfo);
    const storeMasterProductInfo = await StoreMasterProductService.read(storeMasterProductId);

    expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId);
  });
});

describe('read', () => {
  test('should reject if the provided store master product Id does not exist', async () => {
    const storeMasterProductId = uuid();

    try {
      await StoreMasterProductService.read(storeMasterProductId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store master product found with Id: ${storeMasterProductId}`);
    }
  });

  test('should read the existing store master product', async () => {
    const storeTagId1 = await StoreTagService.create(createStoreTagInfo());
    const storeTagId2 = await StoreTagService.create(createStoreTagInfo());
    const storeId = await StoreService.create(createLightWeightStoreInfo());
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const expectedStoreMasterProductInfo = createStoreMasterProductInfo(List.of(storeTagId1, storeTagId2), storeId, masterProductId);
    const storeMasterProductId = await StoreMasterProductService.create(expectedStoreMasterProductInfo);
    const storeMasterProductInfo = await StoreMasterProductService.read(storeMasterProductId);

    expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId);
  });
});

describe('update', () => {
  test('should reject if the provided store master product Id does not exist', async () => {
    const storeMasterProductId = uuid();

    try {
      await StoreMasterProductService.update(createStoreMasterProductInfo().set('id', storeMasterProductId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store master product found with Id: ${storeMasterProductId}`);
    }
  });

  test('should return the Id of the updated store master product', async () => {
    const storeMasterProductId = await StoreMasterProductService.create(createStoreMasterProductInfo());
    const id = await StoreMasterProductService.update(createStoreMasterProductInfo().set('id', storeMasterProductId));

    expect(id).toBe(storeMasterProductId);
  });

  test('should update the existing store master product', async () => {
    const storeTagId1 = await StoreTagService.create(createStoreTagInfo());
    const storeTagId2 = await StoreTagService.create(createStoreTagInfo());
    const storeId = await StoreService.create(createLightWeightStoreInfo());
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const id = await StoreMasterProductService.create(createStoreMasterProductInfo());
    const expectedStoreMasterProductInfo = createStoreMasterProductInfo(List.of(storeTagId1, storeTagId2), storeId, masterProductId);
    const storeMasterProductId = await StoreMasterProductService.update(expectedStoreMasterProductInfo.set('id', id));
    const storeMasterProductInfo = await StoreMasterProductService.read(storeMasterProductId);

    expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId);
  });
});

describe('delete', () => {
  test('should reject if the provided store master product Id does not exist', async () => {
    const storeMasterProductId = uuid();

    try {
      await StoreMasterProductService.delete(storeMasterProductId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store master product found with Id: ${storeMasterProductId}`);
    }
  });

  test('should delete the existing store master product', async () => {
    const storeTagId1 = await StoreTagService.create(createStoreTagInfo());
    const storeTagId2 = await StoreTagService.create(createStoreTagInfo());
    const storeId = await StoreService.create(createLightWeightStoreInfo());
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeMasterProductInfo = createStoreMasterProductInfo(List.of(storeTagId1, storeTagId2), storeId, masterProductId);
    const storeMasterProductId = await StoreMasterProductService.create(storeMasterProductInfo);
    await StoreMasterProductService.delete(storeMasterProductId);

    try {
      await StoreMasterProductService.delete(storeMasterProductId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store master product found with Id: ${storeMasterProductId}`);
    }
  });
});

describe('search', () => {
  test('should return no store master product if provided criteria matches no store master product', async () => {
    const storeMasterProductInfos = await StoreMasterProductService.search(createCriteria());

    expect(storeMasterProductInfos.count()).toBe(0);
  });

  test('should return the store master products matches the criteria', async () => {
    const storeTagId1 = await StoreTagService.create(createStoreTagInfo());
    const storeTagId2 = await StoreTagService.create(createStoreTagInfo());
    const storeId = await StoreService.create(createLightWeightStoreInfo());
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const expectedStoreMasterProductInfo = createStoreMasterProductInfo(List.of(storeTagId1, storeTagId2), storeId, masterProductId);
    const storeMasterProductId = await StoreMasterProductService.create(expectedStoreMasterProductInfo);
    const storeMasterProductInfos = await StoreMasterProductService.search(
      createCriteriaUsingProvidedStoreMasterProductInfo(expectedStoreMasterProductInfo),
    );

    expect(storeMasterProductInfos.count()).toBe(1);

    const storeMasterProductInfo = storeMasterProductInfos.first();

    expectStoreMasterProductInfo(storeMasterProductInfo, expectedStoreMasterProductInfo, storeMasterProductId);
  });
});

describe('searchAll', () => {
  test('should return no store master product if provided criteria matches no store master product', async () => {
    const result = StoreMasterProductService.searchAll(createCriteria());

    try {
      let storeMasterProductInfos = List();

      result.event.subscribe((info) => {
        storeMasterProductInfos = storeMasterProductInfos.push(info);
      });

      await result.promise;
      expect(storeMasterProductInfos.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the store master products matches the criteria', async () => {
    const storeTagId1 = await StoreTagService.create(createStoreTagInfo());
    const storeTagId2 = await StoreTagService.create(createStoreTagInfo());
    const storeId = await StoreService.create(createLightWeightStoreInfo());
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const expectedStoreMasterProductInfo = createStoreMasterProductInfo(List.of(storeTagId1, storeTagId2), storeId, masterProductId);
    const storeMasterProductId1 = await StoreMasterProductService.create(expectedStoreMasterProductInfo);
    const storeMasterProductId2 = await StoreMasterProductService.create(expectedStoreMasterProductInfo);
    const result = StoreMasterProductService.searchAll(createCriteriaUsingProvidedStoreMasterProductInfo(expectedStoreMasterProductInfo));

    try {
      let storeMasterProductInfos = List();

      result.event.subscribe((info) => {
        storeMasterProductInfos = storeMasterProductInfos.push(info);
      });

      await result.promise;
      expect(storeMasterProductInfos.count()).toBe(2);
      expect(storeMasterProductInfos.find(_ => _.get('id').localeCompare(storeMasterProductId1) === 0)).toBeTruthy();
      expect(storeMasterProductInfos.find(_ => _.get('id').localeCompare(storeMasterProductId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no store master product match provided criteria', async () => {
    const response = await StoreMasterProductService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any store master product match provided criteria', async () => {
    const storeTagId1 = await StoreTagService.create(createStoreTagInfo());
    const storeTagId2 = await StoreTagService.create(createStoreTagInfo());
    const storeId = await StoreService.create(createLightWeightStoreInfo());
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeMasterProductInfo = createStoreMasterProductInfo(List.of(storeTagId1, storeTagId2), storeId, masterProductId);

    await StoreMasterProductService.create(storeMasterProductInfo);

    const response = await StoreMasterProductService.exists(createCriteriaUsingProvidedStoreMasterProductInfo(storeMasterProductInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store master product match provided criteria', async () => {
    const response = await StoreMasterProductService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of store master product match provided criteria', async () => {
    const storeTagId1 = await StoreTagService.create(createStoreTagInfo());
    const storeTagId2 = await StoreTagService.create(createStoreTagInfo());
    const storeId = await StoreService.create(createLightWeightStoreInfo());
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeMasterProductInfo = createStoreMasterProductInfo(List.of(storeTagId1, storeTagId2), storeId, masterProductId);

    await StoreMasterProductService.create(storeMasterProductInfo);
    await StoreMasterProductService.create(storeMasterProductInfo);

    const response = await StoreMasterProductService.count(createCriteriaUsingProvidedStoreMasterProductInfo(storeMasterProductInfo));

    expect(response).toBe(2);
  });
});
