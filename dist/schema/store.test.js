'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('constructor', function () {
  test('should set class name', function () {
    expect(_store.Store.spawn((0, _immutable.Map)({
      name: (0, _v2.default)()
    })).className).toBe('Store');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var expectedVal = (0, _immutable.Map)({
      name: (0, _v2.default)()
    });
    var object = _store.Store.spawn(expectedVal);
    var info = object.getInfo();

    expect(info.get('name')).toBe(expectedVal.get('name'));
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _store.Store.spawn((0, _immutable.Map)({
      name: (0, _v2.default)()
    }));

    expect(new _store.Store(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = _store.Store.spawn((0, _immutable.Map)({
      name: (0, _v2.default)()
    }));

    expect(new _store.Store(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = _store.Store.spawn((0, _immutable.Map)({
      name: (0, _v2.default)()
    }));
    var expectedVal = (0, _immutable.Map)({
      name: (0, _v2.default)()
    });

    object.updateInfo(expectedVal);

    var info = object.getInfo();

    expect(info.get('name')).toBe(expectedVal.get('name'));
  });

  test('getInfo should return provided info', function () {
    var expectedVal = (0, _immutable.Map)({
      name: (0, _v2.default)()
    });
    var object = _store.Store.spawn(expectedVal);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expect(info.get('name')).toBe(expectedVal.get('name'));
  });
});