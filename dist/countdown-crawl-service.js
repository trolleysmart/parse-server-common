'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _crawlResult = require('./schema/crawl-result');

var _crawlResult2 = _interopRequireDefault(_crawlResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CountdownCrawlService = function () {
  function CountdownCrawlService() {
    _classCallCheck(this, CountdownCrawlService);
  }

  _createClass(CountdownCrawlService, null, [{
    key: 'addResultSet',
    value: function addResultSet(sessionId, resultSet) {
      return new Promise(function (resolve, reject) {
        _crawlResult2.default.spawn(sessionId, resultSet).save().then(function (object) {
          return resolve(new _crawlResult2.default(object).getId());
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'getResultSets',
    value: function getResultSets(sessionId) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_crawlResult2.default);

        query.equalTo('crawlSession', sessionId);

        query.find().then(function (results) {
          return _immutable2.default.fromJS(results).map(function (_) {
            return new _crawlResult2.default(_).getResultSet();
          });
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return CountdownCrawlService;
}();

exports.default = CountdownCrawlService;