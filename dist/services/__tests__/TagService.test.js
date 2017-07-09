'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _Tag = require('../../schema/__tests__/Tag.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectTagInfo(tagInfo, expectedTagInfo, tagId) {
  expect(tagInfo.get('id')).toBe(tagId);
  expect(tagInfo.get('key')).toBe(expectedTagInfo.get('key'));
  expect(tagInfo.get('name')).toBe(expectedTagInfo.get('name'));
  expect(tagInfo.get('weight')).toBe(expectedTagInfo.get('weight'));
  expect(tagInfo.get('forDisplay')).toBe(expectedTagInfo.get('forDisplay'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'name', 'weight', 'forDisplay'),
    conditions: (0, _immutable.Map)({
      key: (0, _v2.default)(),
      name: (0, _v2.default)(),
      weight: 1,
      forDisplay: true
    })
  });
}

function createCriteriaUsingProvidedTagInfo(tagInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'name', 'weight', 'forDisplay'),
    conditions: (0, _immutable.Map)({
      key: tagInfo.get('key'),
      name: tagInfo.get('name'),
      weigth: tagInfo.get('weight'),
      forDisplay: tagInfo.get('forDisplay')
    })
  });
}

describe('create', function () {
  test('should return the created tag Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            result = _context.sent;


            expect(result).toBeDefined();

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('should create the tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var expectedTagInfo, tagId, tagInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            expectedTagInfo = (0, _Tag.createTagInfo)();
            _context2.next = 3;
            return _2.TagService.create(expectedTagInfo);

          case 3:
            tagId = _context2.sent;
            _context2.next = 6;
            return _2.TagService.read(tagId);

          case 6:
            tagInfo = _context2.sent;


            expectTagInfo(tagInfo, expectedTagInfo, tagId);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided tag Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var tagId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            tagId = (0, _v2.default)();
            _context3.prev = 1;
            _context3.next = 4;
            return _2.TagService.read(tagId);

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](1);

            expect(_context3.t0.getErrorMessage()).toBe('No tag found with Id: ' + tagId);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  })));

  test('should read the existing tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var expectedTagInfo, tagId, tagInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            expectedTagInfo = (0, _Tag.createTagInfo)();
            _context4.next = 3;
            return _2.TagService.create(expectedTagInfo);

          case 3:
            tagId = _context4.sent;
            _context4.next = 6;
            return _2.TagService.read(tagId);

          case 6:
            tagInfo = _context4.sent;


            expectTagInfo(tagInfo, expectedTagInfo, tagId);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided tag Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var tagId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            tagId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _2.TagService.update((0, _Tag.createTagInfo)().set('id', tagId));

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No tag found with Id: ' + tagId);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 6]]);
  })));

  test('should return the Id of the updated tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var tagId, id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context6.sent;
            _context6.next = 5;
            return _2.TagService.update((0, _Tag.createTagInfo)().set('id', tagId));

          case 5:
            id = _context6.sent;


            expect(id).toBe(tagId);

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('should update the existing tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var expectedTagInfo, id, tagId, tagInfo;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            expectedTagInfo = (0, _Tag.createTagInfo)();
            _context7.next = 3;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 3:
            id = _context7.sent;
            _context7.next = 6;
            return _2.TagService.update(expectedTagInfo.set('id', id));

          case 6:
            tagId = _context7.sent;
            _context7.next = 9;
            return _2.TagService.read(tagId);

          case 9:
            tagInfo = _context7.sent;


            expectTagInfo(tagInfo, expectedTagInfo, tagId);

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided tag Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var tagId;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            tagId = (0, _v2.default)();
            _context8.prev = 1;
            _context8.next = 4;
            return _2.TagService.delete(tagId);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8['catch'](1);

            expect(_context8.t0.getErrorMessage()).toBe('No tag found with Id: ' + tagId);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 6]]);
  })));

  test('should delete the existing tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var tagId;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context9.sent;
            _context9.next = 5;
            return _2.TagService.delete(tagId);

          case 5:
            _context9.prev = 5;
            _context9.next = 8;
            return _2.TagService.read(tagId);

          case 8:
            _context9.next = 13;
            break;

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9['catch'](5);

            expect(_context9.t0.getErrorMessage()).toBe('No tag found with Id: ' + tagId);

          case 13:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[5, 10]]);
  })));
});

describe('search', function () {
  test('should return no tag if provided criteria matches no tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var tagInfos;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _2.TagService.search(createCriteria());

          case 2:
            tagInfos = _context10.sent;


            expect(tagInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  test('should return the tags matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var expectedTagInfo, tagId, tagInfos, tagInfo;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            expectedTagInfo = (0, _Tag.createTagInfo)();
            _context11.next = 3;
            return _2.TagService.create(expectedTagInfo);

          case 3:
            tagId = _context11.sent;
            _context11.next = 6;
            return _2.TagService.search(createCriteriaUsingProvidedTagInfo(expectedTagInfo));

          case 6:
            tagInfos = _context11.sent;


            expect(tagInfos.count()).toBe(1);

            tagInfo = tagInfos.first();

            expectTagInfo(tagInfo, expectedTagInfo, tagId);

          case 10:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no tag if provided criteria matches no tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var result, tags;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            result = _2.TagService.searchAll(createCriteria());
            _context12.prev = 1;
            tags = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return tags = tags.push(info);
            });

            _context12.next = 6;
            return result.promise;

          case 6:
            expect(tags.count()).toBe(0);

          case 7:
            _context12.prev = 7;

            result.event.unsubscribeAll();
            return _context12.finish(7);

          case 10:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[1,, 7, 10]]);
  })));

  test('should return the tags matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var expectedTagInfo, tagId1, tagId2, result, tags;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            expectedTagInfo = (0, _Tag.createTagInfo)();
            _context13.next = 3;
            return _2.TagService.create(expectedTagInfo);

          case 3:
            tagId1 = _context13.sent;
            _context13.next = 6;
            return _2.TagService.create(expectedTagInfo);

          case 6:
            tagId2 = _context13.sent;
            result = _2.TagService.searchAll(createCriteriaUsingProvidedTagInfo(expectedTagInfo));
            _context13.prev = 8;
            tags = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return tags = tags.push(info);
            });

            _context13.next = 13;
            return result.promise;

          case 13:
            expect(tags.count()).toBe(2);
            expect(tags.find(function (_) {
              return _.get('id').localeCompare(tagId1) === 0;
            })).toBeTruthy();
            expect(tags.find(function (_) {
              return _.get('id').localeCompare(tagId2) === 0;
            })).toBeTruthy();

          case 16:
            _context13.prev = 16;

            result.event.unsubscribeAll();
            return _context13.finish(16);

          case 19:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[8,, 16, 19]]);
  })));
});

describe('exists', function () {
  test('should return false if no tag match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _2.TagService.exists(createCriteria());

          case 2:
            response = _context14.sent;


            expect(response).toBeFalsy();

          case 4:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));

  test('should return true if any tag match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var tagInfo, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            tagInfo = (0, _Tag.createTagInfo)();
            _context15.next = 3;
            return _2.TagService.create(tagInfo);

          case 3:
            response = _2.TagService.exists(createCriteriaUsingProvidedTagInfo(tagInfo));


            expect(response).toBeTruthy();

          case 5:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no tag match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _2.TagService.count(createCriteria());

          case 2:
            response = _context16.sent;


            expect(response).toBe(0);

          case 4:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  })));

  test('should return the count of tag match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var tagInfo, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            tagInfo = (0, _Tag.createTagInfo)();
            _context17.next = 3;
            return _2.TagService.create(tagInfo);

          case 3:
            _context17.next = 5;
            return _2.TagService.create(tagInfo);

          case 5:
            _context17.next = 7;
            return _2.TagService.count(createCriteriaUsingProvidedTagInfo(tagInfo));

          case 7:
            response = _context17.sent;


            expect(response).toBe(2);

          case 9:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));
});