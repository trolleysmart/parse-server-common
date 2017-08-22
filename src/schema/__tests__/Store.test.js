// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import { Store } from '../';

export function createLightWeightStoreInfo() {
  const chance = new Chance();

  return Map({
    key: uuid(),
    name: uuid(),
    imageUrl: uuid(),
    address: uuid(),
    phones: Map({ business: '021147258' }),
    geoLocation: ParseWrapperService.createGeoPoint({
      latitude: chance.floating({ min: 1, max: 20 }),
      longitude: chance.floating({ min: -30, max: -1 }),
    }),
  });
}

export function createStore(store) {
  return Store.spawn(store || createLightWeightStoreInfo());
}

function expectStoreInfo(store, expectedStore) {
  expect(store.get('key')).toBe(expectedStore.get('key'));
  expect(store.get('name')).toBe(expectedStore.get('name'));
  expect(store.get('imageUrl')).toBe(expectedStore.get('imageUrl'));
  expect(store.get('address')).toBe(expectedStore.get('address'));
  expect(store.get('phones')).toEqual(expectedStore.get('phones'));
  expect(store.get('geoLocation')).toBe(expectedStore.get('geoLocation'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createStore().className).toBe('Store');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const store = createLightWeightStoreInfo();
    const object = createStore(store);
    const info = object.getInfo();

    expectStoreInfo(info, store);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = Store.spawn(createLightWeightStoreInfo());

    expect(new Store(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createStore();

    expect(new Store(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createStore();
    const updatedStore = createLightWeightStoreInfo();

    object.updateInfo(updatedStore);

    const info = object.getInfo();

    expectStoreInfo(info, updatedStore);
  });

  test('getInfo should return provided info', () => {
    const store = createLightWeightStoreInfo();
    const object = createStore(store);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreInfo(info, store);
  });
});
