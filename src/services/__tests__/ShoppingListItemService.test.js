// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { ShoppingListItemService } from '../';
import { createShoppingListItemInfo, expectShoppingListItem } from '../../schema/__tests__/ShoppingListItem.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'imageUrl', 'popular', 'user', 'shoppingList', 'productPrice', 'stapleItem', 'store', 'tags'),
    include_user: true,
    include_shoppingList: true,
    include_productPrice: true,
    include_stapleItem: true,
    include_store: true,
    include_tags: true,
  });

const createCriteria = shoppingListItem =>
  Map({
    conditions: Map({
      name: shoppingListItem ? shoppingListItem.get('name') : uuid(),
      description: shoppingListItem ? shoppingListItem.get('description') : uuid(),
      imageUrl: shoppingListItem ? shoppingListItem.get('imageUrl') : uuid(),
      userId: shoppingListItem ? shoppingListItem.get('userId') : uuid(),
      shoppingListId: shoppingListItem ? shoppingListItem.get('shoppingListId') : uuid(),
      productPriceId: shoppingListItem ? shoppingListItem.get('productPriceId') : uuid(),
      stapleItemId: shoppingListItem ? shoppingListItem.get('stapleItemId') : uuid(),
      storeId: shoppingListItem ? shoppingListItem.get('storeId') : uuid(),
      tagIds: shoppingListItem ? shoppingListItem.get('tagIds') : List.of(uuid(), uuid()),
    }),
  }).merge(createCriteriaWthoutConditions());

const createShoppingListItems = async (count, useSameInfo = false) => {
  let shoppingListItem;

  if (useSameInfo) {
    const { shoppingListItem: tempShoppingListItem } = await createShoppingListItemInfo();

    shoppingListItem = tempShoppingListItem;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalShoppingListItem;

          if (useSameInfo) {
            finalShoppingListItem = shoppingListItem;
          } else {
            const { shoppingListItem: tempShoppingListItem } = await createShoppingListItemInfo();

            finalShoppingListItem = tempShoppingListItem;
          }

          return ShoppingListItemService.read(await ShoppingListItemService.create(finalShoppingListItem), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createShoppingListItems;

describe('create', () => {
  test('should return the created shopping list item Id', async () => {
    const shoppingListItemId = await ShoppingListItemService.create((await createShoppingListItemInfo()).shoppingListItem);

    expect(shoppingListItemId).toBeDefined();
  });

  test('should create the shopping list item', async () => {
    const { shoppingListItem } = await createShoppingListItemInfo();
    const shoppingListItemId = await ShoppingListItemService.create(shoppingListItem);
    const fetchedShoppingListItem = await ShoppingListItemService.read(shoppingListItemId, createCriteriaWthoutConditions());

    expect(fetchedShoppingListItem).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided shopping list item Id does not exist', async () => {
    const shoppingListItemId = uuid();

    try {
      await ShoppingListItemService.read(shoppingListItemId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list item found with Id: ${shoppingListItemId}`);
    }
  });

  test('should read the existing shopping list item', async () => {
    const {
      shoppingListItem: expectedShoppingListItem,
      stapleUser: expectedUser,
      shoppingList: expectedShoppingList,
      productPrice: expectedProductPrice,
      stapleItem: expectedStapleItem,
      store: expectedStore,
      tags: expectedTags,
    } = await createShoppingListItemInfo();
    const shoppingListItemId = await ShoppingListItemService.create(expectedShoppingListItem);
    const shoppingListItem = await ShoppingListItemService.read(shoppingListItemId, createCriteriaWthoutConditions());

    expectShoppingListItem(shoppingListItem, expectedShoppingListItem, {
      shoppingListItemId,
      expectedUser,
      expectedShoppingList,
      expectedProductPrice,
      expectedStapleItem,
      expectedStore,
      expectedTags,
    });
  });
});

describe('update', () => {
  test('should reject if the provided shopping list item Id does not exist', async () => {
    const shoppingListItemId = uuid();

    try {
      const shoppingListItem = await ShoppingListItemService.read(
        await ShoppingListItemService.create((await createShoppingListItemInfo()).shoppingListItem),
        createCriteriaWthoutConditions(),
      );

      await ShoppingListItemService.update(shoppingListItem.set('id', shoppingListItemId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list item found with Id: ${shoppingListItemId}`);
    }
  });

  test('should return the Id of the updated shopping list item', async () => {
    const { shoppingListItem: expectedShoppingListItem } = await createShoppingListItemInfo();
    const shoppingListItemId = await ShoppingListItemService.create((await createShoppingListItemInfo()).shoppingListItem);
    const id = await ShoppingListItemService.update(expectedShoppingListItem.set('id', shoppingListItemId));

    expect(id).toBe(shoppingListItemId);
  });

  test('should update the existing shopping list item', async () => {
    const {
      shoppingListItem: expectedShoppingListItem,
      stapleUser: expectedUser,
      shoppingList: expectedShoppingList,
      productPrice: expectedProductPrice,
      stapleItem: expectedStapleItem,
      store: expectedStore,
      tags: expectedTags,
    } = await createShoppingListItemInfo();
    const shoppingListItemId = await ShoppingListItemService.create((await createShoppingListItemInfo()).shoppingListItem);

    await ShoppingListItemService.update(expectedShoppingListItem.set('id', shoppingListItemId));

    const shoppingListItem = await ShoppingListItemService.read(shoppingListItemId, createCriteriaWthoutConditions());

    expectShoppingListItem(shoppingListItem, expectedShoppingListItem, {
      shoppingListItemId,
      expectedUser,
      expectedShoppingList,
      expectedProductPrice,
      expectedStapleItem,
      expectedStore,
      expectedTags,
    });
  });
});

describe('delete', () => {
  test('should reject if the provided shopping list item Id does not exist', async () => {
    const shoppingListItemId = uuid();

    try {
      await ShoppingListItemService.delete(shoppingListItemId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list item found with Id: ${shoppingListItemId}`);
    }
  });

  test('should delete the existing shopping list item', async () => {
    const shoppingListItemId = await ShoppingListItemService.create((await createShoppingListItemInfo()).shoppingListItem);
    await ShoppingListItemService.delete(shoppingListItemId);

    try {
      await ShoppingListItemService.delete(shoppingListItemId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No shopping list item found with Id: ${shoppingListItemId}`);
    }
  });
});

describe('search', () => {
  test('should return no shopping list item if provided criteria matches no shopping list item', async () => {
    const shoppingListItems = await ShoppingListItemService.search(createCriteria());

    expect(shoppingListItems.count()).toBe(0);
  });

  test('should return the shopping list item matches the criteria', async () => {
    const {
      shoppingListItem: expectedShoppingListItem,
      stapleUser: expectedUser,
      shoppingList: expectedShoppingList,
      productPrice: expectedProductPrice,
      stapleItem: expectedStapleItem,
      store: expectedStore,
      tags: expectedTags,
    } = await createShoppingListItemInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 })).map(async () => ShoppingListItemService.create(expectedShoppingListItem)).toArray(),
      ),
    );
    const shoppingListItems = await ShoppingListItemService.search(createCriteria(expectedShoppingListItem));

    expect(shoppingListItems.count).toBe(results.count);
    shoppingListItems.forEach((shoppingListItem) => {
      expect(results.find(_ => _.localeCompare(shoppingListItem.get('id')) === 0)).toBeDefined();
      expectShoppingListItem(shoppingListItem, expectedShoppingListItem, {
        shoppingListItemId: shoppingListItem.get('id'),
        expectedUser,
        expectedShoppingList,
        expectedProductPrice,
        expectedStapleItem,
        expectedStore,
        expectedTags,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no shopping list item if provided criteria matches no shopping list item', async () => {
    let shoppingListItems = List();
    const result = ShoppingListItemService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        shoppingListItems = shoppingListItems.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(shoppingListItems.count()).toBe(0);
  });

  test('should return the shopping list item matches the criteria', async () => {
    const {
      shoppingListItem: expectedShoppingListItem,
      stapleUser: expectedUser,
      shoppingList: expectedShoppingList,
      productPrice: expectedProductPrice,
      stapleItem: expectedStapleItem,
      store: expectedStore,
      tags: expectedTags,
    } = await createShoppingListItemInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 })).map(async () => ShoppingListItemService.create(expectedShoppingListItem)).toArray(),
      ),
    );

    let shoppingListItems = List();
    const result = ShoppingListItemService.searchAll(createCriteria(expectedShoppingListItem));

    try {
      result.event.subscribe((info) => {
        shoppingListItems = shoppingListItems.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(shoppingListItems.count).toBe(results.count);
    shoppingListItems.forEach((shoppingListItem) => {
      expect(results.find(_ => _.localeCompare(shoppingListItem.get('id')) === 0)).toBeDefined();
      expectShoppingListItem(shoppingListItem, expectedShoppingListItem, {
        shoppingListItemId: shoppingListItem.get('id'),
        expectedUser,
        expectedShoppingList,
        expectedProductPrice,
        expectedStapleItem,
        expectedStore,
        expectedTags,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no shopping list item match provided criteria', async () => {
    expect(await ShoppingListItemService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any shopping list item match provided criteria', async () => {
    const shoppingListItems = await createShoppingListItems(chance.integer({ min: 1, max: 10 }), true);

    expect(await ShoppingListItemService.exists(createCriteria(shoppingListItems.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no shopping list item match provided criteria', async () => {
    expect(await ShoppingListItemService.count(createCriteria())).toBe(0);
  });

  test('should return the count of shopping list item match provided criteria', async () => {
    const shoppingListItems = await createShoppingListItems(chance.integer({ min: 1, max: 10 }), true);

    expect(await ShoppingListItemService.count(createCriteria(shoppingListItems.first()))).toBe(shoppingListItems.count());
  });
});
