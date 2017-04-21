'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterProductService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MasterProductService = function () {
  function MasterProductService() {
    _classCallCheck(this, MasterProductService);
  }

  _createClass(MasterProductService, null, [{
    key: 'create',
    value: function create(product) {
      return new Promise(function (resolve, reject) {
        _schema.MasterProduct.spawn(product.get('description'), product.get('barcode'), product.get('imageUrl')).save().then(function (result) {
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
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct);

        query.equalTo('objectId', id);
        query.limit(1);

        query.find().then(function (results) {
          if (results.length === 0) {
            reject('No master product found with Id: ' + id);
          } else {
            resolve(MasterProductService.mapParseObjectToDataTransferObject(new _schema.MasterProduct(results[0])));
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
        return MasterProductService.buildSearchQuery(criteria).find().then(function (results) {
          return resolve(_immutable2.default.fromJS(results).map(function (_) {
            return new _schema.MasterProduct(_);
          }).map(MasterProductService.mapParseObjectToDataTransferObject));
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'exists',
    value: function exists(criteria) {
      return new Promise(function (resolve, reject) {
        return MasterProductService.buildSearchQuery(criteria).count().then(function (total) {
          return resolve(total > 0);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'buildSearchQuery',
    value: function buildSearchQuery(criteria) {
      var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct);

      if (criteria.has('description') && criteria.get('description')) {
        query.equalTo('description', criteria.get('description'));
      }

      if (criteria.has('barcode') && criteria.get('barcode')) {
        query.equalTo('barcode', criteria.get('barcode'));
      }

      if (criteria.has('imageUrl') && criteria.get('imageUrl')) {
        query.equalTo('imageUrl', criteria.get('imageUrl'));
      }

      return query;
    }
  }, {
    key: 'mapParseObjectToDataTransferObject',
    value: function mapParseObjectToDataTransferObject(masterProduct) {
      return (0, _immutable.Map)({
        id: masterProduct.getId(),
        description: masterProduct.getDescription(),
        barcode: masterProduct.getBarcode(),
        imageUrl: masterProduct.getImageUrl()
      });
    }
  }]);

  return MasterProductService;
}();

exports.MasterProductService = MasterProductService;
exports.default = MasterProductService;