// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleTemplate } from '../';

export const createStapleTemplateInfo = async () => {
  const stapleTemplate = Map({
    name: uuid(),
    description: uuid(),
    imageUrl: uuid(),
  });

  return { stapleTemplate };
};

export const createStapleTemplate = async object => StapleTemplate.spawn(object || (await createStapleTemplateInfo()).stapleTemplate);

export const expectStapleTemplate = (object, expectedObject) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createStapleTemplate()).className).toBe('StapleTemplate');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { stapleTemplate } = await createStapleTemplateInfo();
    const object = await createStapleTemplate(stapleTemplate);
    const info = object.getInfo();

    expectStapleTemplate(info, stapleTemplate);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createStapleTemplate();

    expect(new StapleTemplate(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createStapleTemplate();

    expect(new StapleTemplate(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createStapleTemplate();
    const { stapleTemplate: updatedStapleTemplate } = await createStapleTemplateInfo();

    object.updateInfo(updatedStapleTemplate);

    const info = object.getInfo();

    expectStapleTemplate(info, updatedStapleTemplate);
  });

  test('getInfo should return provided info', async () => {
    const { stapleTemplate } = await createStapleTemplateInfo();
    const object = await createStapleTemplate(stapleTemplate);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleTemplate(info, stapleTemplate);
  });
});
