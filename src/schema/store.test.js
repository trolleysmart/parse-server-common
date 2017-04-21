import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import {
  Store,
} from './store';

describe('constructor', () => {
  test('should set class name', () => {
    expect(Store.spawn(Map({
      name: uuid(),
    }))
        .className)
      .toBe('Store');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const expectedVal = Map({
      name: uuid(),
    });
    const object = Store.spawn(expectedVal);
    const info = object.getInfo();

    expect(info.get('name'))
      .toBe(expectedVal.get('name'));
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = Store.spawn(Map({
      name: uuid(),
    }));

    expect(new Store(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = Store.spawn(Map({
      name: uuid(),
    }));

    expect(new Store(object)
        .getId())
      .toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = Store.spawn(Map({
      name: uuid(),
    }));
    const expectedVal = Map({
      name: uuid(),
    });

    object.updateInfo(expectedVal);

    const info = object.getInfo();

    expect(info.get('name'))
      .toBe(expectedVal.get('name'));
  });

  test('getInfo should return provided info', () => {
    const expectedVal = Map({
      name: uuid(),
    });
    const object = Store.spawn(expectedVal);
    const info = object.getInfo();

    expect(info.get('id'))
      .toBe(object.getId());
    expect(info.get('name'))
      .toBe(expectedVal.get('name'));
  });
});
