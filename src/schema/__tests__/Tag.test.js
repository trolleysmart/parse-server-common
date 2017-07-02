// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { Tag } from '../';

export function createTagInfo() {
  return Map({
    key: uuid(),
    name: uuid(),
    weight: 1,
  });
}

export function createTag(tagInfo) {
  return Tag.spawn(tagInfo || createTagInfo());
}

function expectTagInfo(tagInfo, expectedTagInfo) {
  expect(tagInfo.get('key')).toBe(expectedTagInfo.get('key'));
  expect(tagInfo.get('name')).toBe(expectedTagInfo.get('name'));
  expect(tagInfo.get('weight')).toBe(expectedTagInfo.get('weight'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createTag().className).toBe('Tag');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const tagInfo = createTagInfo();
    const object = createTag(tagInfo);
    const info = object.getInfo();

    expectTagInfo(info, tagInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = Tag.spawn(createTagInfo());

    expect(new Tag(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createTag();

    expect(new Tag(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createTag();
    const updatedTagInfo = createTagInfo();

    object.updateInfo(updatedTagInfo);

    const info = object.getInfo();

    expectTagInfo(info, updatedTagInfo);
  });

  test('getInfo should return provided info', () => {
    const tagInfo = createTagInfo();
    const object = createTag(tagInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectTagInfo(info, tagInfo);
  });
});
