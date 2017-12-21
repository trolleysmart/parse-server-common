// @flow

import { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { DefaultShoppingList } from '../';
import createShoppingLists from '../../services/__tests__/ShoppingListService.test';

export const createDefaultShoppingListInfo = async () => {
  const user = await ParseWrapperService.createNewUser({ username: `${uuid()}@email.com`, password: '123456' }).signUp();
  const shoppingList = (await createShoppingLists(1)).first();
  const defaultShoppingList = Map({
    userId: user.id,
    shoppingListId: shoppingList.get('id'),
  });

  return { defaultShoppingList, user, shoppingList };
};

export const createDefaultShoppingList = async object =>
  DefaultShoppingList.spawn(object || (await createDefaultShoppingListInfo()).defaultShoppingList);

export const expectDefaultShoppingList = (object, expectedObject, { defaultShoppingListId, expectedUser, expectedShoppingList } = {}) => {
  expect(object.get('userId')).toBe(expectedObject.get('userId'));
  expect(object.get('shoppingListId')).toBe(expectedObject.get('shoppingListId'));

  if (defaultShoppingListId) {
    expect(object.get('id')).toBe(defaultShoppingListId);
  }

  if (expectedUser) {
    expect(object.get('user').id).toEqual(expectedUser.id);
    expect(object.get('user').username).toEqual(expectedUser.username);
  }

  if (expectedShoppingList) {
    expect(object.getIn(['shoppingList', 'id'])).toBe(expectedShoppingList.get('id'));
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createDefaultShoppingList()).className).toBe('DefaultShoppingList');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { defaultShoppingList } = await createDefaultShoppingListInfo();
    const object = await createDefaultShoppingList(defaultShoppingList);
    const info = object.getInfo();

    expectDefaultShoppingList(info, defaultShoppingList);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createDefaultShoppingList();

    expect(new DefaultShoppingList(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createDefaultShoppingList();

    expect(new DefaultShoppingList(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createDefaultShoppingList();
    const { defaultShoppingList: updatedDefaultShoppingList } = await createDefaultShoppingListInfo();

    object.updateInfo(updatedDefaultShoppingList);

    const info = object.getInfo();

    expectDefaultShoppingList(info, updatedDefaultShoppingList);
  });

  test('getInfo should return provided info', async () => {
    const { defaultShoppingList } = await createDefaultShoppingListInfo();
    const object = await createDefaultShoppingList(defaultShoppingList);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectDefaultShoppingList(info, defaultShoppingList);
  });
});
