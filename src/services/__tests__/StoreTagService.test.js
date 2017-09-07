// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StoreTagService } from '../';
import { createStoreTagInfo, expectStoreTag } from '../../schema/__tests__/StoreTag.test';

const chance = new Chance();
const storeTagService = new StoreTagService();

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

          return storeTagService.read(
            await storeTagService.create(
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
    const storeTagId = await storeTagService.create((await createStoreTagInfo()).storeTag);

    expect(storeTagId).toBeDefined();
  });

  test('should create the store tag', async () => {
    const { storeTag } = await createStoreTagInfo();
    const storeTagId = await storeTagService.create(storeTag);
    const fetchedStoreTag = await storeTagService.read(storeTagId, createCriteriaWthoutConditions());

    expect(fetchedStoreTag).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided store tag Id does not exist', async () => {
    const storeTagId = uuid();

    try {
      await storeTagService.read(storeTagId);
    } catch (ex) {
      expect(ex.message).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });

  test('should read the existing store tag', async () => {
    const { storeTag: parentStoreTag } = await createStoreTagInfo();
    const parentStoreTagId = await storeTagService.create(parentStoreTag);
    const { storeTag: expectedStoreTag, store: expectedStore, tags: expectedTags } = await createStoreTagInfo({ parentStoreTagId });
    const storeTagId = await storeTagService.create(expectedStoreTag);
    const storeTag = await storeTagService.read(storeTagId, createCriteriaWthoutConditions());

    expectStoreTag(storeTag, expectedStoreTag, { storeTagId, expectedStore, expectedTags });
  });
});

describe('update', () => {
  test('should reject if the provided store tag Id does not exist', async () => {
    const storeTagId = uuid();

    try {
      const storeTag = await storeTagService.read(
        await storeTagService.create((await createStoreTagInfo()).storeTag),
        createCriteriaWthoutConditions(),
      );

      await storeTagService.update(storeTag.set('id', storeTagId));
    } catch (ex) {
      expect(ex.message).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });

  test('should return the Id of the updated store tag', async () => {
    const { storeTag: expectedStoreTag } = await createStoreTagInfo();
    const storeTagId = await storeTagService.create((await createStoreTagInfo()).storeTag);
    const id = await storeTagService.update(expectedStoreTag.set('id', storeTagId));

    expect(id).toBe(storeTagId);
  });

  test('should update the existing store tag', async () => {
    const { storeTag: parentStoreTag } = await createStoreTagInfo();
    const parentStoreTagId = await storeTagService.create(parentStoreTag);
    const { storeTag: expectedStoreTag, store: expectedStore, tags: expectedTags } = await createStoreTagInfo({ parentStoreTagId });
    const storeTagId = await storeTagService.create((await createStoreTagInfo()).storeTag);

    await storeTagService.update(expectedStoreTag.set('id', storeTagId));

    const storeTag = await storeTagService.read(storeTagId, createCriteriaWthoutConditions());

    expectStoreTag(storeTag, expectedStoreTag, { storeTagId, expectedStore, expectedTags });
  });
});

describe('delete', () => {
  test('should reject if the provided store tag Id does not exist', async () => {
    const storeTagId = uuid();

    try {
      await storeTagService.delete(storeTagId);
    } catch (ex) {
      expect(ex.message).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });

  test('should delete the existing store tag', async () => {
    const storeTagId = await storeTagService.create((await createStoreTagInfo()).storeTag);
    await storeTagService.delete(storeTagId);

    try {
      await storeTagService.delete(storeTagId);
    } catch (ex) {
      expect(ex.message).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });
});

describe('search', () => {
  test('should return no store tag if provided criteria matches no store tag', async () => {
    const storeTags = await storeTagService.search(createCriteria());

    expect(storeTags.count()).toBe(0);
  });

  test('should return the store tags matches the criteria', async () => {
    const { storeTag: parentStoreTag } = await createStoreTagInfo();
    const parentStoreTagId = await storeTagService.create(parentStoreTag);
    const { storeTag: expectedStoreTag, store: expectedStore, tags: expectedTags } = await createStoreTagInfo({ parentStoreTagId });
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => storeTagService.create(expectedStoreTag))
          .toArray(),
      ),
    );
    const storeTags = await storeTagService.search(createCriteria(expectedStoreTag));

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
    const result = storeTagService.searchAll(createCriteria());

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
    const parentStoreTagId = await storeTagService.create(parentStoreTag);
    const { storeTag: expectedStoreTag, store: expectedStore, tags: expectedTags } = await createStoreTagInfo({ parentStoreTagId });
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => storeTagService.create(expectedStoreTag))
          .toArray(),
      ),
    );

    let storeTags = List();
    const result = storeTagService.searchAll(createCriteria(expectedStoreTag));

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
    expect(await storeTagService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any store tag match provided criteria', async () => {
    const storeTags = await createStoreTags(chance.integer({ min: 1, max: 10 }), true);

    expect(await storeTagService.exists(createCriteria(storeTags.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store tag match provided criteria', async () => {
    expect(await storeTagService.count(createCriteria())).toBe(0);
  });

  test('should return the count of store tag match provided criteria', async () => {
    const storeTags = await createStoreTags(chance.integer({ min: 1, max: 10 }), true);

    expect(await storeTagService.count(createCriteria(storeTags.first()))).toBe(storeTags.count());
  });
});
