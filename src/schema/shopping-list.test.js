import {
  Map,
  List,
} from 'immutable';
import uuid from 'uuid/v4';
import ShoppingList from './shopping-list';

export function createShoppingListInfo(userId) {
  return Map({
    userId: userId || uuid(),
    items: List.of(uuid(), uuid()),
  });
}

export function createShoppingList(shoppingListInfo) {
  return ShoppingList.spawn(shoppingListInfo || createShoppingListInfo());
}

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo) {
  expect(shoppingListInfo.get('userId'))
    .toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('items'))
    .toEqual(expectedShoppingListInfo.get('items'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createShoppingList()
        .className)
      .toBe('ShoppingList');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const shoppingListInfo = createShoppingListInfo();
    const object = createShoppingList(shoppingListInfo);
    const info = object.getInfo();

    expectShoppingListInfo(info, shoppingListInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = ShoppingList.spawn(createShoppingListInfo());

    expect(new ShoppingList(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createShoppingList();

    expect(new ShoppingList(object)
        .getId())
      .toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createShoppingList();
    const updatedStoreInfo = createShoppingListInfo();

    object.updateInfo(updatedStoreInfo);

    const info = object.getInfo();

    expectShoppingListInfo(info, updatedStoreInfo);
  });

  test('getInfo should return provided info', () => {
    const storeInfo = createShoppingListInfo();
    const object = createShoppingList(storeInfo);
    const info = object.getInfo();

    expect(info.get('id'))
      .toBe(object.getId());
    expectShoppingListInfo(info, storeInfo);
  });
});
