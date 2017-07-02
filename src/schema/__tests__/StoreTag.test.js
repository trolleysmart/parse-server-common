// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { StoreTag } from '../';

export function createStoreTagInfo(storeId, tagId) {
  const info = Map({
    key: uuid(),
    description: uuid(),
    weight: 1,
    url: uuid(),
  });

  const infoWithStore = storeId ? info.merge({ storeId }) : info;

  return tagId ? infoWithStore.merge({ tagId }) : infoWithStore;
}

export function createStoreTag(storeTagInfo) {
  return StoreTag.spawn(storeTagInfo || createStoreTagInfo());
}

function expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo) {
  expect(storeTagInfo.get('key')).toBe(expectedStoreTagInfo.get('key'));
  expect(storeTagInfo.get('description')).toBe(expectedStoreTagInfo.get('description'));
  expect(storeTagInfo.get('weight')).toBe(expectedStoreTagInfo.get('weight'));
  expect(storeTagInfo.get('url')).toBe(expectedStoreTagInfo.get('url'));
  expect(storeTagInfo.get('storeId')).toBe(expectedStoreTagInfo.get('storeId'));
  expect(storeTagInfo.get('tagId')).toBe(expectedStoreTagInfo.get('tagId'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createStoreTag().className).toBe('StoreTag');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const storeTagInfo = createStoreTagInfo();
    const object = createStoreTag(storeTagInfo);
    const info = object.getInfo();

    expectStoreTagInfo(info, storeTagInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = StoreTag.spawn(createStoreTagInfo());

    expect(new StoreTag(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createStoreTag();

    expect(new StoreTag(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createStoreTag();
    const updatedStoreTagInfo = createStoreTagInfo();

    object.updateInfo(updatedStoreTagInfo);

    const info = object.getInfo();

    expectStoreTagInfo(info, updatedStoreTagInfo);
  });

  test('getInfo should return provided info', () => {
    const storeTagInfo = createStoreTagInfo();
    const object = createStoreTag(storeTagInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreTagInfo(info, storeTagInfo);
  });
});
