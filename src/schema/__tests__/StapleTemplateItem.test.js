// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { StapleTemplateItem } from '../';
import createStapleTemplates from '../../services/__tests__/StapleTemplateService.test';
import createTags from '../../services/__tests__/TagService.test';

const chance = new Chance();

export const createStapleTemplateItemInfo = async () => {
  const stapleTemplates = await createStapleTemplates(chance.integer({ min: 1, max: 10 }));
  const tags = await createTags(chance.integer({ min: 1, max: 10 }));
  const stapleTemplateItem = Map({
    name: uuid(),
    description: uuid(),
    imageUrl: uuid(),
    popular: chance.integer({ min: 0, max: 1000 }) % 2 === 0,
    stapleTemplateIds: stapleTemplates.map(stapleTemplate => stapleTemplate.get('id')),
    tagIds: tags.map(tag => tag.get('id')),
  });

  return { stapleTemplateItem, stapleTemplates, tags };
};

export const createStapleTemplateItem = async object => StapleTemplateItem.spawn(object || (await createStapleTemplateItemInfo()).stapleTemplateItem);

export const expectStapleTemplateItem = (object, expectedObject, { stapleTemplateItemId, expectedStapleTemplates, expectedTags } = {}) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('popular')).toBe(expectedObject.get('popular'));

  if (stapleTemplateItemId) {
    expect(object.get('id')).toBe(stapleTemplateItemId);
  }

  if (expectedStapleTemplates) {
    expect(object.get('stapleTemplates')).toEqual(expectedStapleTemplates);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createStapleTemplateItem()).className).toBe('StapleTemplateItem');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { stapleTemplateItem } = await createStapleTemplateItemInfo();
    const object = await createStapleTemplateItem(stapleTemplateItem);
    const info = object.getInfo();

    expectStapleTemplateItem(info, stapleTemplateItem);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createStapleTemplateItem();

    expect(new StapleTemplateItem(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createStapleTemplateItem();

    expect(new StapleTemplateItem(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createStapleTemplateItem();
    const { stapleTemplateItem: updatedStapleTemplateItem } = await createStapleTemplateItemInfo();

    object.updateInfo(updatedStapleTemplateItem);

    const info = object.getInfo();

    expectStapleTemplateItem(info, updatedStapleTemplateItem);
  });

  test('getInfo should return provided info', async () => {
    const { stapleTemplateItem } = await createStapleTemplateItemInfo();
    const object = await createStapleTemplateItem(stapleTemplateItem);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleTemplateItem(info, stapleTemplateItem);
  });
});
