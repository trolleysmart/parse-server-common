// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { MasterProductService, MasterProductPriceService, StoreService } from '../';
import { createMasterProductInfo } from '../../schema/__tests__/MasterProduct.test';
import { createMasterProductPriceInfo } from '../../schema/__tests__/MasterProductPrice.test';
import { createStoreInfo } from '../../schema/__tests__/Store.test';

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId) {
  expect(masterProductPriceInfo.get('id')).toBe(masterProductPriceId);
  expect(masterProductPriceInfo.get('masterProductId')).toBe(masterProductId);
  expect(masterProductPriceInfo.get('description')).toEqual(expectedMasterProductPriceInfo.get('description'));
  expect(masterProductPriceInfo.get('storeId')).toBe(storeId);
  expect(masterProductPriceInfo.get('storeName')).toEqual(expectedMasterProductPriceInfo.get('storeName'));
  expect(masterProductPriceInfo.get('priceDetails')).toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
  expect(masterProductPriceInfo.get('capturedDate')).toEqual(expectedMasterProductPriceInfo.get('capturedDate'));
}

export function createCriteria() {
  return Map({
    fields: List.of('masterProduct', 'store', 'storeName', 'priceDetails', 'description', 'capturedDate'),
    includeStore: true,
    includeMasterProduct: true,
    conditions: Map({
      masterProductId: uuid(),
      storeId: uuid(),
    }),
  });
}

export function createCriteriaUsingProvidedMasterProductPriceInfo(masterProductPriceInfo, masterProductId, storeId) {
  return Map({
    fields: List.of('masterProduct', 'store', 'storeName', 'priceDetails', 'description', 'capturedDate'),
    includeStore: true,
    includeMasterProduct: true,
    conditions: Map({
      masterProductId,
      storeId,
    }),
  });
}

describe('create', () => {
  test('should return the created master product price Id', async () => {
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeId = await StoreService.create(createStoreInfo());
    const result = await MasterProductPriceService.create(createMasterProductPriceInfo(masterProductId, storeId));

    expect(result).toBeDefined();
  });

  test('should create the master product price', async () => {
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeId = await StoreService.create(createStoreInfo());
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);
    const masterProductPriceId = await MasterProductPriceService.create(expectedMasterProductPriceInfo);
    const masterProductPriceInfo = await MasterProductPriceService.read(masterProductPriceId);

    expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId);
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
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeId = await StoreService.create(createStoreInfo());
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);
    const masterProductPriceId = await MasterProductPriceService.create(expectedMasterProductPriceInfo);
    const masterProductPriceInfo = await MasterProductPriceService.read(masterProductPriceId);

    expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId);
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
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeId = await StoreService.create(createStoreInfo());
    const expectedMasterProductId = await MasterProductService.create(createMasterProductInfo());
    const expectedStoreId = await StoreService.create(createStoreInfo());
    const masterProductPriceId = await MasterProductPriceService.create(createMasterProductPriceInfo(masterProductId, storeId));
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(expectedMasterProductId, expectedStoreId);
    await MasterProductPriceService.update(expectedMasterProductPriceInfo.set('id', masterProductPriceId));
    const masterProductPriceInfo = await MasterProductPriceService.read(masterProductPriceId);

    expectMasterProductPriceInfo(
      masterProductPriceInfo,
      expectedMasterProductPriceInfo,
      masterProductPriceId,
      expectedMasterProductId,
      expectedStoreId,
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
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const storeId = await StoreService.create(createStoreInfo());
    const expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);
    const masterProductPriceId = await MasterProductPriceService.create(expectedMasterProductPriceInfo);
    const masterProductPriceInfos = await MasterProductPriceService.search(
      createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProductId, storeId),
    );

    expect(masterProductPriceInfos.size).toBe(1);

    const masterProductPriceInfo = masterProductPriceInfos.first();

    expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId);
  });
});

describe('searchAll', () => {
  test('should return no master product price if provided criteria matches no master product price', async () => {
    const result = MasterProductPriceService.searchAll(createCriteria());

    try {
      let masterProductPrices = List();

      result.event.subscribe(info => (masterProductPrices = masterProductPrices.push(info)));

      await result.promise;
      expect(masterProductPrices.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the master products price matches the criteria', (done) => {
    let masterProductId;
    let storeId;
    let expectedMasterProductPriceInfo;

    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        masterProductId = results[0];
        storeId = results[1];
        expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);

        return Promise.all([
          MasterProductPriceService.create(expectedMasterProductPriceInfo),
          MasterProductPriceService.create(expectedMasterProductPriceInfo),
        ]);
      })
      .then((ids) => {
        const masterProductPriceIds = List.of(ids[0], ids[1]);
        const result = MasterProductPriceService.searchAll(
          createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProductId, storeId),
        );
        let masterProductPrices = List();

        result.event.subscribe((masterProductPrice) => {
          masterProductPrices = masterProductPrices.push(masterProductPrice);
        });
        result.promise
          .then(() => {
            result.event.unsubscribeAll();
            expect(masterProductPrices.size).toBe(masterProductPriceIds.size);
            done();
          })
          .catch((error) => {
            result.event.unsubscribeAll();
            fail(error);
            done();
          });
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('exists', () => {
  test('should return false if no master product price match provided criteria', (done) => {
    MasterProductPriceService.exists(createCriteria())
      .then((response) => {
        expect(response).toBeFalsy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return true if any master product price match provided criteria', (done) => {
    let expectedMasterProductPriceInfo;
    let masterProductId;
    let storeId;

    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        masterProductId = results[0];
        storeId = results[1];

        expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);

        return MasterProductPriceService.create(expectedMasterProductPriceInfo);
      })
      .then(() =>
        MasterProductPriceService.exists(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo, masterProductId, storeId)),
      )
      .then((response) => {
        expect(response).toBeTruthy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});
