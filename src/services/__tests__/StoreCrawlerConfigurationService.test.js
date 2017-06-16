// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StoreCrawlerConfigurationService } from '../';
import { createStoreCrawlerConfigurationInfo } from '../../schema/__tests__/StoreCrawlerConfiguration.test';

function expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId) {
  expect(storeCrawlerConfigurationInfo.get('id')).toBe(storeCrawlerConfigurationId);
  expect(storeCrawlerConfigurationInfo.get('key')).toBe(expectedStoreCrawlerConfigurationInfo.get('key'));
}

function createCriteria() {
  return Map({
    fields: List.of('key', 'config'),
    conditions: Map({
      key: uuid(),
      config: Map({
        val: uuid(),
      }),
    }),
  });
}

function createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo) {
  return Map({
    fields: List.of('key', 'config'),
    conditions: Map({
      key: storeCrawlerConfigurationInfo.get('key'),
      config: storeCrawlerConfigurationInfo.get('config'),
    }),
  });
}

describe('create', () => {
  test('should return the created store crawler configuration Id', async () => {
    const result = await StoreCrawlerConfigurationService.create(createStoreCrawlerConfigurationInfo());

    expect(result).toBeDefined();
  });

  test('should create the store crawler configuration', async () => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    const storeCrawlerConfigurationId = await StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo);
    const storeCrawlerConfigurationInfo = await StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);

    expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId);
  });
});

describe('read', () => {
  test('should reject if the provided store crawler configuration Id does not exist', async () => {
    const storeCrawlerConfigurationId = uuid();

    try {
      await StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store crawler configuration found with Id: ${storeCrawlerConfigurationId}`);
    }
  });

  test('should read the existing store crawler configuration', async () => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    const storeCrawlerConfigurationId = await StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo);
    const storeCrawlerConfigurationInfo = await StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);

    expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId);
  });
});

describe('update', () => {
  test('should reject if the provided store crawler configuration Id does not exist', async () => {
    const storeCrawlerConfigurationId = uuid();

    try {
      await StoreCrawlerConfigurationService.update(createStoreCrawlerConfigurationInfo().set('id', storeCrawlerConfigurationId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store crawler configuration found with Id: ${storeCrawlerConfigurationId}`);
    }
  });

  test('should return the Id of the updated store crawler configuration', async () => {
    const storeCrawlerConfigurationId = await StoreCrawlerConfigurationService.create(createStoreCrawlerConfigurationInfo());
    const id = await StoreCrawlerConfigurationService.update(createStoreCrawlerConfigurationInfo().set('id', storeCrawlerConfigurationId));

    expect(id).toBe(storeCrawlerConfigurationId);
  });

  test('should update the existing store crawler configuration', async () => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    const id = await StoreCrawlerConfigurationService.create(createStoreCrawlerConfigurationInfo());
    const storeCrawlerConfigurationId = await StoreCrawlerConfigurationService.update(expectedStoreCrawlerConfigurationInfo.set('id', id));
    const storeCrawlerConfigurationInfo = await StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);

    expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId);
  });
});

describe('delete', () => {
  test('should reject if the provided store crawler configuration Id does not exist', async () => {
    const storeCrawlerConfigurationId = uuid();

    try {
      await StoreCrawlerConfigurationService.delete(storeCrawlerConfigurationId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store crawler configuration found with Id: ${storeCrawlerConfigurationId}`);
    }
  });

  test('should delete the existing store crawler configuration', async () => {
    const storeCrawlerConfigurationId = await StoreCrawlerConfigurationService.create(createStoreCrawlerConfigurationInfo());
    await StoreCrawlerConfigurationService.delete(storeCrawlerConfigurationId);

    try {
      await StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No store crawler configuration found with Id: ${storeCrawlerConfigurationId}`);
    }
  });
});

describe('search', () => {
  test('should return no store crawler configuration if provided criteria matches no store crawler configuration', async () => {
    const storeCrawlerConfigurationInfos = await StoreCrawlerConfigurationService.search(createCriteria());

    expect(storeCrawlerConfigurationInfos.count()).toBe(0);
  });

  test('should return the storeCrawlerConfigurations matches the criteria', async () => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    const storeCrawlerConfigurationId = await StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo);
    const storeCrawlerConfigurationInfos = await StoreCrawlerConfigurationService.search(
      createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(expectedStoreCrawlerConfigurationInfo),
    );

    expect(storeCrawlerConfigurationInfos.count()).toBe(1);

    const storeCrawlerConfigurationInfo = storeCrawlerConfigurationInfos.first();
    expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId);
  });
});

describe('searchAll', () => {
  test('should return no store crawler configuration if provided criteria matches no store crawler configuration', async () => {
    const result = StoreCrawlerConfigurationService.searchAll(createCriteria());

    try {
      let storeCrawlerConfigurations = List();

      result.event.subscribe(info => (storeCrawlerConfigurations = storeCrawlerConfigurations.push(info)));

      await result.promise;
      expect(storeCrawlerConfigurations.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the storeCrawlerConfigurations matches the criteria', async () => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    const storeCrawlerConfigurationId1 = await StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo);
    const storeCrawlerConfigurationId2 = await StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo);

    const result = StoreCrawlerConfigurationService.searchAll(
      createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(expectedStoreCrawlerConfigurationInfo),
    );
    try {
      let storeCrawlerConfigurations = List();

      result.event.subscribe(info => (storeCrawlerConfigurations = storeCrawlerConfigurations.push(info)));

      await result.promise;
      expect(storeCrawlerConfigurations.count()).toBe(2);
      expect(storeCrawlerConfigurations.find(_ => _.get('id').localeCompare(storeCrawlerConfigurationId1) === 0)).toBeTruthy();
      expect(storeCrawlerConfigurations.find(_ => _.get('id').localeCompare(storeCrawlerConfigurationId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no store crawler configuration match provided criteria', async () => {
    const response = await StoreCrawlerConfigurationService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any store crawler configuration match provided criteria', async () => {
    const storeCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();

    await StoreCrawlerConfigurationService.create(storeCrawlerConfigurationInfo);
    const response = StoreCrawlerConfigurationService.exists(createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store crawler configuration match provided criteria', async () => {
    const response = await StoreCrawlerConfigurationService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of store crawler configuration match provided criteria', async () => {
    const storeCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();

    await StoreCrawlerConfigurationService.create(storeCrawlerConfigurationInfo);
    await StoreCrawlerConfigurationService.create(storeCrawlerConfigurationInfo);

    const response = await StoreCrawlerConfigurationService.count(
      createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo),
    );

    expect(response).toBe(2);
  });
});
