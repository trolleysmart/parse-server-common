// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { Store } from '../';

export function createStoreInfo() {
  return Map({
    key: uuid(),
    name: uuid(),
    imageUrl: uuid(),
  });
}

export function createStore(storeInfo) {
  return Store.spawn(storeInfo || createStoreInfo());
}

function expectStoreInfo(storeInfo, expectedStoreInfo) {
  expect(storeInfo.get('key')).toBe(expectedStoreInfo.get('key'));
  expect(storeInfo.get('name')).toBe(expectedStoreInfo.get('name'));
  expect(storeInfo.get('imageUrl')).toBe(expectedStoreInfo.get('imageUrl'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createStore().className).toBe('Store');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const storeInfo = createStoreInfo();
    const object = createStore(storeInfo);
    const info = object.getInfo();

    expectStoreInfo(info, storeInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = Store.spawn(createStoreInfo());

    expect(new Store(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createStore();

    expect(new Store(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createStore();
    const updatedStoreInfo = createStoreInfo();

    object.updateInfo(updatedStoreInfo);

    const info = object.getInfo();

    expectStoreInfo(info, updatedStoreInfo);
  });

  test('getInfo should return provided info', () => {
    const storeInfo = createStoreInfo();
    const object = createStore(storeInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreInfo(info, storeInfo);
  });
});
