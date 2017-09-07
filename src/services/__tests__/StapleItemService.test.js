// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleItemService } from '../';
import { createStapleItemInfo, expectStapleItem } from '../../schema/__tests__/StapleItem.test';

const chance = new Chance();
const stapleItemService = new StapleItemService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'imageUrl', 'popular', 'user', 'stapleTemplateItem', 'tags'),
    include_user: true,
    include_stapleTemplateItem: true,
    include_tags: true,
  });

const createCriteria = stapleItem =>
  Map({
    conditions: Map({
      name: stapleItem ? stapleItem.get('name') : uuid(),
      description: stapleItem ? stapleItem.get('description') : uuid(),
      imageUrl: stapleItem ? stapleItem.get('imageUrl') : uuid(),
      popular: stapleItem ? stapleItem.get('popular') : chance.integer({ min: 0, max: 1000 }) % 2 === 0,
      userId: stapleItem ? stapleItem.get('userId') : uuid(),
      stapleTemplateItemId: stapleItem ? stapleItem.get('stapleTemplateItemId') : uuid(),
      tagIds: stapleItem ? stapleItem.get('tagIds') : List.of(uuid(), uuid()),
    }),
  }).merge(createCriteriaWthoutConditions());

const createStapleItems = async (count, useSameInfo = false) => {
  let stapleItem;

  if (useSameInfo) {
    const { stapleItem: tempStapleItem } = await createStapleItemInfo();

    stapleItem = tempStapleItem;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalStapleItem;

          if (useSameInfo) {
            finalStapleItem = stapleItem;
          } else {
            const { stapleItem: tempStapleItem } = await createStapleItemInfo();

            finalStapleItem = tempStapleItem;
          }

          return stapleItemService.read(await stapleItemService.create(finalStapleItem), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createStapleItems;

describe('create', () => {
  test('should return the created staple item Id', async () => {
    const stapleItemId = await stapleItemService.create((await createStapleItemInfo()).stapleItem);

    expect(stapleItemId).toBeDefined();
  });

  test('should create the staple item', async () => {
    const { stapleItem } = await createStapleItemInfo();
    const stapleItemId = await stapleItemService.create(stapleItem);
    const fetchedStapleItem = await stapleItemService.read(stapleItemId, createCriteriaWthoutConditions());

    expect(fetchedStapleItem).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided staple item Id does not exist', async () => {
    const stapleItemId = uuid();

    try {
      await stapleItemService.read(stapleItemId);
    } catch (ex) {
      expect(ex.message).toBe(`No staple item found with Id: ${stapleItemId}`);
    }
  });

  test('should read the existing staple item', async () => {
    const { stapleItem: expectedStapleItem, stapleUser: expectedUser, tags: expectedTags } = await createStapleItemInfo();
    const stapleItemId = await stapleItemService.create(expectedStapleItem);
    const stapleItem = await stapleItemService.read(stapleItemId, createCriteriaWthoutConditions());

    expectStapleItem(stapleItem, expectedStapleItem, {
      stapleItemId,
      expectedUser,
      expectedTags,
    });
  });
});

describe('update', () => {
  test('should reject if the provided staple item Id does not exist', async () => {
    const stapleItemId = uuid();

    try {
      const stapleItem = await stapleItemService.read(
        await stapleItemService.create((await createStapleItemInfo()).stapleItem),
        createCriteriaWthoutConditions(),
      );

      await stapleItemService.update(stapleItem.set('id', stapleItemId));
    } catch (ex) {
      expect(ex.message).toBe(`No staple item found with Id: ${stapleItemId}`);
    }
  });

  test('should return the Id of the updated staple item', async () => {
    const { stapleItem: expectedStapleItem } = await createStapleItemInfo();
    const stapleItemId = await stapleItemService.create((await createStapleItemInfo()).stapleItem);
    const id = await stapleItemService.update(expectedStapleItem.set('id', stapleItemId));

    expect(id).toBe(stapleItemId);
  });

  test('should update the existing staple item', async () => {
    const { stapleItem: expectedStapleItem, stapleUser: expectedUser, tags: expectedTags } = await createStapleItemInfo();
    const stapleItemId = await stapleItemService.create((await createStapleItemInfo()).stapleItem);

    await stapleItemService.update(expectedStapleItem.set('id', stapleItemId));

    const stapleItem = await stapleItemService.read(stapleItemId, createCriteriaWthoutConditions());

    expectStapleItem(stapleItem, expectedStapleItem, {
      stapleItemId,
      expectedUser,
      expectedTags,
    });
  });
});

describe('delete', () => {
  test('should reject if the provided staple item Id does not exist', async () => {
    const stapleItemId = uuid();

    try {
      await stapleItemService.delete(stapleItemId);
    } catch (ex) {
      expect(ex.message).toBe(`No staple item found with Id: ${stapleItemId}`);
    }
  });

  test('should delete the existing staple item', async () => {
    const stapleItemId = await stapleItemService.create((await createStapleItemInfo()).stapleItem);
    await stapleItemService.delete(stapleItemId);

    try {
      await stapleItemService.delete(stapleItemId);
    } catch (ex) {
      expect(ex.message).toBe(`No staple item found with Id: ${stapleItemId}`);
    }
  });
});

describe('search', () => {
  test('should return no staple item if provided criteria matches no staple item', async () => {
    const stapleItems = await stapleItemService.search(createCriteria());

    expect(stapleItems.count()).toBe(0);
  });

  test('should return the staple item matches the criteria', async () => {
    const { stapleItem: expectedStapleItem, stapleUser: expectedUser, tags: expectedTags } = await createStapleItemInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => stapleItemService.create(expectedStapleItem))
          .toArray(),
      ),
    );
    const stapleItems = await stapleItemService.search(createCriteria(expectedStapleItem));

    expect(stapleItems.count).toBe(results.count);
    stapleItems.forEach((stapleItem) => {
      expect(results.find(_ => _.localeCompare(stapleItem.get('id')) === 0)).toBeDefined();
      expectStapleItem(stapleItem, expectedStapleItem, {
        stapleItemId: stapleItem.get('id'),
        expectedUser,
        expectedTags,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no staple item if provided criteria matches no staple item', async () => {
    let stapleItems = List();
    const result = stapleItemService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        stapleItems = stapleItems.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleItems.count()).toBe(0);
  });

  test('should return the staple item matches the criteria', async () => {
    const { stapleItem: expectedStapleItem, stapleUser: expectedUser, tags: expectedTags } = await createStapleItemInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => stapleItemService.create(expectedStapleItem))
          .toArray(),
      ),
    );

    let stapleItems = List();
    const result = stapleItemService.searchAll(createCriteria(expectedStapleItem));

    try {
      result.event.subscribe((info) => {
        stapleItems = stapleItems.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleItems.count).toBe(results.count);
    stapleItems.forEach((stapleItem) => {
      expect(results.find(_ => _.localeCompare(stapleItem.get('id')) === 0)).toBeDefined();
      expectStapleItem(stapleItem, expectedStapleItem, {
        stapleItemId: stapleItem.get('id'),
        expectedUser,
        expectedTags,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no staple item match provided criteria', async () => {
    expect(await stapleItemService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any staple item match provided criteria', async () => {
    const stapleItems = await createStapleItems(chance.integer({ min: 1, max: 10 }), true);

    expect(await stapleItemService.exists(createCriteria(stapleItems.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no staple item match provided criteria', async () => {
    expect(await stapleItemService.count(createCriteria())).toBe(0);
  });

  test('should return the count of staple item match provided criteria', async () => {
    const stapleItems = await createStapleItems(chance.integer({ min: 1, max: 10 }), true);

    expect(await stapleItemService.count(createCriteria(stapleItems.first()))).toBe(stapleItems.count());
  });
});
