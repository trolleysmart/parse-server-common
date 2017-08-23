// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleTemplateItemService } from '../';
import { createStapleTemplateItemInfo, expectStapleTemplateItem } from '../../schema/__tests__/StapleTemplateItem.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'imageUrl', 'stapleTemplates', 'tags'),
    includeStapleTemplates: true,
    includeTags: true,
  });

const createCriteria = stapleTemplateItem =>
  Map({
    conditions: Map({
      name: stapleTemplateItem ? stapleTemplateItem.get('name') : uuid(),
      description: stapleTemplateItem ? stapleTemplateItem.get('description') : uuid(),
      imageUrl: stapleTemplateItem ? stapleTemplateItem.get('imageUrl') : uuid(),
      stapleTemplateIds: stapleTemplateItem ? stapleTemplateItem.get('stapleTemplateIds') : List.of(uuid(), uuid()),
      tagIds: stapleTemplateItem ? stapleTemplateItem.get('tagIds') : List.of(uuid(), uuid()),
    }),
  }).merge(createCriteriaWthoutConditions());

const createStapleTemplateItems = async (count, useSameInfo = false) => {
  let stapleTemplateItem;

  if (useSameInfo) {
    const { stapleTemplateItem: tempStapleTemplateItem } = await createStapleTemplateItemInfo();

    stapleTemplateItem = tempStapleTemplateItem;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalStapleTemplateItem;

          if (useSameInfo) {
            finalStapleTemplateItem = stapleTemplateItem;
          } else {
            const { stapleTemplateItem: tempStapleTemplateItem } = await createStapleTemplateItemInfo();

            finalStapleTemplateItem = tempStapleTemplateItem;
          }

          return StapleTemplateItemService.read(await StapleTemplateItemService.create(finalStapleTemplateItem), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createStapleTemplateItems;

describe('create', () => {
  test('should return the created staple teplate item Id', async () => {
    const stapleTemplateItemId = await StapleTemplateItemService.create((await createStapleTemplateItemInfo()).stapleTemplateItem);

    expect(stapleTemplateItemId).toBeDefined();
  });

  test('should create the staple teplate item', async () => {
    const { stapleTemplateItem } = await createStapleTemplateItemInfo();
    const stapleTemplateItemId = await StapleTemplateItemService.create(stapleTemplateItem);
    const fetchedStapleTemplateItem = await StapleTemplateItemService.read(stapleTemplateItemId, createCriteriaWthoutConditions());

    expect(fetchedStapleTemplateItem).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided staple teplate item Id does not exist', async () => {
    const stapleTemplateItemId = uuid();

    try {
      await StapleTemplateItemService.read(stapleTemplateItemId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple teplate item found with Id: ${stapleTemplateItemId}`);
    }
  });

  test('should read the existing staple teplate item', async () => {
    const {
      stapleTemplateItem: expectedStapleTemplateItem,
      stapleTemplates: expectedStapleTemplates,
      tags: expectedTags,
    } = await createStapleTemplateItemInfo();
    const stapleTemplateItemId = await StapleTemplateItemService.create(expectedStapleTemplateItem);
    const stapleTemplateItem = await StapleTemplateItemService.read(stapleTemplateItemId, createCriteriaWthoutConditions());

    expectStapleTemplateItem(stapleTemplateItem, expectedStapleTemplateItem, {
      stapleTemplateItemId,
      expectedStapleTemplates,
      expectedTags,
    });
  });
});

describe('update', () => {
  test('should reject if the provided staple teplate item Id does not exist', async () => {
    const stapleTemplateItemId = uuid();

    try {
      const stapleTemplateItem = await StapleTemplateItemService.read(
        await StapleTemplateItemService.create((await createStapleTemplateItemInfo()).stapleTemplateItem),
        createCriteriaWthoutConditions(),
      );

      await StapleTemplateItemService.update(stapleTemplateItem.set('id', stapleTemplateItemId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple teplate item found with Id: ${stapleTemplateItemId}`);
    }
  });

  test('should return the Id of the updated staple teplate item', async () => {
    const { stapleTemplateItem: expectedStapleTemplateItem } = await createStapleTemplateItemInfo();
    const stapleTemplateItemId = await StapleTemplateItemService.create((await createStapleTemplateItemInfo()).stapleTemplateItem);
    const id = await StapleTemplateItemService.update(expectedStapleTemplateItem.set('id', stapleTemplateItemId));

    expect(id).toBe(stapleTemplateItemId);
  });

  test('should update the existing staple teplate item', async () => {
    const {
      stapleTemplateItem: expectedStapleTemplateItem,
      stapleTemplates: expectedStapleTemplates,
      tags: expectedTags,
    } = await createStapleTemplateItemInfo();
    const stapleTemplateItemId = await StapleTemplateItemService.create((await createStapleTemplateItemInfo()).stapleTemplateItem);

    await StapleTemplateItemService.update(expectedStapleTemplateItem.set('id', stapleTemplateItemId));

    const stapleTemplateItem = await StapleTemplateItemService.read(stapleTemplateItemId, createCriteriaWthoutConditions());

    expectStapleTemplateItem(stapleTemplateItem, expectedStapleTemplateItem, {
      stapleTemplateItemId,
      expectedStapleTemplates,
      expectedTags,
    });
  });
});

describe('delete', () => {
  test('should reject if the provided staple teplate item Id does not exist', async () => {
    const stapleTemplateItemId = uuid();

    try {
      await StapleTemplateItemService.delete(stapleTemplateItemId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple teplate item found with Id: ${stapleTemplateItemId}`);
    }
  });

  test('should delete the existing staple teplate item', async () => {
    const stapleTemplateItemId = await StapleTemplateItemService.create((await createStapleTemplateItemInfo()).stapleTemplateItem);
    await StapleTemplateItemService.delete(stapleTemplateItemId);

    try {
      await StapleTemplateItemService.delete(stapleTemplateItemId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple teplate item found with Id: ${stapleTemplateItemId}`);
    }
  });
});

describe('search', () => {
  test('should return no staple teplate item if provided criteria matches no staple teplate item', async () => {
    const stapleTemplateItems = await StapleTemplateItemService.search(createCriteria());

    expect(stapleTemplateItems.count()).toBe(0);
  });

  test('should return the staple teplate item matches the criteria', async () => {
    const {
      stapleTemplateItem: expectedStapleTemplateItem,
      stapleTemplates: expectedStapleTemplates,
      tags: expectedTags,
    } = await createStapleTemplateItemInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 })).map(async () => StapleTemplateItemService.create(expectedStapleTemplateItem)).toArray(),
      ),
    );
    const stapleTemplateItems = await StapleTemplateItemService.search(createCriteria(expectedStapleTemplateItem));

    expect(stapleTemplateItems.count).toBe(results.count);
    stapleTemplateItems.forEach((stapleTemplateItem) => {
      expect(results.find(_ => _.localeCompare(stapleTemplateItem.get('id')) === 0)).toBeDefined();
      expectStapleTemplateItem(stapleTemplateItem, expectedStapleTemplateItem, {
        stapleTemplateItemId: stapleTemplateItem.get('id'),
        expectedStapleTemplates,
        expectedTags,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no staple teplate item if provided criteria matches no staple teplate item', async () => {
    let stapleTemplateItems = List();
    const result = StapleTemplateItemService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        stapleTemplateItems = stapleTemplateItems.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleTemplateItems.count()).toBe(0);
  });

  test('should return the staple teplate item matches the criteria', async () => {
    const {
      stapleTemplateItem: expectedStapleTemplateItem,
      stapleTemplates: expectedStapleTemplates,
      tags: expectedTags,
    } = await createStapleTemplateItemInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 })).map(async () => StapleTemplateItemService.create(expectedStapleTemplateItem)).toArray(),
      ),
    );

    let stapleTemplateItems = List();
    const result = StapleTemplateItemService.searchAll(createCriteria(expectedStapleTemplateItem));

    try {
      result.event.subscribe((info) => {
        stapleTemplateItems = stapleTemplateItems.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleTemplateItems.count).toBe(results.count);
    stapleTemplateItems.forEach((stapleTemplateItem) => {
      expect(results.find(_ => _.localeCompare(stapleTemplateItem.get('id')) === 0)).toBeDefined();
      expectStapleTemplateItem(stapleTemplateItem, expectedStapleTemplateItem, {
        stapleTemplateItemId: stapleTemplateItem.get('id'),
        expectedStapleTemplates,
        expectedTags,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no staple teplate item match provided criteria', async () => {
    expect(await StapleTemplateItemService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any staple teplate item match provided criteria', async () => {
    const stapleTemplateItems = await createStapleTemplateItems(chance.integer({ min: 1, max: 10 }), true);

    expect(await StapleTemplateItemService.exists(createCriteria(stapleTemplateItems.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no staple teplate item match provided criteria', async () => {
    expect(await StapleTemplateItemService.count(createCriteria())).toBe(0);
  });

  test('should return the count of staple teplate item match provided criteria', async () => {
    const stapleTemplateItems = await createStapleTemplateItems(chance.integer({ min: 1, max: 10 }), true);

    expect(await StapleTemplateItemService.count(createCriteria(stapleTemplateItems.first()))).toBe(stapleTemplateItems.count());
  });
});
