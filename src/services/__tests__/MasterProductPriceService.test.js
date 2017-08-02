// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { MasterProductService, MasterProductPriceService, StoreService, TagService } from '../';
import { createMasterProductInfo } from '../../schema/__tests__/MasterProduct.test';
import { createMasterProductPriceInfo } from '../../schema/__tests__/MasterProductPrice.test';
import { createStoreInfo } from '../../schema/__tests__/Store.test';
import { createTagInfo } from '../../schema/__tests__/Tag.test';

function expectMasterProductPriceInfo(
  masterProductPriceInfo,
  expectedMasterProductPriceInfo,
  masterProductPriceId,
  masterProductId,
  storeId,
  tagIds,
) {
  expect(masterProductPriceInfo.get('id')).toBe(masterProductPriceId);
  expect(masterProductPriceInfo.get('name')).toEqual(expectedMasterProductPriceInfo.get('name'));
  expect(masterProductPriceInfo.get('description')).toEqual(expectedMasterProductPriceInfo.get('description'));
  expect(masterProductPriceInfo.get('storeName')).toEqual(expectedMasterProductPriceInfo.get('storeName'));
  expect(masterProductPriceInfo.get('priceDetails')).toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
  expect(masterProductPriceInfo.get('priceToDisplay')).toEqual(expectedMasterProductPriceInfo.get('priceToDisplay'));
  expect(masterProductPriceInfo.get('saving')).toEqual(expectedMasterProductPriceInfo.get('saving'));
  expect(masterProductPriceInfo.get('savingPercentage')).toEqual(expectedMasterProductPriceInfo.get('savingPercentage'));
  expect(masterProductPriceInfo.get('offerEndDate')).toEqual(expectedMasterProductPriceInfo.get('offerEndDate'));
  expect(masterProductPriceInfo.get('firstCrawledDate')).toEqual(expectedMasterProductPriceInfo.get('firstCrawledDate'));
  expect(masterProductPriceInfo.get('status')).toEqual(expectedMasterProductPriceInfo.get('status'));
  expect(masterProductPriceInfo.get('masterProductId')).toBe(masterProductId);
  expect(masterProductPriceInfo.get('storeId')).toBe(storeId);
  expect(masterProductPriceInfo.get('tagIds')).toEqual(tagIds);
}

export function createCriteria() {
  return Map({
    fields: List.of(
      'name',
      'description',
      'storeName',
      'priceDetails',
      'priceToDisplay',
      'saving',
      'savingPercentage',
      'offerEndDate',
      'firstCrawledDate',
      'status',
      'masterProduct',
      'store',
      'tags',
    ),
    includeStore: true,
    includeMasterProduct: true,
    conditions: Map({
      masterProductId: uuid(),
      storeId: uuid(),
      tagIds: List.of(uuid(), uuid()),
    }),
  });
}

export function createCriteriaUsingProvidedMasterProductPriceInfo(masterProductPriceInfo, masterProduct, store) {
  return Map({
    fields: List.of(
      'name',
      'description',
      'storeName',
      'priceDetails',
      'priceToDisplay',
      'saving',
      'savingPercentage',
      'offerEndDate',
      'firstCrawledDate',
      'status',
      'masterProduct',
      'store',
      'tags',
    ),
    includeStore: true,
    includeMasterProduct: true,
    conditions: Map({
      name: masterProduct.get('name'),
      description: masterProduct.get('description'),
      storeName: store.get('name'),
      priceToDisplay: masterProductPriceInfo.get('priceToDisplay'),
      saving: masterProductPriceInfo.get('saving'),
      savingPercentage: masterProductPriceInfo.get('savingPercentage'),
      offerEndDate: masterProductPriceInfo.get('offerEndDate'),
      firstCrawledDate: masterProductPriceInfo.get('firstCrawledDate'),
      status: masterProductPriceInfo.get('status'),
      masterProductId: masterProduct.get('id'),
      storeId: store.get('id'),
      tagIds: masterProduct.get('tagIds'),
    }),
  });
}

describe('create', () => {
  test('should return the created master product price Id', async () => {
    const tagIds = List.of(await TagService.create(createTagInfo()));
    const masterProduct = createMasterProductInfo(tagIds);
    const masterProductId = await MasterProductService.create(masterProduct);
    const store = createStoreInfo();
    const storeId = await StoreService.create(store);
    const result = await MasterProductPriceService.create(createMasterProductPriceInfo(masterProductId, storeId, masterProduct, store, tagIds));

    expect(result).toBeDefined();
  });

  test('should create the master product price', async () => {
    const tagIds = List.of(await TagService.create(createTagInfo()));
    const masterProduct = createMasterProductInfo(tagIds);
    const masterProductId = await MasterProductService.create(masterProduct);
    const store = createStoreInfo();
    const storeId = await StoreService.create(store);
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId, masterProduct, store, tagIds);
    const masterProductPriceId = await MasterProductPriceService.create(expectedMasterProductPriceInfo);
    const masterProductPriceInfo = await MasterProductPriceService.read(masterProductPriceId);

    expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId, tagIds);
  });
});

describe('read', () => {
  test('should reject if the provided master product price Id does not exist', async () => {
    const masterProductPriceId = uuid();

    try {
      await MasterProductPriceService.read(masterProductPriceId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No master product price found with Id: ${masterProductPriceId}`);
    }
  });

  test('should read the existing master product price', async () => {
    const tagIds = List.of(await TagService.create(createTagInfo()));
    const masterProduct = createMasterProductInfo(tagIds);
    const masterProductId = await MasterProductService.create(masterProduct);
    const store = createStoreInfo();
    const storeId = await StoreService.create(store);
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId, masterProduct, store, tagIds);
    const masterProductPriceId = await MasterProductPriceService.create(expectedMasterProductPriceInfo);
    const masterProductPriceInfo = await MasterProductPriceService.read(masterProductPriceId);

    expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId, tagIds);
  });
});

describe('update', () => {
  test('should reject if the provided master product price Id does not exist', async () => {
    const masterProductPriceId = uuid();

    try {
      await MasterProductPriceService.update(createMasterProductPriceInfo().set('id', masterProductPriceId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No master product price found with Id: ${masterProductPriceId}`);
    }
  });

  test('should return the Id of the updated master product price', async () => {
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeId = await StoreService.create(createStoreInfo());
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo(masterProductId, storeId));
    const id = await MasterProductPriceService.update(createMasterProductPriceInfo().set('id', masterProductPriceId));

    expect(id).toBe(masterProductPriceId);
  });

  test('should update the existing master product price', async () => {
    const tagIds = List.of(await TagService.create(createTagInfo()));
    const masterProduct = createMasterProductInfo(tagIds);
    const masterProductId = await MasterProductService.create(masterProduct);
    const storeId = await StoreService.create(createStoreInfo());
    const expectedMasterProductId = await MasterProductService.create(createMasterProductInfo());
    const store = createStoreInfo();
    const expectedStoreId = await StoreService.create(store);
    const masterProductPriceId = await MasterProductPriceService.create(
      createMasterProductPriceInfo(masterProductId, storeId, masterProduct, store, tagIds),
    );
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(expectedMasterProductId, expectedStoreId);
    await MasterProductPriceService.update(expectedMasterProductPriceInfo.set('id', masterProductPriceId));
    const masterProductPriceInfo = await MasterProductPriceService.read(masterProductPriceId);

    expectMasterProductPriceInfo(
      masterProductPriceInfo,
      expectedMasterProductPriceInfo,
      masterProductPriceId,
      expectedMasterProductId,
      expectedStoreId,
      tagIds,
    );
  });
});

describe('delete', () => {
  test('should reject if the provided master product price Id does not exist', async () => {
    const masterProductPriceId = uuid();

    try {
      await MasterProductPriceService.delete(masterProductPriceId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No master product price found with Id: ${masterProductPriceId}`);
    }
  });

  test('should delete the existing master product price', async () => {
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeId = await StoreService.create(createStoreInfo());
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);
    const masterProductPriceId = await MasterProductPriceService.create(expectedMasterProductPriceInfo);
    await MasterProductPriceService.delete(masterProductPriceId);

    try {
      await MasterProductPriceService.read(masterProductPriceId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No master product price found with Id: ${masterProductPriceId}`);
    }
  });
});

describe('search', () => {
  test('should return no master product price if provided criteria matches no master product price', async () => {
    const masterProductPriceInfos = await MasterProductPriceService.search(createCriteria());

    expect(masterProductPriceInfos.count()).toBe(0);
  });

  test('should return the master products price matches the criteria', async () => {
    const tagIds = List.of(await TagService.create(createTagInfo()));
    const masterProduct = createMasterProductInfo(tagIds);
    const masterProductId = await MasterProductService.create(masterProduct);
    const store = createStoreInfo();
    const storeId = await StoreService.create(store);
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId, masterProduct, store, tagIds);
    const masterProductPriceId = await MasterProductPriceService.create(expectedMasterProductPriceInfo);
    const masterProductPriceInfos = await MasterProductPriceService.search(
      createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProduct, store),
    );

    expect(masterProductPriceInfos.count()).toBe(1);

    const masterProductPriceInfo = masterProductPriceInfos.first();

    expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId, tagIds);
  });
});

describe('searchAll', () => {
  test('should return no master product price if provided criteria matches no master product price', async () => {
    let masterProductPrices = List();
    const result = MasterProductPriceService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        masterProductPrices = masterProductPrices.push(info);
      });

      await result.promise;
      expect(masterProductPrices.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the master products price matches the criteria', async () => {
    const masterProduct = createMasterProductInfo();
    const masterProductId = await MasterProductService.create(masterProduct);
    const store = createStoreInfo();
    const storeId = await StoreService.create(store);
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId, masterProduct, store);
    const masterProductPriceId1 = await MasterProductPriceService.create(expectedMasterProductPriceInfo);
    const masterProductPriceId2 = await MasterProductPriceService.create(expectedMasterProductPriceInfo);

    let masterProductPrices = List();
    const result = MasterProductPriceService.searchAll(
      createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProduct, store),
    );

    try {
      result.event.subscribe((info) => {
        masterProductPrices = masterProductPrices.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }
    expect(masterProductPrices.count()).toBe(2);
    expect(masterProductPrices.find(_ => _.get('id') === masterProductPriceId1)).toBeTruthy();
    expect(masterProductPrices.find(_ => _.get('id') === masterProductPriceId2)).toBeTruthy();
  });
});

describe('exists', () => {
  test('should return false if no master product price match provided criteria', async () => {
    const response = await MasterProductPriceService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any master product price match provided criteria', async () => {
    const masterProduct = createMasterProductInfo();
    const masterProductId = await MasterProductService.create(masterProduct);
    const store = createStoreInfo();
    const storeId = await StoreService.create(store);
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId, masterProduct, store);

    await MasterProductPriceService.create(expectedMasterProductPriceInfo);

    const response = await MasterProductPriceService.exists(
      createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProduct, store),
    );
    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no master product price match provided criteria', async () => {
    const response = await MasterProductPriceService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of master product price match provided criteria', async () => {
    const masterProduct = createMasterProductInfo();
    const masterProductId = await MasterProductService.create(masterProduct);
    const store = createStoreInfo();
    const storeId = await StoreService.create(store);
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId, masterProduct, store);

    await MasterProductPriceService.create(expectedMasterProductPriceInfo);
    await MasterProductPriceService.create(expectedMasterProductPriceInfo);

    const response = await MasterProductPriceService.count(
      createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProduct, store),
    );
    expect(response).toBe(2);
  });
});
