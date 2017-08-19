// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { StapleShoppingList } from '../';

export function createStapleShoppingListInfo(userId, tagIds) {
  return Map({
    userId: userId || uuid(),
    name: uuid(),
    addedByUser: false,
  }).merge(tagIds ? Map({ tagIds }) : Map());
}

export function createStapleShoppingList(stapleShoppingListInfo) {
  return StapleShoppingList.spawn(stapleShoppingListInfo || createStapleShoppingListInfo());
}

function expectStapleShoppingListInfo(stapleShoppingListInfo, expectedStapleShoppingListInfo) {
  expect(stapleShoppingListInfo.get('userId')).toBe(expectedStapleShoppingListInfo.get('userId'));
  expect(stapleShoppingListInfo.get('name')).toBe(expectedStapleShoppingListInfo.get('name'));
  expect(stapleShoppingListInfo.get('addedByUser')).toBe(expectedStapleShoppingListInfo.get('addedByUser'));
  expect(stapleShoppingListInfo.get('tags')).toEqual(expectedStapleShoppingListInfo.get('tags'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createStapleShoppingList().className).toBe('StapleShoppingList');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const stapleShoppingListInfo = createStapleShoppingListInfo();
    const object = createStapleShoppingList(stapleShoppingListInfo);
    const info = object.getInfo();

    expectStapleShoppingListInfo(info, stapleShoppingListInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = StapleShoppingList.spawn(createStapleShoppingListInfo());

    expect(new StapleShoppingList(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createStapleShoppingList();

    expect(new StapleShoppingList(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createStapleShoppingList();
    const updatedStoreInfo = createStapleShoppingListInfo();

    object.updateInfo(updatedStoreInfo);

    const info = object.getInfo();

    expectStapleShoppingListInfo(info, updatedStoreInfo);
  });

  test('getInfo should return provided info', () => {
    const storeInfo = createStapleShoppingListInfo();
    const object = createStapleShoppingList(storeInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleShoppingListInfo(info, storeInfo);
  });
});
