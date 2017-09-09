// @flow

import Chance from 'chance';
import Immutable, { Map, Range } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { ShoppingList } from '../';

const chance = new Chance();

export const createShoppingListInfo = async () => {
  const sharedWithUsers = Immutable.fromJS(
    await Promise.all(
      Range(0, chance.integer({ min: 0, max: 3 }))
        .map(() => ParseWrapperService.createNewUser({ username: `${uuid()}@email.com`, password: '123456' }).signUp())
        .toArray(),
    ),
  );
  const user = await ParseWrapperService.createNewUser({ username: `${uuid()}@email.com`, password: '123456' }).signUp();
  const shoppingList = Map({
    name: uuid(),
    userId: user.id,
    sharedWithUserIds: sharedWithUsers.map(sharedWithUser => sharedWithUser.id),
  });

  return { shoppingList, user, sharedWithUsers };
};

export const createShoppingList = async object => ShoppingList.spawn(object || (await createShoppingListInfo()).shoppingList);

export const expectShoppingList = (object, expectedObject, { shoppingListId, expectedUser, expectedSharedWithUsers } = {}) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('userId')).toBe(expectedObject.get('userId'));
  expect(object.get('sharedWithUserIds')).toEqual(expectedObject.get('sharedWithUserIds'));

  if (shoppingListId) {
    expect(object.get('id')).toBe(shoppingListId);
  }

  if (expectedUser) {
    expect(object.get('user').id).toEqual(expectedUser.id);
    expect(object.get('user').username).toEqual(expectedUser.username);
  }

  if (expectedSharedWithUsers) {
    expectedSharedWithUsers.forEach((expectedSharedWithUser) => {
      const sharedWithUser = object.get('sharedWithUsers').find(_ => _.id.localeCompare(expectedSharedWithUser.id) === 0);

      expect(sharedWithUser).toBeTruthy();
      expect(sharedWithUser.username).toEqual(expectedSharedWithUser.username);
    });
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createShoppingList()).className).toBe('ShoppingList');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { shoppingList } = await createShoppingListInfo();
    const object = await createShoppingList(shoppingList);
    const info = object.getInfo();

    expectShoppingList(info, shoppingList);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createShoppingList();

    expect(new ShoppingList(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createShoppingList();

    expect(new ShoppingList(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createShoppingList();
    const { shoppingList: updatedShoppingList } = await createShoppingListInfo();

    object.updateInfo(updatedShoppingList);

    const info = object.getInfo();

    expectShoppingList(info, updatedShoppingList);
  });

  test('getInfo should return provided info', async () => {
    const { shoppingList } = await createShoppingListInfo();
    const object = await createShoppingList(shoppingList);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectShoppingList(info, shoppingList);
  });
});
