'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTagInfo = createTagInfo;
exports.createTag = createTag;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTagInfo() {
  return (0, _immutable.Map)({
    key: (0, _v2.default)(),
    name: (0, _v2.default)(),
    weight: 1,
    forDisplay: true
  });
}

function createTag(tagInfo) {
  return _.Tag.spawn(tagInfo || createTagInfo());
}

function expectTagInfo(tagInfo, expectedTagInfo) {
  expect(tagInfo.get('key')).toBe(expectedTagInfo.get('key'));
  expect(tagInfo.get('name')).toBe(expectedTagInfo.get('name'));
  expect(tagInfo.get('weight')).toBe(expectedTagInfo.get('weight'));
  expect(tagInfo.get('forDisplay')).toBe(expectedTagInfo.get('forDisplay'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createTag().className).toBe('Tag');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var tagInfo = createTagInfo();
    var object = createTag(tagInfo);
    var info = object.getInfo();

    expectTagInfo(info, tagInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _.Tag.spawn(createTagInfo());

    expect(new _.Tag(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createTag();

    expect(new _.Tag(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createTag();
    var updatedTagInfo = createTagInfo();

    object.updateInfo(updatedTagInfo);

    var info = object.getInfo();

    expectTagInfo(info, updatedTagInfo);
  });

  test('getInfo should return provided info', function () {
    var tagInfo = createTagInfo();
    var object = createTag(tagInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectTagInfo(info, tagInfo);
  });
});