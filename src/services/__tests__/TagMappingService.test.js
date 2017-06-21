// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { TagService, TagMappingService } from '../';
import { createTagInfo } from '../../schema/__tests__/Tag.test';
import { createTagMappingInfo } from '../../schema/__tests__/TagMapping.test';

function expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId) {
  expect(tagMappingInfo.get('id')).toBe(tagMappingId);
  expect(tagMappingInfo.get('key')).toBe(expectedTagMappingInfo.get('key'));
  expect(tagMappingInfo.get('description')).toBe(expectedTagMappingInfo.get('description'));
  expect(tagMappingInfo.get('weight')).toBe(expectedTagMappingInfo.get('weight'));
}

function createCriteria() {
  return Map({
    fields: List.of('key', 'description', 'weight', 'tag'),
    conditions: Map({
      key: uuid(),
      description: uuid(),
      weight: 1,
    }),
  });
}

function createCriteriaUsingProvidedTagMappingInfo(tagMappingInfo) {
  return Map({
    fields: List.of('key', 'description', 'weight', 'tag'),
    conditions: Map({
      key: tagMappingInfo.get('key'),
      description: tagMappingInfo.get('description'),
      weigth: tagMappingInfo.get('weight'),
    }),
  });
}

describe('create', () => {
  test('should return the created tag mapping Id', async () => {
    const tagId = await TagService.create(createTagInfo());
    const result = await TagMappingService.create(createTagMappingInfo(tagId));

    expect(result).toBeDefined();
  });

  test('should create the tag', async () => {
    const tagId = await TagService.create(createTagInfo());
    const expectedTagMappingInfo = createTagMappingInfo(tagId);
    const tagMappingId = await TagMappingService.create(expectedTagMappingInfo);
    const tagMappingInfo = await TagMappingService.read(tagMappingId);

    expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId);
  });
});

describe('read', () => {
  test('should reject if the provided tag mapping Id does not exist', async () => {
    const tagMappingId = uuid();

    try {
      await TagMappingService.read(tagMappingId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag mapping found with Id: ${tagMappingId}`);
    }
  });

  test('should read the existing tag', async () => {
    const tagId = await TagService.create(createTagInfo());
    const expectedTagMappingInfo = createTagMappingInfo(tagId);
    const tagMappingId = await TagMappingService.create(expectedTagMappingInfo);
    const tagMappingInfo = await TagMappingService.read(tagMappingId);

    expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId);
  });
});

describe('update', () => {
  test('should reject if the provided tag mapping Id does not exist', async () => {
    const tagMappingId = uuid();

    try {
      const tagId = await TagService.create(createTagInfo());

      await TagMappingService.update(createTagMappingInfo(tagId).set('id', tagMappingId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag mapping found with Id: ${tagMappingId}`);
    }
  });

  test('should return the Id of the updated tag', async () => {
    const tagId = await TagService.create(createTagInfo());
    const tagMappingId = await TagMappingService.create(createTagMappingInfo(tagId));
    const id = await TagMappingService.update(createTagMappingInfo().set('id', tagMappingId));

    expect(id).toBe(tagMappingId);
  });

  test('should update the existing tag', async () => {
    const tagId = await TagService.create(createTagInfo());
    const expectedTagMappingInfo = createTagMappingInfo(tagId);
    const id = await TagMappingService.create(createTagMappingInfo());
    const tagMappingId = await TagMappingService.update(expectedTagMappingInfo.set('id', id));
    const tagMappingInfo = await TagMappingService.read(tagMappingId);

    expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId);
  });
});

describe('delete', () => {
  test('should reject if the provided tag mapping Id does not exist', async () => {
    const tagMappingId = uuid();

    try {
      await TagMappingService.delete(tagMappingId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag mapping found with Id: ${tagMappingId}`);
    }
  });

  test('should delete the existing tag', async () => {
    const tagId = await TagService.create(createTagInfo());
    const tagMappingId = await TagMappingService.create(createTagMappingInfo(tagId));
    await TagMappingService.delete(tagMappingId);

    try {
      await TagMappingService.read(tagMappingId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag mapping found with Id: ${tagMappingId}`);
    }
  });
});

describe('search', () => {
  test('should return no tag mapping if provided criteria matches no tag', async () => {
    const tagMappingInfos = await TagMappingService.search(createCriteria());

    expect(tagMappingInfos.count()).toBe(0);
  });

  test('should return the tag mappings matches the criteria', async () => {
    const tagId = await TagService.create(createTagInfo());
    const expectedTagMappingInfo = createTagMappingInfo(tagId);
    const tagMappingId = await TagMappingService.create(expectedTagMappingInfo);
    const tagMappingInfos = await TagMappingService.search(createCriteriaUsingProvidedTagMappingInfo(expectedTagMappingInfo));

    expect(tagMappingInfos.count()).toBe(1);

    const tagMappingInfo = tagMappingInfos.first();
    expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId);
  });
});

describe('searchAll', () => {
  test('should return no tag mapping if provided criteria matches no tag', async () => {
    const result = TagMappingService.searchAll(createCriteria());

    try {
      let tagMappings = List();

      result.event.subscribe(info => (tagMappings = tagMappings.push(info)));

      await result.promise;
      expect(tagMappings.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the tag mappings matches the criteria', async () => {
    const tagId = await TagService.create(createTagInfo());
    const expectedTagMappingInfo = createTagMappingInfo(tagId);
    const tagMappingId1 = await TagMappingService.create(expectedTagMappingInfo);
    const tagMappingId2 = await TagMappingService.create(expectedTagMappingInfo);

    const result = TagMappingService.searchAll(createCriteriaUsingProvidedTagMappingInfo(expectedTagMappingInfo));
    try {
      let tagMappings = List();

      result.event.subscribe(info => (tagMappings = tagMappings.push(info)));

      await result.promise;
      expect(tagMappings.count()).toBe(2);
      expect(tagMappings.find(_ => _.get('id').localeCompare(tagMappingId1) === 0)).toBeTruthy();
      expect(tagMappings.find(_ => _.get('id').localeCompare(tagMappingId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no tag mapping match provided criteria', async () => {
    const response = await TagMappingService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any tag mapping match provided criteria', async () => {
    const tagId = await TagService.create(createTagInfo());
    const tagMappingInfo = createTagMappingInfo(tagId);

    await TagMappingService.create(tagMappingInfo);
    const response = TagMappingService.exists(createCriteriaUsingProvidedTagMappingInfo(tagMappingInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no tag mapping match provided criteria', async () => {
    const response = await TagMappingService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of tag mapping match provided criteria', async () => {
    const tagId = await TagService.create(createTagInfo());
    const tagMappingInfo = createTagMappingInfo(tagId);

    await TagMappingService.create(tagMappingInfo);
    await TagMappingService.create(tagMappingInfo);

    const response = await TagMappingService.count(createCriteriaUsingProvidedTagMappingInfo(tagMappingInfo));

    expect(response).toBe(2);
  });
});
