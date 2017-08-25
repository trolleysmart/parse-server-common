// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { StoreTag } from '../';
import createStores from '../../services/__tests__/StoreService.test';
import createTags from '../../services/__tests__/TagService.test';

export const createStoreTagInfo = async ({ parentStoreTagId } = {}) => {
  const chance = new Chance();
  const store = (await createStores(1)).first();
  const tag = (await createTags(1)).first();
  const storeTag = Map({
    key: uuid(),
    name: uuid(),
    description: uuid(),
    imageUrl: uuid(),
    url: uuid(),
    level: chance.integer({ min: 1, max: 1000 }),
    parentStoreTagId,
    storeId: store.get('id'),
    tagId: tag.get('id'),
  });

  return { storeTag, store, tag };
};

export const createStoreTag = async object => StoreTag.spawn(object || (await createStoreTagInfo()).storeTag);

export const expectStoreTag = (object, expectedObject, { storeTagId, expectedStore, expectedTag } = {}) => {
  expect(object.get('key')).toBe(expectedObject.get('key'));
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('url')).toBe(expectedObject.get('url'));
  expect(object.get('level')).toBe(expectedObject.get('level'));
  expect(object.get('parentStoreTagId')).toBe(expectedObject.get('parentStoreTagId'));
  expect(object.get('storeId')).toBe(expectedObject.get('storeId'));
  expect(object.get('tagId')).toBe(expectedObject.get('tagId'));

  if (storeTagId) {
    expect(object.get('id')).toBe(storeTagId);
  }

  if (expectedStore) {
    expect(object.get('store')).toEqual(expectedStore);
  }

  if (expectedTag) {
    expect(object.get('tag')).toEqual(expectedTag);
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createStoreTag()).className).toBe('StoreTag');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { storeTag } = await createStoreTagInfo();
    const object = await createStoreTag(storeTag);
    const info = object.getInfo();

    expectStoreTag(info, storeTag);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createStoreTag();

    expect(new StoreTag(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createStoreTag();

    expect(new StoreTag(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createStoreTag();
    const { storeTag: updatedStoreTag } = await createStoreTagInfo();

    object.updateInfo(updatedStoreTag);

    const info = object.getInfo();

    expectStoreTag(info, updatedStoreTag);
  });

  test('getInfo should return provided info', async () => {
    const { storeTag } = await createStoreTagInfo();
    const object = await createStoreTag(storeTag);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreTag(info, storeTag);
  });
});
