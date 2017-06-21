'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTagMappingInfo = createTagMappingInfo;
exports.createTagMapping = createTagMapping;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTagMappingInfo(tagId) {
  var info = (0, _immutable.Map)({
    key: (0, _v2.default)(),
    description: (0, _v2.default)(),
    weight: 1
  });

  return tagId ? info.merge({ tagId: tagId }) : info;
}

function createTagMapping(tagMappingInfo) {
  return _.TagMapping.spawn(tagMappingInfo || createTagMappingInfo());
}

function expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo) {
  expect(tagMappingInfo.get('key')).toBe(expectedTagMappingInfo.get('key'));
  expect(tagMappingInfo.get('description')).toBe(expectedTagMappingInfo.get('description'));
  expect(tagMappingInfo.get('weight')).toBe(expectedTagMappingInfo.get('weight'));
  expect(tagMappingInfo.get('tag')).toEqual(expectedTagMappingInfo.get('tag'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createTagMapping().className).toBe('TagMapping');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var tagMappingInfo = createTagMappingInfo();
    var object = createTagMapping(tagMappingInfo);
    var info = object.getInfo();

    expectTagMappingInfo(info, tagMappingInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _.TagMapping.spawn(createTagMappingInfo());

    expect(new _.TagMapping(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createTagMapping();

    expect(new _.TagMapping(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createTagMapping();
    var updatedTagMappingInfo = createTagMappingInfo();

    object.updateInfo(updatedTagMappingInfo);

    var info = object.getInfo();

    expectTagMappingInfo(info, updatedTagMappingInfo);
  });

  test('getInfo should return provided info', function () {
    var tagMappingInfo = createTagMappingInfo();
    var object = createTagMapping(tagMappingInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectTagMappingInfo(info, tagMappingInfo);
  });
});