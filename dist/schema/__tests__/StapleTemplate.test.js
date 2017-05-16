'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStapleTemplateInfo = createStapleTemplateInfo;
exports.createStapleTemplate = createStapleTemplate;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStapleTemplateInfo() {
  return (0, _immutable.Map)({
    name: (0, _v2.default)()
  });
}

function createStapleTemplate(stapleTemplateInfo) {
  return _.StapleTemplate.spawn(stapleTemplateInfo || createStapleTemplateInfo());
}

function expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo) {
  expect(stapleTemplateInfo.get('name')).toBe(expectedStapleTemplateInfo.get('name'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createStapleTemplate().className).toBe('StapleTemplate');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var stapleTemplateInfo = createStapleTemplateInfo();
    var object = createStapleTemplate(stapleTemplateInfo);
    var info = object.getInfo();

    expectStapleTemplateInfo(info, stapleTemplateInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _.StapleTemplate.spawn(createStapleTemplateInfo());

    expect(new _.StapleTemplate(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createStapleTemplate();

    expect(new _.StapleTemplate(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createStapleTemplate();
    var updatedStapleTemplateInfo = createStapleTemplateInfo();

    object.updateInfo(updatedStapleTemplateInfo);

    var info = object.getInfo();

    expectStapleTemplateInfo(info, updatedStapleTemplateInfo);
  });

  test('getInfo should return provided info', function () {
    var stapleTemplateInfo = createStapleTemplateInfo();
    var object = createStapleTemplate(stapleTemplateInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStapleTemplateInfo(info, stapleTemplateInfo);
  });
});