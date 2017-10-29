// @flow

import Chance from 'chance';
import { List, Map } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import { Store } from '../';

export const createStoreInfo = async ({ parentStoreId } = {}) => {
  const chance = new Chance();
  const store = Map({
    key: uuid(),
    name: uuid(),
    imageUrl: uuid(),
    address: uuid(),
    phones: List.of(
      Map({ label: 'business', number: chance.integer({ min: 1000000, max: 999999999 }).toString() }),
      Map({ label: 'business', number: chance.integer({ min: 1000000, max: 999999999 }).toString() }),
    ),
    geoLocation: ParseWrapperService.createGeoPoint({
      latitude: chance.floating({ min: 1, max: 20 }),
      longitude: chance.floating({ min: -30, max: -1 }),
    }),
    openFrom: new Date(),
    openUntil: new Date(),
    parentStoreId,
  });

  return { store };
};

export const createStore = async object => Store.spawn(object || (await createStoreInfo()).store);

export const expectStore = (object, expectedObject) => {
  expect(object.get('key')).toBe(expectedObject.get('key'));
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('address')).toBe(expectedObject.get('address'));
  expect(object.get('phones')).toEqual(expectedObject.get('phones'));
  expect(object.get('geoLocation')).toEqual(expectedObject.get('geoLocation'));
  expect(object.get('openFrom')).toEqual(expectedObject.get('openFrom'));
  expect(object.get('openUntil')).toEqual(expectedObject.get('openUntil'));
  expect(object.get('parentStoreId')).toBe(expectedObject.get('parentStoreId'));
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createStore()).className).toBe('Store');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { store } = await createStoreInfo();
    const object = await createStore(store);
    const info = object.getInfo();

    expectStore(info, store);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createStore();

    expect(new Store(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createStore();

    expect(new Store(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createStore();
    const { store: updatedStore } = await createStoreInfo();

    object.updateInfo(updatedStore);

    const info = object.getInfo();

    expectStore(info, updatedStore);
  });

  test('getInfo should return provided info', async () => {
    const { store } = await createStoreInfo();
    const object = await createStore(store);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStore(info, store);
  });
});
