import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import {
  StapleTemplateShoppingList,
} from './staple-template-shopping-list';

export function createStapleTemplateShoppingListInfo() {
  return Map({
    description: uuid(),
    templates: List.of(uuid(), uuid()),
  });
}

export function createStapleTemplateShoppingList(stapleTemplateShoppingListInfo) {
  return StapleTemplateShoppingList.spawn(stapleTemplateShoppingListInfo || createStapleTemplateShoppingListInfo());
}

function expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo) {
  expect(stapleTemplateShoppingListInfo.get('name'))
    .toBe(expectedStapleTemplateShoppingListInfo.get('name'));
  expect(stapleTemplateShoppingListInfo.get('templates'))
    .toEqual(expectedStapleTemplateShoppingListInfo.get('templates'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createStapleTemplateShoppingList()
        .className)
      .toBe('StapleTemplateShoppingList');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const stapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();
    const object = createStapleTemplateShoppingList(stapleTemplateShoppingListInfo);
    const info = object.getInfo();

    expectStapleTemplateShoppingListInfo(info, stapleTemplateShoppingListInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = StapleTemplateShoppingList.spawn(createStapleTemplateShoppingListInfo());

    expect(new StapleTemplateShoppingList(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createStapleTemplateShoppingList();

    expect(new StapleTemplateShoppingList(object)
        .getId())
      .toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createStapleTemplateShoppingList();
    const updatedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();

    object.updateInfo(updatedStapleTemplateShoppingListInfo);

    const info = object.getInfo();

    expectStapleTemplateShoppingListInfo(info, updatedStapleTemplateShoppingListInfo);
  });

  test('getInfo should return provided info', () => {
    const stapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();
    const object = createStapleTemplateShoppingList(stapleTemplateShoppingListInfo);
    const info = object.getInfo();

    expect(info.get('id'))
      .toBe(object.getId());
    expectStapleTemplateShoppingListInfo(info, stapleTemplateShoppingListInfo);
  });
});