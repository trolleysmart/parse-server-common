'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parseWrapperService = require('./parse-wrapper-service');

var _parseWrapperService2 = _interopRequireDefault(_parseWrapperService);

var _storeCrawlerConfiguration = require('./schema/store-crawler-configuration');

var _storeCrawlerConfiguration2 = _interopRequireDefault(_storeCrawlerConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrawlService = function () {
  function CrawlService() {
    _classCallCheck(this, CrawlService);
  }

  _createClass(CrawlService, null, [{
    key: 'getStoreCrawlerConfig',
    value: function getStoreCrawlerConfig(key) {
      return new Promise(function (resolve, reject) {
        var query = _parseWrapperService2.default.createQuery(_storeCrawlerConfiguration2.default);

        query.equalTo('key', key);

        return query.find().then(function (results) {
          if (results.length === 0) {
            reject('No store crawler config found for key: ' + key);
          } else if (results.length !== 1) {
            reject('Multiple store crawler config found for key: ' + key);
          } else {
            resolve(new _storeCrawlerConfiguration2.default(results[0]).getConfig());
          }
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return CrawlService;
}();

exports.default = CrawlService;