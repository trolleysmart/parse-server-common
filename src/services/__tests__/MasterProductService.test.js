// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { MasterProductService, TagService } from '../';
import { createMasterProductInfo } from '../../schema/__tests__/MasterProduct.test';
import { createTagInfo } from '../../schema/__tests__/Tag.test';

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId) {
  expect(masterProductInfo.get('id')).toBe(masterProductId);
  expect(masterProductInfo.get('name')).toBe(expectedMasterProductInfo.get('name'));
  expect(masterProductInfo.get('description')).toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('barcode')).toBe(expectedMasterProductInfo.get('barcode'));
  expect(masterProductInfo.get('imageUrl')).toBe(expectedMasterProductInfo.get('imageUrl'));
  expect(masterProductInfo.get('tagIds')).toEqual(expectedMasterProductInfo.get('tagIds'));
}

export function createCriteria() {
  return Map({
    fields: List.of('name', 'description', 'barcode', 'imageUrl', 'tags'),
    includeTags: true,
    conditions: Map({
      name: uuid(),
      description: uuid(),
      barcode: uuid(),
      imageUrl: uuid(),
    }),
  });
}

export function createCriteriaUsingProvidedMasterProductInfo(masterProductInfo) {
  return Map({
    fields: List.of('name', 'description', 'barcode', 'imageUrl', 'tags'),
    includeTags: true,
    conditions: Map({
      name: masterProductInfo.get('name'),
      description: masterProductInfo.get('description'),
      barcode: masterProductInfo.get('barcode'),
      imageUrl: masterProductInfo.get('imageUrl'),
      tags: masterProductInfo.get('tags'),
    }),
  });
}

describe('create', () => {
  test('should return the created master product Id', async () => {
    const result = await MasterProductService.create(createMasterProductInfo());

    expect(result).toBeDefined();
  });

  test('should create the master product', async () => {
    const tagId1 = await TagService.create(createTagInfo());
    const tagId2 = await TagService.create(createTagInfo());
    const expectedMasterProductInfo = createMasterProductInfo(List.of(tagId1, tagId2));
    const masterProductId = await MasterProductService.create(expectedMasterProductInfo);
    const masterProductInfo = await MasterProductService.read(masterProductId);

    expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
  });
});

describe('read', () => {
  test('should reject if the provided master product Id does not exist', async () => {
    const masterProductId = uuid();

    try {
      await MasterProductService.read(masterProductId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No master product found with Id: ${masterProductId}`);
    }
  });

  test('should read the existing master product', async () => {
    const tagId1 = await TagService.create(createTagInfo());
    const tagId2 = await TagService.create(createTagInfo());
    const expectedMasterProductInfo = createMasterProductInfo(List.of(tagId1, tagId2));
    const masterProductId = await MasterProductService.create(expectedMasterProductInfo);
    const masterProductInfo = await MasterProductService.read(masterProductId);

    expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
  });
});

describe('update', () => {
  test('should reject if the provided master product Id does not exist', async () => {
    const masterProductId = uuid();

    try {
      await MasterProductService.update(createMasterProductInfo().set('id', masterProductId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No master product found with Id: ${masterProductId}`);
    }
  });

  test('should return the Id of the updated master product', async () => {
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    const id = await MasterProductService.update(createMasterProductInfo().set('id', masterProductId));

    expect(id).toBe(masterProductId);
  });

  test('should update the existing master product', async () => {
    const tagId1 = await TagService.create(createTagInfo());
    const tagId2 = await TagService.create(createTagInfo());
    const id = await MasterProductService.create(createMasterProductInfo());
    const expectedMasterProductInfo = createMasterProductInfo(List.of(tagId1, tagId2));
    const masterProductId = await MasterProductService.update(expectedMasterProductInfo.set('id', id));
    const masterProductInfo = await MasterProductService.read(masterProductId);

    expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
  });
});

describe('delete', () => {
  test('should reject if the provided master product Id does not exist', async () => {
    const masterProductId = uuid();

    try {
      await MasterProductService.delete(masterProductId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No master product found with Id: ${masterProductId}`);
    }
  });

  test('should delete the existing master product', async () => {
    const masterProductId = await MasterProductService.create(createMasterProductInfo());
    await MasterProductService.delete(masterProductId);

    try {
      await MasterProductService.delete(masterProductId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No master product found with Id: ${masterProductId}`);
    }
  });
});

describe('search', () => {
  test('should return no master product if provided criteria matches no master product', async () => {
    const masterProductInfos = await MasterProductService.search(createCriteria());

    expect(masterProductInfos.count()).toBe(0);
  });

  test('should return the master products matches the criteria', async () => {
    const tagId1 = await TagService.create(createTagInfo());
    const tagId2 = await TagService.create(createTagInfo());
    const expectedMasterProductInfo = createMasterProductInfo(List.of(tagId1, tagId2));
    const masterProductId = await MasterProductService.create(expectedMasterProductInfo);
    const masterProductInfos = await MasterProductService.search(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));

    expect(masterProductInfos.count()).toBe(1);

    const masterProductInfo = masterProductInfos.first();

    expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
  });
});

describe('searchAll', () => {
  test('should return no master product if provided criteria matches no master product', async () => {
    const result = MasterProductService.searchAll(createCriteria());

    try {
      let masterProductInfos = List();

      result.event.subscribe(info => (masterProductInfos = masterProductInfos.push(info)));

      await result.promise;
      expect(masterProductInfos.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the master products matches the criteria', async () => {
    const tagId1 = await TagService.create(createTagInfo());
    const tagId2 = await TagService.create(createTagInfo());
    const expectedMasterProductInfo = createMasterProductInfo(List.of(tagId1, tagId2));
    const masterProductId1 = await MasterProductService.create(expectedMasterProductInfo);
    const masterProductId2 = await MasterProductService.create(expectedMasterProductInfo);
    const result = MasterProductService.searchAll(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));

    try {
      let masterProductInfos = List();

      result.event.subscribe(info => (masterProductInfos = masterProductInfos.push(info)));

      await result.promise;
      expect(masterProductInfos.count()).toBe(2);
      expect(masterProductInfos.find(_ => _.get('id').localeCompare(masterProductId1) === 0)).toBeTruthy();
      expect(masterProductInfos.find(_ => _.get('id').localeCompare(masterProductId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no master product match provided criteria', async () => {
    const response = await MasterProductService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any master product match provided criteria', async () => {
    const masterProductInfo = createMasterProductInfo();

    await MasterProductService.create(masterProductInfo);

    const response = await MasterProductService.exists(createCriteriaUsingProvidedMasterProductInfo(masterProductInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no master product match provided criteria', async () => {
    const response = await MasterProductService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of master product match provided criteria', async () => {
    const crawlSessionInfo = createMasterProductInfo();

    await MasterProductService.create(crawlSessionInfo);
    await MasterProductService.create(crawlSessionInfo);

    const response = await MasterProductService.count(createCriteriaUsingProvidedMasterProductInfo(crawlSessionInfo));

    expect(response).toBe(2);
  });
});
