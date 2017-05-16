// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { StapleTemplate } from '../';

export function createStapleTemplateInfo() {
  return Map({
    name: uuid(),
  });
}

export function createStapleTemplate(stapleTemplateInfo) {
  return StapleTemplate.spawn(stapleTemplateInfo || createStapleTemplateInfo());
}

function expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo) {
  expect(stapleTemplateInfo.get('name')).toBe(expectedStapleTemplateInfo.get('name'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createStapleTemplate().className).toBe('StapleTemplate');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const stapleTemplateInfo = createStapleTemplateInfo();
    const object = createStapleTemplate(stapleTemplateInfo);
    const info = object.getInfo();

    expectStapleTemplateInfo(info, stapleTemplateInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = StapleTemplate.spawn(createStapleTemplateInfo());

    expect(new StapleTemplate(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createStapleTemplate();

    expect(new StapleTemplate(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createStapleTemplate();
    const updatedStapleTemplateInfo = createStapleTemplateInfo();

    object.updateInfo(updatedStapleTemplateInfo);

    const info = object.getInfo();

    expectStapleTemplateInfo(info, updatedStapleTemplateInfo);
  });

  test('getInfo should return provided info', () => {
    const stapleTemplateInfo = createStapleTemplateInfo();
    const object = createStapleTemplate(stapleTemplateInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleTemplateInfo(info, stapleTemplateInfo);
  });
});
