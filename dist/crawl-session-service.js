'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CrawlSessionService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrawlSessionService = function () {
  function CrawlSessionService() {
    _classCallCheck(this, CrawlSessionService);
  }

  _createClass(CrawlSessionService, null, [{
    key: 'create',
    value: function create(store) {
      return new Promise(function (resolve, reject) {
        _schema.CrawlSession.spawn(store.get('sessionKey'), store.get('startDateTime'), store.get('additionalInfo')).save().then(function (result) {
          return resolve(result.id);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'read',
    value: function read(id) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession);

        query.equalTo('objectId', id);
        query.limit(1);

        query.find().then(function (results) {
          if (results.length === 0) {
            reject('No store found with Id: ' + id);
          } else {
            resolve(CrawlSessionService.mapParseObjectToDataTransferObject(new _schema.CrawlSession(results[0])));
          }
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'search',
    value: function search(criteria) {
      return new Promise(function (resolve, reject) {
        return CrawlSessionService.buildSearchQuery(criteria).find().then(function (results) {
          return resolve(_immutable2.default.fromJS(results).map(function (_) {
            return new _schema.CrawlSession(_);
          }).map(CrawlSessionService.mapParseObjectToDataTransferObject));
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'exists',
    value: function exists(criteria) {
      return new Promise(function (resolve, reject) {
        return CrawlSessionService.buildSearchQuery(criteria).count().then(function (total) {
          return resolve(total > 0);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'buildSearchQuery',
    value: function buildSearchQuery(criteria) {
      var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.CrawlSession);

      if (criteria.has('sessionKey') && criteria.get('sessionKey')) {
        query.equalTo('sessionKey', criteria.get('sessionKey'));
      }

      return query;
    }
  }, {
    key: 'mapParseObjectToDataTransferObject',
    value: function mapParseObjectToDataTransferObject(store) {
      return (0, _immutable.Map)({
        id: store.getId(),
        sessionKey: store.getSessionKey(),
        startDateTime: store.getStartDateTime(),
        endDateTime: store.getEndDateTime(),
        additionalInfo: store.getAdditionalInfo()
      });
    }
  }]);

  return CrawlSessionService;
}();

exports.CrawlSessionService = CrawlSessionService;
exports.default = CrawlSessionService;