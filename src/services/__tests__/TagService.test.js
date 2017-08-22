// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { TagService } from '../';
import { createTagInfo, expectTag } from '../../schema/__tests__/Tag.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('key', 'name', 'description', 'imageUrl', 'level', 'forDisplay', 'parentTag'),
    includeParentTag: true,
  });

const createCriteria = tag =>
  Map({
    conditions: Map({
      key: tag ? tag.get('key') : uuid(),
      name: tag ? tag.get('name') : uuid(),
      description: tag ? tag.get('description') : uuid(),
      imageUrl: tag ? tag.get('imageUrl') : uuid(),
      level: tag ? tag.get('level') : chance.integer({ min: 1, max: 1000 }),
      forDisplay: tag ? tag.get('forDisplay') : chance.integer({ min: 1, max: 1000 }) % 2 === 0,
      parentTagId: tag && tag.get('parentTagId') ? tag.get('parentTagId') : undefined,
    }),
  }).merge(createCriteriaWthoutConditions());

const createTags = async (count, useSameInfo = false, createParentTag = true) => {
  const parentTag = createParentTag ? await createTags(1, false, false) : undefined;
  let tag;

  if (useSameInfo) {
    const { tag: tempTag } = await createTagInfo();

    tag = tempTag;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalTag;

          if (useSameInfo) {
            finalTag = tag;
          } else {
            const { tag: tempTag } = await createTagInfo();

            finalTag = tempTag;
          }

          return TagService.read(
            await TagService.create(createParentTag ? finalTag.merge(Map({ parentTagId: parentTag.get('id') })) : finalTag),
            createCriteriaWthoutConditions(),
          );
        })
        .toArray(),
    ),
  );
};

export default createTags;

describe('create', () => {
  test('should return the created tag Id', async () => {
    const tagId = await TagService.create((await createTagInfo()).tag);

    expect(tagId).toBeDefined();
  });

  test('should create the tag', async () => {
    const { tag } = await createTagInfo();
    const tagId = await TagService.create(tag);
    const fetchedTag = await TagService.read(tagId, createCriteriaWthoutConditions());

    expect(fetchedTag).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided tag Id does not exist', async () => {
    const tagId = uuid();

    try {
      await TagService.read(tagId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag found with Id: ${tagId}`);
    }
  });

  test('should read the existing tag', async () => {
    const { tag: expectedTag } = await createTagInfo();
    const tagId = await TagService.create(expectedTag);
    const tag = await TagService.read(tagId, createCriteriaWthoutConditions());

    expectTag(tag, expectedTag);
  });
});

describe('update', () => {
  test('should reject if the provided tag Id does not exist', async () => {
    const tagId = uuid();

    try {
      const tag = await TagService.read(await TagService.create((await createTagInfo()).tag), createCriteriaWthoutConditions());

      await TagService.update(tag.set('id', tagId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag found with Id: ${tagId}`);
    }
  });

  test('should return the Id of the updated tag', async () => {
    const { tag: expectedTag } = await createTagInfo();
    const tagId = await TagService.create((await createTagInfo()).tag);
    const id = await TagService.update(expectedTag.set('id', tagId));

    expect(id).toBe(tagId);
  });

  test('should update the existing tag', async () => {
    const { tag: expectedTag } = await createTagInfo();
    const tagId = await TagService.create((await createTagInfo()).tag);

    await TagService.update(expectedTag.set('id', tagId));

    const tag = await TagService.read(tagId, createCriteriaWthoutConditions());

    expectTag(tag, expectedTag);
  });
});

describe('delete', () => {
  test('should reject if the provided tag Id does not exist', async () => {
    const tagId = uuid();

    try {
      await TagService.delete(tagId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag found with Id: ${tagId}`);
    }
  });

  test('should delete the existing tag', async () => {
    const tagId = await TagService.create((await createTagInfo()).tag);
    await TagService.delete(tagId);

    try {
      await TagService.delete(tagId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag found with Id: ${tagId}`);
    }
  });
});

describe('search', () => {
  test('should return no tag if provided criteria matches no tag', async () => {
    const tags = await TagService.search(createCriteria());

    expect(tags.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { tag: expectedTag } = await createTagInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => TagService.create(expectedTag)).toArray()),
    );
    const tags = await TagService.search(createCriteria(expectedTag));

    expect(tags.count).toBe(results.count);
    tags.forEach((tag) => {
      expect(results.find(_ => _.localeCompare(tag.get('id')) === 0)).toBeDefined();
      expectTag(tag, expectedTag);
    });
  });
});

describe('searchAll', () => {
  test('should return no tag if provided criteria matches no tag', async () => {
    let tags = List();
    const result = TagService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        tags = tags.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(tags.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { tag: expectedTag } = await createTagInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => TagService.create(expectedTag)).toArray()),
    );

    let tags = List();
    const result = TagService.searchAll(createCriteria(expectedTag));

    try {
      result.event.subscribe((info) => {
        tags = tags.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(tags.count).toBe(results.count);
    tags.forEach((tag) => {
      expect(results.find(_ => _.localeCompare(tag.get('id')) === 0)).toBeDefined();
      expectTag(tag, expectedTag);
    });
  });
});

describe('exists', () => {
  test('should return false if no tag match provided criteria', async () => {
    expect(await TagService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any tag match provided criteria', async () => {
    const tags = await createTags(chance.integer({ min: 1, max: 10 }), true);

    expect(await TagService.exists(createCriteria(tags.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no tag match provided criteria', async () => {
    expect(await TagService.count(createCriteria())).toBe(0);
  });

  test('should return the count of tag match provided criteria', async () => {
    const tags = await createTags(chance.integer({ min: 1, max: 10 }), true);

    expect(await TagService.count(createCriteria(tags.first()))).toBe(tags.count());
  });
});
