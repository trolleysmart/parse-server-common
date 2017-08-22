// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { StapleShoppingListDetailsTemplate } from '../';
import createStapleShoppingListTemplates from '../../services/__tests__/StapleShoppingListTemplateService.test';
import createTags from '../../services/__tests__/TagService.test';

const chance = new Chance();

export const createStapleShoppingListDetailsTemplateInfo = async () => {
  const stapleShoppingListTemplates = await createStapleShoppingListTemplates(chance.integer({ min: 1, max: 10 }));
  const tags = await createTags(chance.integer({ min: 1, max: 10 }));
  const stapleShoppingListDetailsTemplate = Map({
    name: uuid(),
    description: uuid(),
    imageUrl: uuid(),
    stapleShoppingListTemplateIds: stapleShoppingListTemplates.map(stapleShoppingListTemplate => stapleShoppingListTemplate.get('id')),
    tagIds: tags.map(tag => tag.get('id')),
  });

  return { stapleShoppingListDetailsTemplate, stapleShoppingListTemplates, tags };
};

export const createStapleShoppingListDetailsTemplate = async object =>
  StapleShoppingListDetailsTemplate.spawn(object || (await createStapleShoppingListDetailsTemplateInfo()).stapleShoppingListDetailsTemplate);

export const expectStapleShoppingListDetailsTemplate = (
  object,
  expectedObject,
  { stapleShoppingListDetailsTemplateId, expectedStapleShoppingListTemplates, expectedTags } = {},
) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));

  if (stapleShoppingListDetailsTemplateId) {
    expect(object.get('id')).toBe(stapleShoppingListDetailsTemplateId);
  }

  if (expectedStapleShoppingListTemplates) {
    expect(object.get('stapleShoppingListTemplates')).toEqual(expectedStapleShoppingListTemplates);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createStapleShoppingListDetailsTemplate()).className).toBe('StapleShoppingListDetailsTemplate');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { stapleShoppingListDetailsTemplate } = await createStapleShoppingListDetailsTemplateInfo();
    const object = await createStapleShoppingListDetailsTemplate(stapleShoppingListDetailsTemplate);
    const info = object.getInfo();

    expectStapleShoppingListDetailsTemplate(info, stapleShoppingListDetailsTemplate);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createStapleShoppingListDetailsTemplate();

    expect(new StapleShoppingListDetailsTemplate(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createStapleShoppingListDetailsTemplate();

    expect(new StapleShoppingListDetailsTemplate(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createStapleShoppingListDetailsTemplate();
    const { stapleShoppingListDetailsTemplate: updatedStapleShoppingListDetailsTemplate } = await createStapleShoppingListDetailsTemplateInfo();

    object.updateInfo(updatedStapleShoppingListDetailsTemplate);

    const info = object.getInfo();

    expectStapleShoppingListDetailsTemplate(info, updatedStapleShoppingListDetailsTemplate);
  });

  test('getInfo should return provided info', async () => {
    const { stapleShoppingListDetailsTemplate } = await createStapleShoppingListDetailsTemplateInfo();
    const object = await createStapleShoppingListDetailsTemplate(stapleShoppingListDetailsTemplate);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleShoppingListDetailsTemplate(info, stapleShoppingListDetailsTemplate);
  });
});
