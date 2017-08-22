// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StoreService } from '../';
import { createStoreInfo, expectStore } from '../../schema/__tests__/Store.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('key', 'name', 'imageUrl', 'address', 'phones', 'geoLocation', 'parentStore'),
    includeParentStore: true,
  });

const createCriteria = store =>
  Map({
    conditions: Map({
      key: store ? store.get('key') : uuid(),
      name: store ? store.get('name') : uuid(),
      imageUrl: store ? store.get('imageUrl') : uuid(),
      address: store ? store.get('address') : uuid(),
      phones: store ? store.get('phones') : Map({ business: chance.integer({ min: 1000000, max: 999999999 }).toString() }),
      near_geoLocation: store
        ? store.get('geoLocation')
        : ParseWrapperService.createGeoPoint({
          latitude: chance.floating({ min: 1, max: 20 }),
          longitude: chance.floating({ min: -30, max: -1 }),
        }),
      parentStoreId: store && store.get('parentStoreId') ? store.get('parentStoreId') : undefined,
    }),
  }).merge(createCriteriaWthoutConditions());

const createStores = async (count, useSameInfo = false, createParentStore = true) => {
  const parentStore = createParentStore ? await createStores(1, false, false) : undefined;
  let store;

  if (useSameInfo) {
    const { store: tempStore } = await createStoreInfo();

    store = tempStore;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalStore;

          if (useSameInfo) {
            finalStore = store;
          } else {
            const { store: tempStore } = await createStoreInfo();

            finalStore = tempStore;
          }

          return StoreService.read(
            await StoreService.create(createParentStore ? finalStore.merge(Map({ parentStoreId: parentStore.get('id') })) : finalStore),
            createCriteriaWthoutConditions(),
          );
        })
        .toArray(),
    ),
  );
};

export default createStores;

describe('create', () => {
  test('should return the created store Id', async () => {
    const storeId = await StoreService.create((await createStoreInfo()).store);

    expect(storeId).toBeDefined();
  });

  test('should create the store', async () => {
    const { store } = await createStoreInfo();
    const storeId = await StoreService.create(store);
    const fetchedStore = await StoreService.read(storeId, createCriteriaWthoutConditions());

    expect(fetchedStore).toBeDefined();
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
    const { store: parentStore } = await createStoreInfo();
    const parentStoreId = await StoreService.create(parentStore);
    const { store: expectedStore } = await createStoreInfo({ parentStoreId });
    const storeId = await StoreService.create(expectedStore);
    const store = await StoreService.read(storeId, createCriteriaWthoutConditions());

    expectStore(store, expectedStore);
  });
});

describe('update', () => {
  test('should reject if the provided store Id does not exist', async () => {
    const storeId = uuid();

    try {
      const store = await StoreService.read(await StoreService.create((await createStoreInfo()).store), createCriteriaWthoutConditions());

      await StoreService.update(store.set('id', storeId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store found with Id: ${storeId}`);
    }
  });

  test('should return the Id of the updated store', async () => {
    const { store: expectedStore } = await createStoreInfo();
    const storeId = await StoreService.create((await createStoreInfo()).store);
    const id = await StoreService.update(expectedStore.set('id', storeId));

    expect(id).toBe(storeId);
  });

  test('should update the existing store', async () => {
    const { store: parentStore } = await createStoreInfo();
    const parentStoreId = await StoreService.create(parentStore);
    const { store: expectedStore } = await createStoreInfo({ parentStoreId });
    const storeId = await StoreService.create((await createStoreInfo()).store);

    await StoreService.update(expectedStore.set('id', storeId));

    const store = await StoreService.read(storeId, createCriteriaWthoutConditions());

    expectStore(store, expectedStore);
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
    const storeId = await StoreService.create((await createStoreInfo()).store);
    await StoreService.delete(storeId);

    try {
      await StoreService.delete(storeId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store found with Id: ${storeId}`);
    }
  });
});

describe('search', () => {
  test('should return no store if provided criteria matches no store', async () => {
    const stores = await StoreService.search(createCriteria());

    expect(stores.count()).toBe(0);
  });

  test('should return the store matches the criteria', async () => {
    const { store: parentStore } = await createStoreInfo();
    const parentStoreId = await StoreService.create(parentStore);
    const { store: expectedStore } = await createStoreInfo({ parentStoreId });
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => StoreService.create(expectedStore)).toArray()),
    );
    const stores = await StoreService.search(createCriteria(expectedStore));

    expect(stores.count).toBe(results.count);
    stores.forEach((store) => {
      expect(results.find(_ => _.localeCompare(store.get('id')) === 0)).toBeDefined();
      expectStore(store, expectedStore);
    });
  });
});

describe('searchAll', () => {
  test('should return no store if provided criteria matches no store', async () => {
    let stores = List();
    const result = StoreService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        stores = stores.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stores.count()).toBe(0);
  });

  test('should return the store matches the criteria', async () => {
    const { store: parentStore } = await createStoreInfo();
    const parentStoreId = await StoreService.create(parentStore);
    const { store: expectedStore } = await createStoreInfo({ parentStoreId });
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => StoreService.create(expectedStore)).toArray()),
    );

    let stores = List();
    const result = StoreService.searchAll(createCriteria(expectedStore));

    try {
      result.event.subscribe((info) => {
        stores = stores.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stores.count).toBe(results.count);
    stores.forEach((store) => {
      expect(results.find(_ => _.localeCompare(store.get('id')) === 0)).toBeDefined();
      expectStore(store, expectedStore);
    });
  });
});

describe('exists', () => {
  test('should return false if no store match provided criteria', async () => {
    expect(await StoreService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any store match provided criteria', async () => {
    const stores = await createStores(chance.integer({ min: 1, max: 10 }), true);

    expect(await StoreService.exists(createCriteria(stores.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store match provided criteria', async () => {
    expect(await StoreService.count(createCriteria())).toBe(0);
  });

  test('should return the count of store match provided criteria', async () => {
    const stores = await createStores(chance.integer({ min: 1, max: 10 }), true);

    expect(await StoreService.count(createCriteria(stores.first()))).toBe(stores.count());
  });
});
