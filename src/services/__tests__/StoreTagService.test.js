// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StoreService, TagService, StoreTagService } from '../';
import { createStoreInfo } from '../../schema/__tests__/Store.test';
import { createTagInfo } from '../../schema/__tests__/Tag.test';
import { createStoreTagInfo } from '../../schema/__tests__/StoreTag.test';

function expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId) {
  expect(storeTagInfo.get('id')).toBe(storeTagId);
  expect(storeTagInfo.get('key')).toBe(expectedStoreTagInfo.get('key'));
  expect(storeTagInfo.get('description')).toBe(expectedStoreTagInfo.get('description'));
  expect(storeTagInfo.get('weight')).toBe(expectedStoreTagInfo.get('weight'));
  expect(storeTagInfo.get('url')).toBe(expectedStoreTagInfo.get('url'));
}

function createCriteria() {
  return Map({
    fields: List.of('key', 'description', 'weight', 'url', 'store', 'tag'),
    conditions: Map({
      key: uuid(),
      description: uuid(),
      weight: 1,
      url: uuid(),
    }),
  });
}

function createCriteriaUsingProvidedStoreTagInfo(storeTagInfo) {
  return Map({
    fields: List.of('key', 'description', 'weight', 'url', 'store', 'tag'),
    conditions: Map({
      key: storeTagInfo.get('key'),
      description: storeTagInfo.get('description'),
      weigth: storeTagInfo.get('weight'),
      url: storeTagInfo.get('url'),
      storeId: storeTagInfo.get('storeId'),
      tagId: storeTagInfo.get('tagId'),
    }),
  });
}

describe('create', () => {
  test('should return the created store tag Id', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const result = await StoreTagService.create(createStoreTagInfo(storeId, tagId));

    expect(result).toBeDefined();
  });

  test('should create the tag', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const expectedStoreTagInfo = createStoreTagInfo(tagId, storeId);
    const storeTagId = await StoreTagService.create(expectedStoreTagInfo);
    const storeTagInfo = await StoreTagService.read(storeTagId);

    expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId);
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

  test('should read the existing tag', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const expectedStoreTagInfo = createStoreTagInfo(tagId, storeId);
    const storeTagId = await StoreTagService.create(expectedStoreTagInfo);
    const storeTagInfo = await StoreTagService.read(storeTagId);

    expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId);
  });
});

describe('update', () => {
  test('should reject if the provided store tag Id does not exist', async () => {
    const storeTagId = uuid();

    try {
      const storeId = await StoreService.create(createStoreInfo());
      const tagId = await TagService.create(createTagInfo());

      await StoreTagService.update(createStoreTagInfo(storeId, tagId).set('id', storeTagId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });

  test('should return the Id of the updated tag', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const storeTagId = await StoreTagService.create(createStoreTagInfo(storeId, tagId));
    const id = await StoreTagService.update(createStoreTagInfo().set('id', storeTagId));

    expect(id).toBe(storeTagId);
  });

  test('should update the existing tag', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const expectedStoreTagInfo = createStoreTagInfo(storeId, tagId);
    const id = await StoreTagService.create(createStoreTagInfo());
    const storeTagId = await StoreTagService.update(expectedStoreTagInfo.set('id', id));
    const storeTagInfo = await StoreTagService.read(storeTagId);

    expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId);
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

  test('should delete the existing tag', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const storeTagId = await StoreTagService.create(createStoreTagInfo(tagId, storeId));
    await StoreTagService.delete(storeTagId);

    try {
      await StoreTagService.read(storeTagId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store tag found with Id: ${storeTagId}`);
    }
  });
});

describe('search', () => {
  test('should return no store tag if provided criteria matches no tag', async () => {
    const storeTagInfos = await StoreTagService.search(createCriteria());

    expect(storeTagInfos.count()).toBe(0);
  });

  test('should return the store tags matches the criteria', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const expectedStoreTagInfo = createStoreTagInfo(tagId, storeId);
    const storeTagId = await StoreTagService.create(expectedStoreTagInfo);
    const storeTagInfos = await StoreTagService.search(createCriteriaUsingProvidedStoreTagInfo(expectedStoreTagInfo));

    expect(storeTagInfos.count()).toBe(1);

    const storeTagInfo = storeTagInfos.first();
    expectStoreTagInfo(storeTagInfo, expectedStoreTagInfo, storeTagId);
  });
});

describe('searchAll', () => {
  test('should return no store tag if provided criteria matches no tag', async () => {
    const result = StoreTagService.searchAll(createCriteria());

    try {
      let storeTags = List();

      result.event.subscribe(info => (storeTags = storeTags.push(info)));

      await result.promise;
      expect(storeTags.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the store tags matches the criteria', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const expectedStoreTagInfo = createStoreTagInfo(tagId, storeId);
    const storeTagId1 = await StoreTagService.create(expectedStoreTagInfo);
    const storeTagId2 = await StoreTagService.create(expectedStoreTagInfo);

    const result = StoreTagService.searchAll(createCriteriaUsingProvidedStoreTagInfo(expectedStoreTagInfo));
    try {
      let storeTags = List();

      result.event.subscribe(info => (storeTags = storeTags.push(info)));

      await result.promise;
      expect(storeTags.count()).toBe(2);
      expect(storeTags.find(_ => _.get('id').localeCompare(storeTagId1) === 0)).toBeTruthy();
      expect(storeTags.find(_ => _.get('id').localeCompare(storeTagId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no store tag match provided criteria', async () => {
    const response = await StoreTagService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any store tag match provided criteria', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const storeTagInfo = createStoreTagInfo(storeId, tagId);

    await StoreTagService.create(storeTagInfo);
    const response = StoreTagService.exists(createCriteriaUsingProvidedStoreTagInfo(storeTagInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store tag match provided criteria', async () => {
    const response = await StoreTagService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of store tag match provided criteria', async () => {
    const storeId = await StoreService.create(createStoreInfo());
    const tagId = await TagService.create(createTagInfo());
    const storeTagInfo = createStoreTagInfo(storeId, tagId);

    await StoreTagService.create(storeTagInfo);
    await StoreTagService.create(storeTagInfo);

    const response = await StoreTagService.count(createCriteriaUsingProvidedStoreTagInfo(storeTagInfo));

    expect(response).toBe(2);
  });
});
