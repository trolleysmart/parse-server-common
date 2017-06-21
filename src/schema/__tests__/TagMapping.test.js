// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { TagMapping } from '../';

export function createTagMappingInfo(tagId) {
  const info = Map({
    key: uuid(),
    description: uuid(),
    weight: 1,
  });

  return tagId ? info.merge({ tagId }) : info;
}

export function createTagMapping(tagMappingInfo) {
  return TagMapping.spawn(tagMappingInfo || createTagMappingInfo());
}

function expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo) {
  expect(tagMappingInfo.get('key')).toBe(expectedTagMappingInfo.get('key'));
  expect(tagMappingInfo.get('description')).toBe(expectedTagMappingInfo.get('description'));
  expect(tagMappingInfo.get('weight')).toBe(expectedTagMappingInfo.get('weight'));
  expect(tagMappingInfo.get('tag')).toEqual(expectedTagMappingInfo.get('tag'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createTagMapping().className).toBe('TagMapping');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const tagMappingInfo = createTagMappingInfo();
    const object = createTagMapping(tagMappingInfo);
    const info = object.getInfo();

    expectTagMappingInfo(info, tagMappingInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = TagMapping.spawn(createTagMappingInfo());

    expect(new TagMapping(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createTagMapping();

    expect(new TagMapping(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createTagMapping();
    const updatedTagMappingInfo = createTagMappingInfo();

    object.updateInfo(updatedTagMappingInfo);

    const info = object.getInfo();

    expectTagMappingInfo(info, updatedTagMappingInfo);
  });

  test('getInfo should return provided info', () => {
    const tagMappingInfo = createTagMappingInfo();
    const object = createTagMapping(tagMappingInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectTagMappingInfo(info, tagMappingInfo);
  });
});
