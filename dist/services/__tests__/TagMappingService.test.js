'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _2 = require('../');

var _Tag = require('../../schema/__tests__/Tag.test');

var _TagMapping = require('../../schema/__tests__/TagMapping.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId) {
  expect(tagMappingInfo.get('id')).toBe(tagMappingId);
  expect(tagMappingInfo.get('key')).toBe(expectedTagMappingInfo.get('key'));
  expect(tagMappingInfo.get('description')).toBe(expectedTagMappingInfo.get('description'));
  expect(tagMappingInfo.get('weight')).toBe(expectedTagMappingInfo.get('weight'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'description', 'weight', 'tag'),
    conditions: (0, _immutable.Map)({
      key: (0, _v2.default)(),
      description: (0, _v2.default)(),
      weight: 1
    })
  });
}

function createCriteriaUsingProvidedTagMappingInfo(tagMappingInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'description', 'weight', 'tag'),
    conditions: (0, _immutable.Map)({
      key: tagMappingInfo.get('key'),
      description: tagMappingInfo.get('description'),
      weigth: tagMappingInfo.get('weight')
    })
  });
}

describe('create', function () {
  test('should return the created tag mapping Id', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var tagId, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context.sent;
            _context.next = 5;
            return _2.TagMappingService.create((0, _TagMapping.createTagMappingInfo)(tagId));

          case 5:
            result = _context.sent;


            expect(result).toBeDefined();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  test('should create the tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var tagId, expectedTagMappingInfo, tagMappingId, tagMappingInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context2.sent;
            expectedTagMappingInfo = (0, _TagMapping.createTagMappingInfo)(tagId);
            _context2.next = 6;
            return _2.TagMappingService.create(expectedTagMappingInfo);

          case 6:
            tagMappingId = _context2.sent;
            _context2.next = 9;
            return _2.TagMappingService.read(tagMappingId);

          case 9:
            tagMappingInfo = _context2.sent;


            expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));
});

describe('read', function () {
  test('should reject if the provided tag mapping Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var tagMappingId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            tagMappingId = (0, _v2.default)();
            _context3.prev = 1;
            _context3.next = 4;
            return _2.TagMappingService.read(tagMappingId);

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](1);

            expect(_context3.t0.getErrorMessage()).toBe('No tag mapping found with Id: ' + tagMappingId);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  })));

  test('should read the existing tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var tagId, expectedTagMappingInfo, tagMappingId, tagMappingInfo;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context4.sent;
            expectedTagMappingInfo = (0, _TagMapping.createTagMappingInfo)(tagId);
            _context4.next = 6;
            return _2.TagMappingService.create(expectedTagMappingInfo);

          case 6:
            tagMappingId = _context4.sent;
            _context4.next = 9;
            return _2.TagMappingService.read(tagMappingId);

          case 9:
            tagMappingInfo = _context4.sent;


            expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});

describe('update', function () {
  test('should reject if the provided tag mapping Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var tagMappingId, tagId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            tagMappingId = (0, _v2.default)();
            _context5.prev = 1;
            _context5.next = 4;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 4:
            tagId = _context5.sent;
            _context5.next = 7;
            return _2.TagMappingService.update((0, _TagMapping.createTagMappingInfo)(tagId).set('id', tagMappingId));

          case 7:
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5['catch'](1);

            expect(_context5.t0.getErrorMessage()).toBe('No tag mapping found with Id: ' + tagMappingId);

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 9]]);
  })));

  test('should return the Id of the updated tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var tagId, tagMappingId, id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context6.sent;
            _context6.next = 5;
            return _2.TagMappingService.create((0, _TagMapping.createTagMappingInfo)(tagId));

          case 5:
            tagMappingId = _context6.sent;
            _context6.next = 8;
            return _2.TagMappingService.update((0, _TagMapping.createTagMappingInfo)().set('id', tagMappingId));

          case 8:
            id = _context6.sent;


            expect(id).toBe(tagMappingId);

          case 10:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  test('should update the existing tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var tagId, expectedTagMappingInfo, id, tagMappingId, tagMappingInfo;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context7.sent;
            expectedTagMappingInfo = (0, _TagMapping.createTagMappingInfo)(tagId);
            _context7.next = 6;
            return _2.TagMappingService.create((0, _TagMapping.createTagMappingInfo)());

          case 6:
            id = _context7.sent;
            _context7.next = 9;
            return _2.TagMappingService.update(expectedTagMappingInfo.set('id', id));

          case 9:
            tagMappingId = _context7.sent;
            _context7.next = 12;
            return _2.TagMappingService.read(tagMappingId);

          case 12:
            tagMappingInfo = _context7.sent;


            expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId);

          case 14:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));
});

describe('delete', function () {
  test('should reject if the provided tag mapping Id does not exist', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var tagMappingId;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            tagMappingId = (0, _v2.default)();
            _context8.prev = 1;
            _context8.next = 4;
            return _2.TagMappingService.delete(tagMappingId);

          case 4:
            _context8.next = 9;
            break;

          case 6:
            _context8.prev = 6;
            _context8.t0 = _context8['catch'](1);

            expect(_context8.t0.getErrorMessage()).toBe('No tag mapping found with Id: ' + tagMappingId);

          case 9:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 6]]);
  })));

  test('should delete the existing tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var tagId, tagMappingId;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context9.sent;
            _context9.next = 5;
            return _2.TagMappingService.create((0, _TagMapping.createTagMappingInfo)(tagId));

          case 5:
            tagMappingId = _context9.sent;
            _context9.next = 8;
            return _2.TagMappingService.delete(tagMappingId);

          case 8:
            _context9.prev = 8;
            _context9.next = 11;
            return _2.TagMappingService.read(tagMappingId);

          case 11:
            _context9.next = 16;
            break;

          case 13:
            _context9.prev = 13;
            _context9.t0 = _context9['catch'](8);

            expect(_context9.t0.getErrorMessage()).toBe('No tag mapping found with Id: ' + tagMappingId);

          case 16:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[8, 13]]);
  })));
});

describe('search', function () {
  test('should return no tag mapping if provided criteria matches no tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var tagMappingInfos;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _2.TagMappingService.search(createCriteria());

          case 2:
            tagMappingInfos = _context10.sent;


            expect(tagMappingInfos.count()).toBe(0);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  test('should return the tag mappings matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var tagId, expectedTagMappingInfo, tagMappingId, tagMappingInfos, tagMappingInfo;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context11.sent;
            expectedTagMappingInfo = (0, _TagMapping.createTagMappingInfo)(tagId);
            _context11.next = 6;
            return _2.TagMappingService.create(expectedTagMappingInfo);

          case 6:
            tagMappingId = _context11.sent;
            _context11.next = 9;
            return _2.TagMappingService.search(createCriteriaUsingProvidedTagMappingInfo(expectedTagMappingInfo));

          case 9:
            tagMappingInfos = _context11.sent;


            expect(tagMappingInfos.count()).toBe(1);

            tagMappingInfo = tagMappingInfos.first();

            expectTagMappingInfo(tagMappingInfo, expectedTagMappingInfo, tagMappingId);

          case 13:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));
});

describe('searchAll', function () {
  test('should return no tag mapping if provided criteria matches no tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var result, tagMappings;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            result = _2.TagMappingService.searchAll(createCriteria());
            _context12.prev = 1;
            tagMappings = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return tagMappings = tagMappings.push(info);
            });

            _context12.next = 6;
            return result.promise;

          case 6:
            expect(tagMappings.count()).toBe(0);

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

  test('should return the tag mappings matches the criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var tagId, expectedTagMappingInfo, tagMappingId1, tagMappingId2, result, tagMappings;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context13.sent;
            expectedTagMappingInfo = (0, _TagMapping.createTagMappingInfo)(tagId);
            _context13.next = 6;
            return _2.TagMappingService.create(expectedTagMappingInfo);

          case 6:
            tagMappingId1 = _context13.sent;
            _context13.next = 9;
            return _2.TagMappingService.create(expectedTagMappingInfo);

          case 9:
            tagMappingId2 = _context13.sent;
            result = _2.TagMappingService.searchAll(createCriteriaUsingProvidedTagMappingInfo(expectedTagMappingInfo));
            _context13.prev = 11;
            tagMappings = (0, _immutable.List)();


            result.event.subscribe(function (info) {
              return tagMappings = tagMappings.push(info);
            });

            _context13.next = 16;
            return result.promise;

          case 16:
            expect(tagMappings.count()).toBe(2);
            expect(tagMappings.find(function (_) {
              return _.get('id').localeCompare(tagMappingId1) === 0;
            })).toBeTruthy();
            expect(tagMappings.find(function (_) {
              return _.get('id').localeCompare(tagMappingId2) === 0;
            })).toBeTruthy();

          case 19:
            _context13.prev = 19;

            result.event.unsubscribeAll();
            return _context13.finish(19);

          case 22:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[11,, 19, 22]]);
  })));
});

describe('exists', function () {
  test('should return false if no tag mapping match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _2.TagMappingService.exists(createCriteria());

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

  test('should return true if any tag mapping match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee15() {
    var tagId, tagMappingInfo, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context15.sent;
            tagMappingInfo = (0, _TagMapping.createTagMappingInfo)(tagId);
            _context15.next = 6;
            return _2.TagMappingService.create(tagMappingInfo);

          case 6:
            response = _2.TagMappingService.exists(createCriteriaUsingProvidedTagMappingInfo(tagMappingInfo));


            expect(response).toBeTruthy();

          case 8:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  })));
});

describe('count', function () {
  test('should return 0 if no tag mapping match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _2.TagMappingService.count(createCriteria());

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

  test('should return the count of tag mapping match provided criteria', _asyncToGenerator(regeneratorRuntime.mark(function _callee17() {
    var tagId, tagMappingInfo, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return _2.TagService.create((0, _Tag.createTagInfo)());

          case 2:
            tagId = _context17.sent;
            tagMappingInfo = (0, _TagMapping.createTagMappingInfo)(tagId);
            _context17.next = 6;
            return _2.TagMappingService.create(tagMappingInfo);

          case 6:
            _context17.next = 8;
            return _2.TagMappingService.create(tagMappingInfo);

          case 8:
            _context17.next = 10;
            return _2.TagMappingService.count(createCriteriaUsingProvidedTagMappingInfo(tagMappingInfo));

          case 10:
            response = _context17.sent;


            expect(response).toBe(2);

          case 12:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  })));
});