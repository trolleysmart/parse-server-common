'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserFeedbackInfo = createUserFeedbackInfo;
exports.createUserFeedback = createUserFeedback;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createUserFeedbackInfo(userId) {
  return (0, _immutable.Map)({
    userId: userId || (0, _v2.default)(),
    feedback: (0, _immutable.Map)({ input1: (0, _v2.default)(), input2: (0, _v2.default)() })
  });
}

function createUserFeedback(userFeedbackInfo) {
  return _.UserFeedback.spawn(userFeedbackInfo || createUserFeedbackInfo());
}

function expectUserFeedbackInfo(userFeedbackInfo, expectedUserFeedbackInfo) {
  expect(userFeedbackInfo.get('userId')).toBe(expectedUserFeedbackInfo.get('userId'));
  expect(userFeedbackInfo.get('feedback')).toEqual(expectedUserFeedbackInfo.get('feedback'));
}

describe('constructor', function () {
  test('should set class name', function () {
    expect(createUserFeedback().className).toBe('UserFeedback');
  });
});

describe('static public methods', function () {
  test('spawn should set provided info', function () {
    var userFeedbackInfo = createUserFeedbackInfo();
    var object = createUserFeedback(userFeedbackInfo);
    var info = object.getInfo();

    expectUserFeedbackInfo(info, userFeedbackInfo);
  });
});

describe('public methods', function () {
  test('getObject should return provided object', function () {
    var object = _.UserFeedback.spawn(createUserFeedbackInfo());

    expect(new _.UserFeedback(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', function () {
    var object = createUserFeedback();

    expect(new _.UserFeedback(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', function () {
    var object = createUserFeedback();
    var updatedStoreInfo = createUserFeedbackInfo();

    object.updateInfo(updatedStoreInfo);

    var info = object.getInfo();

    expectUserFeedbackInfo(info, updatedStoreInfo);
  });

  test('getInfo should return provided info', function () {
    var storeInfo = createUserFeedbackInfo();
    var object = createUserFeedback(storeInfo);
    var info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectUserFeedbackInfo(info, storeInfo);
  });
});