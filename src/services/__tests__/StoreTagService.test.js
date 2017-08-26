// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StoreTagService } from '../';
import { createStoreTagInfo, expectStoreTag } from '../../schema/__tests__/StoreTag.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('key', 'name', 'description', 'imageUrl', 'url', 'level', 'parentStoreTag', 'store', 'tag'),
    include_parentTag: true,
    include_store: true,
    include_tag: true,
  });

const createCriteria = storeTag =>
  Map({
    conditions: Map({
      key: storeTag ? storeTag.get('key') : uuid(),
      name: storeTag ? storeTag.get('name') : uuid(),
      description: storeTag ? storeTag.get('description') : uuid(),
      imageUrl: storeTag ? storeTag.get('imageUrl') : uuid(),
      url: storeTag ? storeTag.get('url') : uuid(),
      level: storeTag ? storeTag.get('level') : chance.integer({ min: 1, max: 1000 }),
      parentStoreTagId: storeTag && storeTag.get('parentStoreTagId') ? storeTag.get('parentStoreTagId') : undefined,
      storeId: storeTag ? storeTag.get('storeId') : uuid(),
      tagId: storeTag ? storeTag.get('tagId') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createStoreTags = async (count, useSameInfo = false, createParentStoreTag = true) => {
  const parentStoreTag = createParentStoreTag ? await createStoreTags(1, false, false) : undefined;
  let storeTag;

  if (useSameInfo) {
    const { storeTag: tempStoreTag } = await createStoreTagInfo();

    storeTag = tempStoreTag;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalStoreTag;

          if (useSameInfo) {
            finalStoreTag = storeTag;
          } else {
            const { storeTag: tempStoreTag } = await createStoreTagInfo();

            finalStoreTag = tempStoreTag;
          }

          return StoreTagService.read(
            await StoreTagService.create(
              createParentStoreTag ? finalStoreTag.merge(Map({ parentStoreTagId: parentStoreTag.get('id') })) : finalStoreTag,
            ),
            createCriteriaWthoutConditions(),
          );
        })
        .toArray(),
    ),
  );
};

export default createStoreTags;

describe('create', () => {
  test('should return the created store tag Id', async () => {
    const storeTagId = await StoreTagService.create((await createStoreTagInfo()).storeTag);

    expect(storeTagId).toBeDefined();
  });

  test('should create the store tag', async () => {
    const { storeTag } = await createStoreTagInfo();
    const storeTagId = await StoreTagService.create(storeTag);
    const fetchedStoreTag = await StoreTagService.read(storeTagId, createCriteriaWthoutConditions());

    expect(fetchedStoreTag).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided store tag Id does not exist', async () => {
    const storeTagId = uuid();

    try {
      await StoreTagService.read(storeTagId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });

  test('should read the existing store tag', async () => {
    const { storeTag: parentStoreTag } = await createStoreTagInfo();
    const parentStoreTagId = await StoreTagService.create(parentStoreTag);
    const { storeTag: expectedStoreTag, store: expectedStore, tags: expectedTags } = await createStoreTagInfo({ parentStoreTagId });
    const storeTagId = await StoreTagService.create(expectedStoreTag);
    const storeTag = await StoreTagService.read(storeTagId, createCriteriaWthoutConditions());

    expectStoreTag(storeTag, expectedStoreTag, { storeTagId, expectedStore, expectedTags });
  });
});

describe('update', () => {
  test('should reject if the provided store tag Id does not exist', async () => {
    const storeTagId = uuid();

    try {
      const storeTag = await StoreTagService.read(
        await StoreTagService.create((await createStoreTagInfo()).storeTag),
        createCriteriaWthoutConditions(),
      );

      await StoreTagService.update(storeTag.set('id', storeTagId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });

  test('should return the Id of the updated store tag', async () => {
    const { storeTag: expectedStoreTag } = await createStoreTagInfo();
    const storeTagId = await StoreTagService.create((await createStoreTagInfo()).storeTag);
    const id = await StoreTagService.update(expectedStoreTag.set('id', storeTagId));

    expect(id).toBe(storeTagId);
  });

  test('should update the existing store tag', async () => {
    const { storeTag: parentStoreTag } = await createStoreTagInfo();
    const parentStoreTagId = await StoreTagService.create(parentStoreTag);
    const { storeTag: expectedStoreTag, store: expectedStore, tags: expectedTags } = await createStoreTagInfo({ parentStoreTagId });
    const storeTagId = await StoreTagService.create((await createStoreTagInfo()).storeTag);

    await StoreTagService.update(expectedStoreTag.set('id', storeTagId));

    const storeTag = await StoreTagService.read(storeTagId, createCriteriaWthoutConditions());

    expectStoreTag(storeTag, expectedStoreTag, { storeTagId, expectedStore, expectedTags });
  });
});

describe('delete', () => {
  test('should reject if the provided store tag Id does not exist', async () => {
    const storeTagId = uuid();

    try {
      await StoreTagService.delete(storeTagId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });

  test('should delete the existing store tag', async () => {
    const storeTagId = await StoreTagService.create((await createStoreTagInfo()).storeTag);
    await StoreTagService.delete(storeTagId);

    try {
      await StoreTagService.delete(storeTagId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });
});

describe('search', () => {
  test('should return no store tag if provided criteria matches no store tag', async () => {
    const storeTags = await StoreTagService.search(createCriteria());

    expect(storeTags.count()).toBe(0);
  });

  test('should return the store tags matches the criteria', async () => {
    const { storeTag: parentStoreTag } = await createStoreTagInfo();
    const parentStoreTagId = await StoreTagService.create(parentStoreTag);
    const { storeTag: expectedStoreTag, store: expectedStore, tags: expectedTags } = await createStoreTagInfo({ parentStoreTagId });
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => StoreTagService.create(expectedStoreTag)).toArray()),
    );
    const storeTags = await StoreTagService.search(createCriteria(expectedStoreTag));

    expect(storeTags.count).toBe(results.count);
    storeTags.forEach((storeTag) => {
      expect(results.find(_ => _.localeCompare(storeTag.get('id')) === 0)).toBeDefined();
      expectStoreTag(storeTag, expectedStoreTag, { storeTagId: storeTag.get('id'), expectedStore, expectedTags });
    });
  });
});

describe('searchAll', () => {
  test('should return no store tag if provided criteria matches no store tag', async () => {
    let storeTags = List();
    const result = StoreTagService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        storeTags = storeTags.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(storeTags.count()).toBe(0);
  });

  test('should return the store tags matches the criteria', async () => {
    const { storeTag: parentStoreTag } = await createStoreTagInfo();
    const parentStoreTagId = await StoreTagService.create(parentStoreTag);
    const { storeTag: expectedStoreTag, store: expectedStore, tags: expectedTags } = await createStoreTagInfo({ parentStoreTagId });
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => StoreTagService.create(expectedStoreTag)).toArray()),
    );

    let storeTags = List();
    const result = StoreTagService.searchAll(createCriteria(expectedStoreTag));

    try {
      result.event.subscribe((info) => {
        storeTags = storeTags.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(storeTags.count).toBe(results.count);
    storeTags.forEach((storeTag) => {
      expect(results.find(_ => _.localeCompare(storeTag.get('id')) === 0)).toBeDefined();
      expectStoreTag(storeTag, expectedStoreTag, { storeTagId: storeTag.get('id'), expectedStore, expectedTags });
    });
  });
});

describe('exists', () => {
  test('should return false if no store tag match provided criteria', async () => {
    expect(await StoreTagService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any store tag match provided criteria', async () => {
    const storeTags = await createStoreTags(chance.integer({ min: 1, max: 10 }), true);

    expect(await StoreTagService.exists(createCriteria(storeTags.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store tag match provided criteria', async () => {
    expect(await StoreTagService.count(createCriteria())).toBe(0);
  });

  test('should return the count of store tag match provided criteria', async () => {
    const storeTags = await createStoreTags(chance.integer({ min: 1, max: 10 }), true);

    expect(await StoreTagService.count(createCriteria(storeTags.first()))).toBe(storeTags.count());
  });
});
