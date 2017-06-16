// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleTemplateService } from '../';
import { createStapleTemplateInfo } from '../../schema/__tests__/StapleTemplate.test';

function expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId) {
  expect(stapleTemplateInfo.get('id')).toBe(stapleTemplateId);
  expect(stapleTemplateInfo.get('name')).toBe(expectedStapleTemplateInfo.get('name'));
}

function createCriteria() {
  return Map({
    fields: List.of('name'),
    conditions: Map({
      name: uuid(),
    }),
  });
}

function createCriteriaUsingProvidedStapleTemplateInfo(stapleTemplateInfo) {
  return Map({
    fields: List.of('name'),
    conditions: Map({
      name: stapleTemplateInfo.get('name'),
    }),
  });
}

describe('create', () => {
  test('should return the created staple template Id', async () => {
    const result = await StapleTemplateService.create(createStapleTemplateInfo());

    expect(result).toBeDefined();
  });

  test('should create the staple template', async () => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();
    const stapleTemplateId = await StapleTemplateService.create(expectedStapleTemplateInfo);
    const stapleTemplateInfo = await StapleTemplateService.read(stapleTemplateId);

    expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
  });
});

describe('read', () => {
  test('should reject if the provided staple template Id does not exist', async () => {
    const stapleTemplateId = uuid();

    try {
      await StapleTemplateService.read(stapleTemplateId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple template found with Id: ${stapleTemplateId}`);
    }
  });

  test('should read the existing staple template', async () => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();
    const stapleTemplateId = await StapleTemplateService.create(expectedStapleTemplateInfo);
    const stapleTemplateInfo = await StapleTemplateService.read(stapleTemplateId);

    expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
  });
});

describe('update', () => {
  test('should reject if the provided staple template Id does not exist', async () => {
    const stapleTemplateId = uuid();

    try {
      await StapleTemplateService.update(createStapleTemplateInfo().set('id', stapleTemplateId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple template found with Id: ${stapleTemplateId}`);
    }
  });

  test('should return the Id of the updated staple template', async () => {
    const stapleTemplateId = await StapleTemplateService.create(createStapleTemplateInfo());
    const id = await StapleTemplateService.update(createStapleTemplateInfo().set('id', stapleTemplateId));

    expect(id).toBe(stapleTemplateId);
  });

  test('should update the existing staple template', async () => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();
    const id = await StapleTemplateService.create(createStapleTemplateInfo());
    const stapleTemplateId = await StapleTemplateService.update(expectedStapleTemplateInfo.set('id', id));
    const stapleTemplateInfo = await StapleTemplateService.read(stapleTemplateId);

    expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
  });
});

describe('delete', () => {
  test('should reject if the provided staple template Id does not exist', async () => {
    const stapleTemplateId = uuid();

    try {
      await StapleTemplateService.delete(stapleTemplateId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple template found with Id: ${stapleTemplateId}`);
    }
  });

  test('should delete the existing staple template', async () => {
    const stapleTemplateId = await StapleTemplateService.create(createStapleTemplateInfo());
    await StapleTemplateService.delete(stapleTemplateId);

    try {
      await StapleTemplateService.read(stapleTemplateId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple template found with Id: ${stapleTemplateId}`);
    }
  });
});

describe('search', () => {
  test('should return no staple template if provided criteria matches no staple template', async () => {
    const stapleTemplateInfos = await StapleTemplateService.search(createCriteria());

    expect(stapleTemplateInfos.count()).toBe(0);
  });

  test('should return the stapleTemplates matches the criteria', async () => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();
    const stapleTemplateId = await StapleTemplateService.create(expectedStapleTemplateInfo);
    const stapleTemplateInfos = await StapleTemplateService.search(createCriteriaUsingProvidedStapleTemplateInfo(expectedStapleTemplateInfo));

    expect(stapleTemplateInfos.count()).toBe(1);

    const stapleTemplateInfo = stapleTemplateInfos.first();
    expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
  });
});

describe('searchAll', () => {
  test('should return no staple template if provided criteria matches no staple template', async () => {
    const result = StapleTemplateService.searchAll(createCriteria());

    try {
      let stapleTemplates = List();

      result.event.subscribe(info => (stapleTemplates = stapleTemplates.push(info)));

      await result.promise;
      expect(stapleTemplates.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the stapleTemplates matches the criteria', async () => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();
    const stapleTemplateId1 = await StapleTemplateService.create(expectedStapleTemplateInfo);
    const stapleTemplateId2 = await StapleTemplateService.create(expectedStapleTemplateInfo);

    const result = StapleTemplateService.searchAll(createCriteriaUsingProvidedStapleTemplateInfo(expectedStapleTemplateInfo));
    try {
      let stapleTemplates = List();

      result.event.subscribe(info => (stapleTemplates = stapleTemplates.push(info)));

      await result.promise;
      expect(stapleTemplates.count()).toBe(2);
      expect(stapleTemplates.find(_ => _.get('id').localeCompare(stapleTemplateId1) === 0)).toBeTruthy();
      expect(stapleTemplates.find(_ => _.get('id').localeCompare(stapleTemplateId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no staple template match provided criteria', async () => {
    const response = await StapleTemplateService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any staple template match provided criteria', async () => {
    const stapleTemplateInfo = createStapleTemplateInfo();

    await StapleTemplateService.create(stapleTemplateInfo);
    const response = StapleTemplateService.exists(createCriteriaUsingProvidedStapleTemplateInfo(stapleTemplateInfo));

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no staple template match provided criteria', async () => {
    const response = await StapleTemplateService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of staple template match provided criteria', async () => {
    const stapleTemplateInfo = createStapleTemplateInfo();

    await StapleTemplateService.create(stapleTemplateInfo);
    await StapleTemplateService.create(stapleTemplateInfo);

    const response = await StapleTemplateService.count(createCriteriaUsingProvidedStapleTemplateInfo(stapleTemplateInfo));

    expect(response).toBe(2);
  });
});
