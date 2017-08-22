// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleShoppingListTemplate } from '../';

export const createStapleShoppingListTemplateInfo = async () => {
  const stapleShoppingListTemplate = Map({
    name: uuid(),
    description: uuid(),
    imageUrl: uuid(),
  });

  return { stapleShoppingListTemplate };
};

export const createStapleShoppingListTemplate = async object =>
  StapleShoppingListTemplate.spawn(object || (await createStapleShoppingListTemplateInfo()).stapleShoppingListTemplate);

export const expectStapleShoppingListTemplate = (object, expectedObject) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createStapleShoppingListTemplate()).className).toBe('StapleShoppingListTemplate');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { stapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();
    const object = await createStapleShoppingListTemplate(stapleShoppingListTemplate);
    const info = object.getInfo();

    expectStapleShoppingListTemplate(info, stapleShoppingListTemplate);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createStapleShoppingListTemplate();

    expect(new StapleShoppingListTemplate(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createStapleShoppingListTemplate();

    expect(new StapleShoppingListTemplate(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createStapleShoppingListTemplate();
    const { stapleShoppingListTemplate: updatedStapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();

    object.updateInfo(updatedStapleShoppingListTemplate);

    const info = object.getInfo();

    expectStapleShoppingListTemplate(info, updatedStapleShoppingListTemplate);
  });

  test('getInfo should return provided info', async () => {
    const { stapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();
    const object = await createStapleShoppingListTemplate(stapleShoppingListTemplate);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleShoppingListTemplate(info, stapleShoppingListTemplate);
  });
});
