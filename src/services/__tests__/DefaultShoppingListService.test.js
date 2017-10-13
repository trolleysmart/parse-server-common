// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { DefaultShoppingListService } from '../';
import { createDefaultShoppingListInfo, expectDefaultShoppingList } from '../../schema/__tests__/DefaultShoppingList.test';

const chance = new Chance();
const defaultShoppingListService = new DefaultShoppingListService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('user', 'shoppingList'),
    include_user: true,
    include_shoppingList: true,
  });

const createCriteria = defaultShoppingList =>
  Map({
    conditions: Map({
      userId: defaultShoppingList ? defaultShoppingList.get('userId') : uuid(),
      shoppingListId: defaultShoppingList ? defaultShoppingList.get('shoppingListId') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createDefaultShoppingLists = async (count, useSameInfo = false) => {
  let defaultShoppingList;

  if (useSameInfo) {
    const { defaultShoppingList: tempDefaultShoppingList } = await createDefaultShoppingListInfo();

    defaultShoppingList = tempDefaultShoppingList;
  }

  return Immutable.fromJS(await Promise.all(Range(0, count)
    .map(async () => {
      let finalDefaultShoppingList;

      if (useSameInfo) {
        finalDefaultShoppingList = defaultShoppingList;
      } else {
        const { defaultShoppingList: tempDefaultShoppingList } = await createDefaultShoppingListInfo();

        finalDefaultShoppingList = tempDefaultShoppingList;
      }

      return defaultShoppingListService.read(await defaultShoppingListService.create(finalDefaultShoppingList), createCriteriaWthoutConditions());
    })
    .toArray()));
};

export default createDefaultShoppingLists;

describe('create', () => {
  test('should return the created default shopping list Id', async () => {
    const defaultShoppingListId = await defaultShoppingListService.create((await createDefaultShoppingListInfo()).defaultShoppingList);

    expect(defaultShoppingListId).toBeDefined();
  });

  test('should create the default shopping list', async () => {
    const { defaultShoppingList } = await createDefaultShoppingListInfo();
    const defaultShoppingListId = await defaultShoppingListService.create(defaultShoppingList);
    const fetchedDefaultShoppingList = await defaultShoppingListService.read(defaultShoppingListId, createCriteriaWthoutConditions());

    expect(fetchedDefaultShoppingList).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided default shopping list Id does not exist', async () => {
    const defaultShoppingListId = uuid();

    try {
      await defaultShoppingListService.read(defaultShoppingListId);
    } catch (ex) {
      expect(ex.message).toBe(`No default shopping list found with Id: ${defaultShoppingListId}`);
    }
  });

  test('should read the existing default shopping list', async () => {
    const {
      defaultShoppingList: expectedDefaultShoppingList,
      user: expectedUser,
      shoppingList: expectedShoppingList,
    } = await createDefaultShoppingListInfo();
    const defaultShoppingListId = await defaultShoppingListService.create(expectedDefaultShoppingList);
    const defaultShoppingList = await defaultShoppingListService.read(defaultShoppingListId, createCriteriaWthoutConditions());

    expectDefaultShoppingList(defaultShoppingList, expectedDefaultShoppingList, { defaultShoppingListId, expectedUser, expectedShoppingList });
  });
});

describe('update', () => {
  test('should reject if the provided default shopping list Id does not exist', async () => {
    const defaultShoppingListId = uuid();

    try {
      const defaultShoppingList = await defaultShoppingListService.read(
        await defaultShoppingListService.create((await createDefaultShoppingListInfo()).defaultShoppingList),
        createCriteriaWthoutConditions(),
      );

      await defaultShoppingListService.update(defaultShoppingList.set('id', defaultShoppingListId));
    } catch (ex) {
      expect(ex.message).toBe(`No default shopping list found with Id: ${defaultShoppingListId}`);
    }
  });

  test('should return the Id of the updated default shopping list', async () => {
    const { defaultShoppingList: expectedDefaultShoppingList } = await createDefaultShoppingListInfo();
    const defaultShoppingListId = await defaultShoppingListService.create((await createDefaultShoppingListInfo()).defaultShoppingList);
    const id = await defaultShoppingListService.update(expectedDefaultShoppingList.set('id', defaultShoppingListId));

    expect(id).toBe(defaultShoppingListId);
  });

  test('should update the existing default shopping list', async () => {
    const {
      defaultShoppingList: expectedDefaultShoppingList,
      user: expectedUser,
      shoppingList: expectedShoppingList,
    } = await createDefaultShoppingListInfo();
    const defaultShoppingListId = await defaultShoppingListService.create((await createDefaultShoppingListInfo()).defaultShoppingList);

    await defaultShoppingListService.update(expectedDefaultShoppingList.set('id', defaultShoppingListId));

    const defaultShoppingList = await defaultShoppingListService.read(defaultShoppingListId, createCriteriaWthoutConditions());

    expectDefaultShoppingList(defaultShoppingList, expectedDefaultShoppingList, { defaultShoppingListId, expectedUser, expectedShoppingList });
  });
});

describe('delete', () => {
  test('should reject if the provided default shopping list Id does not exist', async () => {
    const defaultShoppingListId = uuid();

    try {
      await defaultShoppingListService.delete(defaultShoppingListId);
    } catch (ex) {
      expect(ex.message).toBe(`No default shopping list found with Id: ${defaultShoppingListId}`);
    }
  });

  test('should delete the existing default shopping list', async () => {
    const defaultShoppingListId = await defaultShoppingListService.create((await createDefaultShoppingListInfo()).defaultShoppingList);
    await defaultShoppingListService.delete(defaultShoppingListId);

    try {
      await defaultShoppingListService.delete(defaultShoppingListId);
    } catch (ex) {
      expect(ex.message).toBe(`No default shopping list found with Id: ${defaultShoppingListId}`);
    }
  });
});

describe('search', () => {
  test('should return no default shopping list if provided criteria matches no default shopping list', async () => {
    const defaultShoppingLists = await defaultShoppingListService.search(createCriteria());

    expect(defaultShoppingLists.count()).toBe(0);
  });

  test('should return the default shopping list matches the criteria', async () => {
    const {
      defaultShoppingList: expectedDefaultShoppingList,
      user: expectedUser,
      shoppingList: expectedShoppingList,
    } = await createDefaultShoppingListInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => defaultShoppingListService.create(expectedDefaultShoppingList))
      .toArray()));
    const defaultShoppingLists = await defaultShoppingListService.search(createCriteria(expectedDefaultShoppingList));

    expect(defaultShoppingLists.count).toBe(results.count);
    defaultShoppingLists.forEach((defaultShoppingList) => {
      expect(results.find(_ => _.localeCompare(defaultShoppingList.get('id')) === 0)).toBeDefined();
      expectDefaultShoppingList(defaultShoppingList, expectedDefaultShoppingList, {
        defaultShoppingListId: defaultShoppingList.get('id'),
        expectedUser,
        expectedShoppingList,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no default shopping list if provided criteria matches no default shopping list', async () => {
    let defaultShoppingLists = List();
    const result = defaultShoppingListService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        defaultShoppingLists = defaultShoppingLists.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(defaultShoppingLists.count()).toBe(0);
  });

  test('should return the default shopping list matches the criteria', async () => {
    const {
      defaultShoppingList: expectedDefaultShoppingList,
      user: expectedUser,
      shoppingList: expectedShoppingList,
    } = await createDefaultShoppingListInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => defaultShoppingListService.create(expectedDefaultShoppingList))
      .toArray()));

    let defaultShoppingLists = List();
    const result = defaultShoppingListService.searchAll(createCriteria(expectedDefaultShoppingList));

    try {
      result.event.subscribe((info) => {
        defaultShoppingLists = defaultShoppingLists.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(defaultShoppingLists.count).toBe(results.count);
    defaultShoppingLists.forEach((defaultShoppingList) => {
      expect(results.find(_ => _.localeCompare(defaultShoppingList.get('id')) === 0)).toBeDefined();
      expectDefaultShoppingList(defaultShoppingList, expectedDefaultShoppingList, {
        defaultShoppingListId: defaultShoppingList.get('id'),
        expectedUser,
        expectedShoppingList,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no default shopping list match provided criteria', async () => {
    expect(await defaultShoppingListService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any default shopping list match provided criteria', async () => {
    const defaultShoppingLists = await createDefaultShoppingLists(chance.integer({ min: 1, max: 10 }), true);

    expect(await defaultShoppingListService.exists(createCriteria(defaultShoppingLists.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no default shopping list match provided criteria', async () => {
    expect(await defaultShoppingListService.count(createCriteria())).toBe(0);
  });

  test('should return the count of default shopping list match provided criteria', async () => {
    const defaultShoppingLists = await createDefaultShoppingLists(chance.integer({ min: 1, max: 10 }), true);

    expect(await defaultShoppingListService.count(createCriteria(defaultShoppingLists.first()))).toBe(defaultShoppingLists.count());
  });
});
