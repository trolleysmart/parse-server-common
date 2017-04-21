import uuid from 'uuid/v4';
import {
    Store,
} from './store';

describe('constructor', () => {
  test('should set class name', () => {
    expect(Store.spawn('name')
        .className)
      .toBe('Store');
  });
});

describe('static public methods', () => {
  test('spawn should set provided name', () => {
    const expectedValue = uuid();

    expect(Store.spawn(expectedValue)
        .get('name'))
      .toBe(expectedValue);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = Store.spawn('name');

    expect(new Store(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = Store.spawn('name');

    expect(new Store(object)
        .getId())
      .toBe(object.id);
  });

  test('getName should return provided name', () => {
    const expectedValue = uuid();
    const object = Store.spawn(expectedValue);

    expect(new Store(object)
        .getName())
      .toBe(expectedValue);
  });
});
