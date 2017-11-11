// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StoreService } from '../';
import { createStoreInfo, expectStore } from '../../schema/__tests__/Store.test';

const chance = new Chance();
const storeService = new StoreService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of(

      'key',
      'name',
      'imageUrl',
      'address',
      'phones',
      'geoLocation',
      'openFrom',
      'openUntil',
      'forDisplay',
      'parentStore',
      'ownedByUser',
      'maintainedByUsers',
      'status',
    ),
    include_parentStore: true,
    include_ownedByUser: true,
    include_maintainedByUsers: true,
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
      openFrom: store ? store.get('openFrom') : new Date(),
      openUntil: store ? store.get('openUntil') : new Date(),
      forDisplay: store ? store.get('forDisplay') : chance.integer({ min: 1, max: 1000 }) % 2 === 0,
      parentStoreId: store && store.get('parentStoreId') ? store.get('parentStoreId') : undefined,
      ownedByUserId: store ? store.get('ownedByUserId') : uuid(),
      maintainedByUserIds: store ? store.get('maintainedByUserIds') : List.of(uuid(), uuid()),
      status: store ? store.get('status') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createStores = async (count, useSameInfo = false, createParentStore = true) => {
  const parentStore = createParentStore ? await createStores(1, false, false) : undefined;
  let store;

  if (useSameInfo) {
    const { store: tempStore } = await createStoreInfo();

    store = tempStore;
  }

  return Immutable.fromJS(await Promise.all(Range(0, count)
    .map(async () => {
      let finalStore;

      if (useSameInfo) {
        finalStore = store;
      } else {
        const { store: tempStore } = await createStoreInfo();

        finalStore = tempStore;
      }

      return storeService.read(
        await storeService.create(createParentStore ? finalStore.merge(Map({ parentStoreId: parentStore.get('id') })) : finalStore),
        createCriteriaWthoutConditions(),
      );
    })
    .toArray()));
};

export default createStores;

describe('create', () => {
  test('should return the created store Id', async () => {
    const storeId = await storeService.create((await createStoreInfo()).store);

    expect(storeId).toBeDefined();
  });

  test('should create the store', async () => {
    const { store } = await createStoreInfo();
    const storeId = await storeService.create(store);
    const fetchedStore = await storeService.read(storeId, createCriteriaWthoutConditions());

    expect(fetchedStore).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided store Id does not exist', async () => {
    const storeId = uuid();

    try {
      await storeService.read(storeId);
    } catch (ex) {
      expect(ex.message).toBe(`No store found with Id: ${storeId}`);
    }
  });

  test('should read the existing store', async () => {
    const { store: parentStore } = await createStoreInfo();
    const parentStoreId = await storeService.create(parentStore);
    const {
      store: expectedStore,
      ownedByUser: expectedOwnedByUser,
      maintainedByUsers: expectedMaintainedByUsers,
    } = await createStoreInfo({ parentStoreId });
    const storeId = await storeService.create(expectedStore);
    const store = await storeService.read(storeId, createCriteriaWthoutConditions());

    expectStore(store, expectedStore, { expectedOwnedByUser, expectedMaintainedByUsers });
  });
});

describe('update', () => {
  test('should reject if the provided store Id does not exist', async () => {
    const storeId = uuid();

    try {
      const store = await storeService.read(await storeService.create((await createStoreInfo()).store), createCriteriaWthoutConditions());

      await storeService.update(store.set('id', storeId));
    } catch (ex) {
      expect(ex.message).toBe(`No store found with Id: ${storeId}`);
    }
  });

  test('should return the Id of the updated store', async () => {
    const { store: expectedStore } = await createStoreInfo();
    const storeId = await storeService.create((await createStoreInfo()).store);
    const id = await storeService.update(expectedStore.set('id', storeId));

    expect(id).toBe(storeId);
  });

  test('should update the existing store', async () => {
    const { store: parentStore } = await createStoreInfo();
    const parentStoreId = await storeService.create(parentStore);
    const {
      store: expectedStore,
      ownedByUser: expectedOwnedByUser,
      maintainedByUsers: expectedMaintainedByUsers,
    } = await createStoreInfo({ parentStoreId });
    const storeId = await storeService.create((await createStoreInfo()).store);

    await storeService.update(expectedStore.set('id', storeId));

    const store = await storeService.read(storeId, createCriteriaWthoutConditions());

    expectStore(store, expectedStore, { expectedOwnedByUser, expectedMaintainedByUsers });
  });
});

describe('delete', () => {
  test('should reject if the provided store Id does not exist', async () => {
    const storeId = uuid();

    try {
      await storeService.delete(storeId);
    } catch (ex) {
      expect(ex.message).toBe(`No store found with Id: ${storeId}`);
    }
  });

  test('should delete the existing store', async () => {
    const storeId = await storeService.create((await createStoreInfo()).store);
    await storeService.delete(storeId);

    try {
      await storeService.delete(storeId);
    } catch (ex) {
      expect(ex.message).toBe(`No store found with Id: ${storeId}`);
    }
  });
});

describe('search', () => {
  test('should return no store if provided criteria matches no store', async () => {
    const stores = await storeService.search(createCriteria());

    expect(stores.count()).toBe(0);
  });

  test('should return the store matches the criteria', async () => {
    const { store: parentStore } = await createStoreInfo();
    const parentStoreId = await storeService.create(parentStore);
    const {
      store: expectedStore,
      ownedByUser: expectedOwnedByUser,
      maintainedByUsers: expectedMaintainedByUsers,
    } = await createStoreInfo({ parentStoreId });
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => storeService.create(expectedStore))
      .toArray()));
    const stores = await storeService.search(createCriteria(expectedStore));

    expect(stores.count).toBe(results.count);
    stores.forEach((store) => {
      expect(results.find(_ => _.localeCompare(store.get('id')) === 0)).toBeDefined();
      expectStore(store, expectedStore, { expectedOwnedByUser, expectedMaintainedByUsers });
    });
  });
});

describe('searchAll', () => {
  test('should return no store if provided criteria matches no store', async () => {
    let stores = List();
    const result = storeService.searchAll(createCriteria());

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
    const parentStoreId = await storeService.create(parentStore);
    const {
      store: expectedStore,
      ownedByUser: expectedOwnedByUser,
      maintainedByUsers: expectedMaintainedByUsers,
    } = await createStoreInfo({ parentStoreId });
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => storeService.create(expectedStore))
      .toArray()));

    let stores = List();
    const result = storeService.searchAll(createCriteria(expectedStore));

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
      expectStore(store, expectedStore, { expectedOwnedByUser, expectedMaintainedByUsers });
    });
  });
});

describe('exists', () => {
  test('should return false if no store match provided criteria', async () => {
    expect(await storeService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any store match provided criteria', async () => {
    const stores = await createStores(chance.integer({ min: 1, max: 10 }), true);

    expect(await storeService.exists(createCriteria(stores.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store match provided criteria', async () => {
    expect(await storeService.count(createCriteria())).toBe(0);
  });

  test('should return the count of store match provided criteria', async () => {
    const stores = await createStores(chance.integer({ min: 1, max: 10 }), true);

    expect(await storeService.count(createCriteria(stores.first()))).toBe(stores.count());
  });
});
