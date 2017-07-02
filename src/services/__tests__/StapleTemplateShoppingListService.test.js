// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleTemplateService, StapleTemplateShoppingListService } from '../';
import { createStapleTemplateShoppingListInfo } from '../../schema/__tests__/StapleTemplateShoppingList.test';
import { createStapleTemplateInfo } from '../../schema/__tests__/StapleTemplate.test';

function expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId) {
  expect(stapleTemplateShoppingListInfo.get('id')).toBe(stapleTemplateShoppingListId);
  expect(stapleTemplateShoppingListInfo.get('name')).toBe(expectedStapleTemplateShoppingListInfo.get('name'));
  expect(stapleTemplateShoppingListInfo.get('stapleTemplateIds')).toEqual(expectedStapleTemplateShoppingListInfo.get('stapleTemplateIds'));
}

export function createCriteria() {
  return Map({
    fields: List.of('name', 'stapleTemplates'),
    includeStapleTemplates: true,
    conditions: Map({
      name: uuid(),
    }),
  });
}

export function createCriteriaUsingProvidedStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo) {
  return Map({
    fields: List.of('name', 'stapleTemplates'),
    includeStapleTemplates: true,
    conditions: Map({
      name: stapleTemplateShoppingListInfo.get('name'),
      stapleTemplates: stapleTemplateShoppingListInfo.get('stapleTemplates'),
    }),
  });
}

describe('create', () => {
  test('should return the created staple template shopping list Id', async () => {
    const result = await StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo());

    expect(result).toBeDefined();
  });

  test('should create the staple template shopping list', async () => {
    const templateId1 = await StapleTemplateService.create(createStapleTemplateInfo());
    const templateId2 = await StapleTemplateService.create(createStapleTemplateInfo());
    const expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo(List.of(templateId1, templateId2));
    const stapleTemplateShoppingListId = await StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
    const stapleTemplateShoppingListInfo = await StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);

    expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
  });
});

describe('read', () => {
  test('should reject if the provided staple template shopping list Id does not exist', async () => {
    const stapleTemplateShoppingListId = uuid();

    try {
      await StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple template shopping list found with Id: ${stapleTemplateShoppingListId}`);
    }
  });

  test('should read the existing staple template shopping list', async () => {
    const templateId1 = await StapleTemplateService.create(createStapleTemplateInfo());
    const templateId2 = await StapleTemplateService.create(createStapleTemplateInfo());
    const expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo(List.of(templateId1, templateId2));
    const stapleTemplateShoppingListId = await StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
    const stapleTemplateShoppingListInfo = await StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);

    expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
  });
});

describe('update', () => {
  test('should reject if the provided staple template shopping list Id does not exist', async () => {
    const stapleTemplateShoppingListId = uuid();

    try {
      await StapleTemplateShoppingListService.update(createStapleTemplateShoppingListInfo().set('id', stapleTemplateShoppingListId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple template shopping list found with Id: ${stapleTemplateShoppingListId}`);
    }
  });

  test('should return the Id of the updated staple template shopping list', async () => {
    const stapleTemplateShoppingListId = await StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo());
    const id = await StapleTemplateShoppingListService.update(createStapleTemplateShoppingListInfo().set('id', stapleTemplateShoppingListId));

    expect(id).toBe(stapleTemplateShoppingListId);
  });

  test('should update the existing staple template shopping list', async () => {
    const templateId1 = await StapleTemplateService.create(createStapleTemplateInfo());
    const templateId2 = await StapleTemplateService.create(createStapleTemplateInfo());
    const id = await StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo());
    const expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo(List.of(templateId1, templateId2));
    const stapleTemplateShoppingListId = await StapleTemplateShoppingListService.update(expectedStapleTemplateShoppingListInfo.set('id', id));
    const stapleTemplateShoppingListInfo = await StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);

    expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
  });
});

describe('delete', () => {
  test('should reject if the provided staple template shopping list Id does not exist', async () => {
    const stapleTemplateShoppingListId = uuid();

    try {
      await StapleTemplateShoppingListService.delete(stapleTemplateShoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple template shopping list found with Id: ${stapleTemplateShoppingListId}`);
    }
  });

  test('should delete the existing staple template shopping list', async () => {
    const stapleTemplateShoppingListId = await StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo());
    await StapleTemplateShoppingListService.delete(stapleTemplateShoppingListId);

    try {
      await StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple template shopping list found with Id: ${stapleTemplateShoppingListId}`);
    }
  });
});

describe('search', () => {
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', async () => {
    const stapleTemplateShoppingListInfos = await StapleTemplateShoppingListService.search(createCriteria());

    expect(stapleTemplateShoppingListInfos.count()).toBe(0);
  });

  test('should return the staple template shopping lists matches the criteria', async () => {
    const templateId1 = await StapleTemplateService.create(createStapleTemplateInfo());
    const templateId2 = await StapleTemplateService.create(createStapleTemplateInfo());
    const expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo(List.of(templateId1, templateId2));
    const stapleTemplateShoppingListId = await StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);

    const stapleTemplateShoppingListInfos = await StapleTemplateShoppingListService.search(
      createCriteriaUsingProvidedStapleTemplateShoppingListInfo(expectedStapleTemplateShoppingListInfo),
    );

    expect(stapleTemplateShoppingListInfos.count()).toBe(1);

    const stapleTemplateShoppingListInfo = stapleTemplateShoppingListInfos.first();

    expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
  });
});

describe('searchAll', () => {
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', async () => {
    const result = StapleTemplateShoppingListService.searchAll(createCriteria());

    try {
      let stapleTemplateShoppingListInfos = List();

      result.event.subscribe(info => (stapleTemplateShoppingListInfos = stapleTemplateShoppingListInfos.push(info)));

      await result.promise;
      expect(stapleTemplateShoppingListInfos.count()).toBe(0);
    } finally {
      result.event.unsubscribeAll();
    }
  });

  test('should return the staple template shopping lists matches the criteria', async () => {
    const templateId1 = await StapleTemplateService.create(createStapleTemplateInfo());
    const templateId2 = await StapleTemplateService.create(createStapleTemplateInfo());
    const expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo(List.of(templateId1, templateId2));
    const stapleTemplateShoppingListId1 = await StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
    const stapleTemplateShoppingListId2 = await StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
    const result = StapleTemplateShoppingListService.searchAll(
      createCriteriaUsingProvidedStapleTemplateShoppingListInfo(expectedStapleTemplateShoppingListInfo),
    );

    try {
      let stapleTemplateShoppingListInfos = List();

      result.event.subscribe(info => (stapleTemplateShoppingListInfos = stapleTemplateShoppingListInfos.push(info)));

      await result.promise;
      expect(stapleTemplateShoppingListInfos.count()).toBe(2);
      expect(stapleTemplateShoppingListInfos.find(_ => _.get('id').localeCompare(stapleTemplateShoppingListId1) === 0)).toBeTruthy();
      expect(stapleTemplateShoppingListInfos.find(_ => _.get('id').localeCompare(stapleTemplateShoppingListId2) === 0)).toBeTruthy();
    } finally {
      result.event.unsubscribeAll();
    }
  });
});

describe('exists', () => {
  test('should return false if no staple template shopping list match provided criteria', async () => {
    const response = await StapleTemplateShoppingListService.exists(createCriteria());

    expect(response).toBeFalsy();
  });

  test('should return true if any staple template shopping list match provided criteria', async () => {
    const stapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();

    await StapleTemplateShoppingListService.create(stapleTemplateShoppingListInfo);

    const response = await StapleTemplateShoppingListService.exists(
      createCriteriaUsingProvidedStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo),
    );

    expect(response).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no staple template shopping list match provided criteria', async () => {
    const response = await StapleTemplateShoppingListService.count(createCriteria());

    expect(response).toBe(0);
  });

  test('should return the count of staple template shopping list match provided criteria', async () => {
    const stapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();

    await StapleTemplateShoppingListService.create(stapleTemplateShoppingListInfo);
    await StapleTemplateShoppingListService.create(stapleTemplateShoppingListInfo);

    const response = await StapleTemplateShoppingListService.count(
      createCriteriaUsingProvidedStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo),
    );

    expect(response).toBe(2);
  });
});
