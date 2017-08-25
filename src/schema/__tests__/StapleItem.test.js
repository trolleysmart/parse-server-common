// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleItem } from '../';
import createTags from '../../services/__tests__/TagService.test';

const chance = new Chance();

export const createStapleItemInfo = async () => {
  const tags = await createTags(chance.integer({ min: 1, max: 10 }));
  const username = `${uuid()}@email.com`;
  const user = ParseWrapperService.createNewUser();

  user.setUsername(username);
  user.setPassword('123456');

  const userSignUpResult = await user.signUp();
  const userId = userSignUpResult.id;
  const stapleItem = Map({
    name: uuid(),
    description: uuid(),
    imageUrl: uuid(),
    userId,
    tagIds: tags.map(tag => tag.get('id')),
  });

  return { stapleItem, user: userSignUpResult, tags };
};

export const createStapleItem = async object => StapleItem.spawn(object || (await createStapleItemInfo()).stapleItem);

export const expectStapleItem = (object, expectedObject, { stapleItemId, expectedTags } = {}) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('userId')).toBe(expectedObject.get('userId'));

  if (stapleItemId) {
    expect(object.get('id')).toBe(stapleItemId);
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
