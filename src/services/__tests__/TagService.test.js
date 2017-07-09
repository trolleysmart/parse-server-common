// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { TagService } from '../';
import { createTagInfo } from '../../schema/__tests__/Tag.test';

function expectTagInfo(tagInfo, expectedTagInfo, tagId) {
  expect(tagInfo.get('id')).toBe(tagId);
  expect(tagInfo.get('key')).toBe(expectedTagInfo.get('key'));
  expect(tagInfo.get('name')).toBe(expectedTagInfo.get('name'));
  expect(tagInfo.get('weight')).toBe(expectedTagInfo.get('weight'));
  expect(tagInfo.get('forDisplay')).toBe(expectedTagInfo.get('forDisplay'));
}

function createCriteria() {
  return Map({
    fields: List.of('key', 'name', 'weight', 'forDisplay'),
    conditions: Map({
      key: uuid(),
      name: uuid(),
      weight: 1,
      forDisplay: true,
    }),
  });
}

function createCriteriaUsingProvidedTagInfo(tagInfo) {
  return Map({
    fields: List.of('key', 'name', 'weight', 'forDisplay'),
    conditions: Map({
      key: tagInfo.get('key'),
      name: tagInfo.get('name'),
      weigth: tagInfo.get('weight'),
      forDisplay: tagInfo.get('forDisplay'),
    }),
  });
}

describe('create', () => {
  test('should return the created tag Id', async () => {
    const result = await TagService.create(createTagInfo());

    expect(result).toBeDefined();
  });

  test('should create the tag', async () => {
    const expectedTagInfo = createTagInfo();
    const tagId = await TagService.create(expectedTagInfo);
    const tagInfo = await TagService.read(tagId);

    expectTagInfo(tagInfo, expectedTagInfo, tagId);
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
    const expectedTagInfo = createTagInfo();
    const tagId = await TagService.create(expectedTagInfo);
    const tagInfo = await TagService.read(tagId);

    expectTagInfo(tagInfo, expectedTagInfo, tagId);
  });
});

describe('update', () => {
  test('should reject if the provided tag Id does not exist', async () => {
    const tagId = uuid();

    try {
      await TagService.update(createTagInfo().set('id', tagId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag found with Id: ${tagId}`);
    }
  });

  test('should return the Id of the updated tag', async () => {
    const tagId = await TagService.create(createTagInfo());
    const id = await TagService.update(createTagInfo().set('id', tagId));

    expect(id).toBe(tagId);
  });

  test('should update the existing tag', async () => {
    const expectedTagInfo = createTagInfo();
    const id = await TagService.create(createTagInfo());
    const tagId = await TagService.update(expectedTagInfo.set('id', id));
    const tagInfo = await TagService.read(tagId);

    expectTagInfo(tagInfo, expectedTagInfo, tagId);
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
    const tagId = await TagService.create(createTagInfo());
    await TagService.delete(tagId);

    try {
      await TagService.read(tagId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No tag found with Id: ${tagId}`);
    }
  });
});

describe('search', () => {
  test('should return no tag if provided criteria matches no tag', async () => {
    const tagInfos = await TagService.search(createCriteria());

    expect(tagInfos.count()).toBe(0);
  });

  test('should return the tags matches the criteria', async () => {
    const expectedTagInfo = createTagInfo();
    const tagId = await TagService.create(expectedTagInfo);
    const tagInfos = await TagService.search(createCriteriaUsingProvidedTagInfo(expectedTagInfo));

    expect(tagInfos.count()).toBe(1);

    const tagInfo = tagInfos.first();
    expectTagInfo(tagInfo, expectedTagInfo, tagId);
  });
});

describe('searchAll', () => {
  test('should return no tag if provided criteria matches no tag', async () => {
    const result = TagService.searchAll(createCriteria());

    try {
      let tags = List();

      result.event.subscribe(info => (tags = tags.push(info)));

      await result.promise;
      expect(tags.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the tags matches the criteria', async () => {
    const expectedTagInfo = createTagInfo();
    const tagId1 = await TagService.create(expectedTagInfo);
    const tagId2 = await TagService.create(expectedTagInfo);

    const result = TagService.searchAll(createCriteriaUsingProvidedTagInfo(expectedTagInfo));
    try {
      let tags = List();

      result.event.subscribe(info => (tags = tags.push(info)));

      await result.promise;
      expect(tags.count()).toBe(2);
      expect(tags.find(_ => _.get('id').localeCompare(tagId1) === 0)).toBeTruthy();
      expect(tags.find(_ => _.get('id').localeCompare(tagId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no tag match provided criteria', async () => {
    const response = await TagService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any tag match provided criteria', async () => {
    const tagInfo = createTagInfo();

    await TagService.create(tagInfo);
    const response = TagService.exists(createCriteriaUsingProvidedTagInfo(tagInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no tag match provided criteria', async () => {
    const response = await TagService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of tag match provided criteria', async () => {
    const tagInfo = createTagInfo();

    await TagService.create(tagInfo);
    await TagService.create(tagInfo);

    const response = await TagService.count(createCriteriaUsingProvidedTagInfo(tagInfo));

    expect(response).toBe(2);
  });
});
