// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { ShoppingListService } from '../';
import { createShoppingListInfo, expectShoppingList } from '../../schema/__tests__/ShoppingList.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'user', 'sharedWithUsers'),
    includeUser: true,
    includeSharedWithUsers: true,
  });

const createCriteria = shoppingList =>
  Map({
    conditions: Map({
      name: shoppingList ? shoppingList.get('name') : uuid(),
      userId: shoppingList ? shoppingList.get('userId') : uuid(),
      sharedWithUserIds: shoppingList ? shoppingList.get('sharedWithUserIds') : List.of(uuid(), uuid()),
    }),
  }).merge(createCriteriaWthoutConditions());

const createShoppingLists = async (count, useSameInfo = false) => {
  let shoppingList;

  if (useSameInfo) {
    const { shoppingList: tempShoppingList } = await createShoppingListInfo();

    shoppingList = tempShoppingList;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalShoppingList;

          if (useSameInfo) {
            finalShoppingList = shoppingList;
          } else {
            const { shoppingList: tempShoppingList } = await createShoppingListInfo();

            finalShoppingList = tempShoppingList;
          }

          return ShoppingListService.read(await ShoppingListService.create(finalShoppingList), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createShoppingLists;

describe('create', () => {
  test('should return the created shopping list Id', async () => {
    const shoppingListId = await ShoppingListService.create((await createShoppingListInfo()).shoppingList);

    expect(shoppingListId).toBeDefined();
  });

  test('should create the shopping list', async () => {
    const { shoppingList } = await createShoppingListInfo();
    const shoppingListId = await ShoppingListService.create(shoppingList);
    const fetchedShoppingList = await ShoppingListService.read(shoppingListId, createCriteriaWthoutConditions());

    expect(fetchedShoppingList).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided shopping list Id does not exist', async () => {
    const shoppingListId = uuid();

    try {
      await ShoppingListService.read(shoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });

  test('should read the existing shopping list', async () => {
    const { shoppingList: expectedShoppingList, user: expectedUser, sharedWithUsers: expectedSharedWithUsers } = await createShoppingListInfo();
    const shoppingListId = await ShoppingListService.create(expectedShoppingList);
    const shoppingList = await ShoppingListService.read(shoppingListId, createCriteriaWthoutConditions());

    expectShoppingList(shoppingList, expectedShoppingList, { shoppingListId, expectedUser, expectedSharedWithUsers });
  });
});

describe('update', () => {
  test('should reject if the provided shopping list Id does not exist', async () => {
    const shoppingListId = uuid();

    try {
      const shoppingList = await ShoppingListService.read(
        await ShoppingListService.create((await createShoppingListInfo()).shoppingList),
        createCriteriaWthoutConditions(),
      );

      await ShoppingListService.update(shoppingList.set('id', shoppingListId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });

  test('should return the Id of the updated shopping list', async () => {
    const { shoppingList: expectedShoppingList } = await createShoppingListInfo();
    const shoppingListId = await ShoppingListService.create((await createShoppingListInfo()).shoppingList);
    const id = await ShoppingListService.update(expectedShoppingList.set('id', shoppingListId));

    expect(id).toBe(shoppingListId);
  });

  test('should update the existing shopping list', async () => {
    const { shoppingList: expectedShoppingList, user: expectedUser, sharedWithUsers: expectedSharedWithUsers } = await createShoppingListInfo();
    const shoppingListId = await ShoppingListService.create((await createShoppingListInfo()).shoppingList);

    await ShoppingListService.update(expectedShoppingList.set('id', shoppingListId));

    const shoppingList = await ShoppingListService.read(shoppingListId, createCriteriaWthoutConditions());

    expectShoppingList(shoppingList, expectedShoppingList, { shoppingListId, expectedUser, expectedSharedWithUsers });
  });
});

describe('delete', () => {
  test('should reject if the provided shopping list Id does not exist', async () => {
    const shoppingListId = uuid();

    try {
      await ShoppingListService.delete(shoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });

  test('should delete the existing shopping list', async () => {
    const shoppingListId = await ShoppingListService.create((await createShoppingListInfo()).shoppingList);
    await ShoppingListService.delete(shoppingListId);

    try {
      await ShoppingListService.delete(shoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list found with Id: ${shoppingListId}`);
    }
  });
});

describe('search', () => {
  test('should return no shopping list if provided criteria matches no shopping list', async () => {
    const shoppingLists = await ShoppingListService.search(createCriteria());

    expect(shoppingLists.count()).toBe(0);
  });

  test('should return the shopping list matches the criteria', async () => {
    const { shoppingList: expectedShoppingList, user: expectedUser, sharedWithUsers: expectedSharedWithUsers } = await createShoppingListInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => ShoppingListService.create(expectedShoppingList)).toArray()),
    );
    const shoppingLists = await ShoppingListService.search(createCriteria(expectedShoppingList));

    expect(shoppingLists.count).toBe(results.count);
    shoppingLists.forEach((shoppingList) => {
      expect(results.find(_ => _.localeCompare(shoppingList.get('id')) === 0)).toBeDefined();
      expectShoppingList(shoppingList, expectedShoppingList, { shoppingListId: shoppingList.get('id'), expectedUser, expectedSharedWithUsers });
    });
  });
});

describe('searchAll', () => {
  test('should return no shopping list if provided criteria matches no shopping list', async () => {
    let shoppingLists = List();
    const result = ShoppingListService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        shoppingLists = shoppingLists.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(shoppingLists.count()).toBe(0);
  });

  test('should return the shopping list matches the criteria', async () => {
    const { shoppingList: expectedShoppingList, user: expectedUser, sharedWithUsers: expectedSharedWithUsers } = await createShoppingListInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => ShoppingListService.create(expectedShoppingList)).toArray()),
    );

    let shoppingLists = List();
    const result = ShoppingListService.searchAll(createCriteria(expectedShoppingList));

    try {
      result.event.subscribe((info) => {
        shoppingLists = shoppingLists.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(shoppingLists.count).toBe(results.count);
    shoppingLists.forEach((shoppingList) => {
      expect(results.find(_ => _.localeCompare(shoppingList.get('id')) === 0)).toBeDefined();
      expectShoppingList(shoppingList, expectedShoppingList, { shoppingListId: shoppingList.get('id'), expectedUser, expectedSharedWithUsers });
    });
  });
});

describe('exists', () => {
  test('should return false if no shopping list match provided criteria', async () => {
    expect(await ShoppingListService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any shopping list match provided criteria', async () => {
    const shoppingLists = await createShoppingLists(chance.integer({ min: 1, max: 10 }), true);

    expect(await ShoppingListService.exists(createCriteria(shoppingLists.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no shopping list match provided criteria', async () => {
    expect(await ShoppingListService.count(createCriteria())).toBe(0);
  });

  test('should return the count of shopping list match provided criteria', async () => {
    const shoppingLists = await createShoppingLists(chance.integer({ min: 1, max: 10 }), true);

    expect(await ShoppingListService.count(createCriteria(shoppingLists.first()))).toBe(shoppingLists.count());
  });
});
