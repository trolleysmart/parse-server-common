// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import { ParseWrapperService } from '@microbusiness/parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleItem } from '../';
import createStapleTemplateItems from '../../services/__tests__/StapleTemplateItemService.test';
import createTags from '../../services/__tests__/TagService.test';

const chance = new Chance();

export const createStapleItemInfo = async () => {
  const stapleTemplateItem = (await createStapleTemplateItems(1)).first();
  const tags = await createTags(chance.integer({ min: 1, max: 10 }));
  const user = await ParseWrapperService.createNewUser({ username: `${uuid()}@email.com`, password: '123456' }).signUp();
  const stapleItem = Map({
    name: uuid(),
    description: uuid(),
    imageUrl: uuid(),
    popular: chance.integer({ min: 0, max: 1000 }) % 2 === 0,
    userId: user.id,
    stapleTemplateItemId: stapleTemplateItem.get('id'),
    tagIds: tags.map(tag => tag.get('id')),
  });

  return {
    stapleItem,
    user,
    tags,
    stapleTemplateItem,
  };
};

export const createStapleItem = async object => StapleItem.spawn(object || (await createStapleItemInfo()).stapleItem);

export const expectStapleItem = (object, expectedObject, {
  stapleItemId, expectedStapleTemplateItem, expectedTags, expectedUser,
} = {}) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('popular')).toBe(expectedObject.get('popular'));
  expect(object.get('userId')).toBe(expectedObject.get('userId'));
  expect(object.get('stapleTemplateItemId')).toBe(expectedObject.get('stapleTemplateItemId'));
  expect(object.get('tagIds')).toEqual(expectedObject.get('tagIds'));

  if (stapleItemId) {
    expect(object.get('id')).toBe(stapleItemId);
  }

  if (expectedUser) {
    expect(object.get('user').id).toEqual(expectedUser.id);
    expect(object.get('user').username).toEqual(expectedUser.username);
  }

  if (expectedStapleTemplateItem) {
    expect(object.get('stapleTemplateItem')).toEqual(expectedStapleTemplateItem);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createStapleItem()).className).toBe('StapleItem');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { stapleItem } = await createStapleItemInfo();
    const object = await createStapleItem(stapleItem);
    const info = object.getInfo();

    expectStapleItem(info, stapleItem);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createStapleItem();

    expect(new StapleItem(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createStapleItem();

    expect(new StapleItem(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createStapleItem();
    const { stapleItem: updatedStapleItem } = await createStapleItemInfo();

    object.updateInfo(updatedStapleItem);

    const info = object.getInfo();

    expectStapleItem(info, updatedStapleItem);
  });

  test('getInfo should return provided info', async () => {
    const { stapleItem } = await createStapleItemInfo();
    const object = await createStapleItem(stapleItem);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleItem(info, stapleItem);
  });
});
