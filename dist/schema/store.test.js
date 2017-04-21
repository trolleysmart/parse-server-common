'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('should set class name', function () {
    expect(_store.Store.spawn('name').className).toBe('Store');
  });
});

describe('static public methods', function () {
  test('spawn should set provided name', function () {
    var expectedValue = (0, _v2.default)();

    expect(_store.Store.spawn(expectedValue).get('name')).toBe(expectedValue);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _store.Store.spawn('name');

    expect(new _store.Store(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = _store.Store.spawn('name');

    expect(new _store.Store(object).getId()).toBe(object.id);
  });

  test('getName should return provided name', function () {
    var expectedValue = (0, _v2.default)();
    var object = _store.Store.spawn(expectedValue);

    expect(new _store.Store(object).getName()).toBe(expectedValue);
  });
});