// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { ShoppingListItem } from '../';
import createProductPrices from '../../services/__tests__/ProductPriceService.test';
import createStapleItems from '../../services/__tests__/StapleItemService.test';
import createStores from '../../services/__tests__/StoreService.test';
import createShoppingLists from '../../services/__tests__/ShoppingListService.test';
import createTags from '../../services/__tests__/TagService.test';

const chance = new Chance();

export const createShoppingListItemInfo = async () => {
  const shoppingList = (await createShoppingLists(1)).first();
  const productPrice = (await createProductPrices(1)).first();
  const stapleItem = (await createStapleItems(1)).first();
  const store = (await createStores(1)).first();
  const tags = await createTags(chance.integer({ min: 1, max: 10 }));
  const username = `${uuid()}@email.com`;
  const user = ParseWrapperService.createNewUser();

  user.setUsername(username);
  user.setPassword('123456');

  const userSignUpResult = await user.signUp();
  const shoppingListItem = Map({
    name: uuid(),
    description: uuid(),
    imageUrl: uuid(),
    userId: userSignUpResult.id,
    shoppingListId: shoppingList.get('id'),
    productPricesId: productPrice.get('id'),
    stapleItemId: stapleItem.get('id'),
    storeId: store.get('id'),
    tagIds: tags.map(tag => tag.get('id')),
  });

  return { shoppingListItem, user: userSignUpResult, shoppingList, productPrice, stapleItem, store, tags };
};

export const createShoppingListItem = async object => ShoppingListItem.spawn(object || (await createShoppingListItemInfo()).shoppingListItem);

export const expectShoppingListItem = (
  object,
  expectedObject,
  { shoppingListItemId, expectedShoppingList, expectedProductPrice, expectedStapleItem, expectedStore, expectedTags, expectedUser } = {},
) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('userId')).toBe(expectedObject.get('userId'));
  expect(object.get('shoppingListId')).toBe(expectedObject.get('shoppingListId'));
  expect(object.get('productPriceId')).toBe(expectedObject.get('productPriceId'));
  expect(object.get('stapleItemId')).toBe(expectedObject.get('stapleItemId'));
  expect(object.get('storeId')).toBe(expectedObject.get('storeId'));
  expect(object.get('tagIds')).toEqual(expectedObject.get('tagIds'));

  if (shoppingListItemId) {
    expect(object.get('id')).toBe(shoppingListItemId);
  }

  if (expectedUser) {
    expect(object.get('user').id).toEqual(expectedUser.id);
    expect(object.get('user').username).toEqual(expectedUser.username);
  }

  if (expectedShoppingList) {
    expect(object.get('shoppingList')).toEqual(expectedShoppingList);
  }

  if (expectedProductPrice) {
    expect(object.get('productPrice')).toEqual(expectedProductPrice);
  }

  if (expectedStapleItem) {
    expect(object.get('stapleItem')).toEqual(expectedStapleItem);
  }

  if (expectedStore) {
    expect(object.get('store')).toEqual(expectedStore);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createShoppingListItem()).className).toBe('ShoppingListItem');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { shoppingListItem } = await createShoppingListItemInfo();
    const object = await createShoppingListItem(shoppingListItem);
    const info = object.getInfo();

    expectShoppingListItem(info, shoppingListItem);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createShoppingListItem();

    expect(new ShoppingListItem(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createShoppingListItem();

    expect(new ShoppingListItem(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createShoppingListItem();
    const { shoppingListItem: updatedShoppingListItem } = await createShoppingListItemInfo();

    object.updateInfo(updatedShoppingListItem);

    const info = object.getInfo();

    expectShoppingListItem(info, updatedShoppingListItem);
  });

  test('getInfo should return provided info', async () => {
    const { shoppingListItem } = await createShoppingListItemInfo();
    const object = await createShoppingListItem(shoppingListItem);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectShoppingListItem(info, shoppingListItem);
  });
});
