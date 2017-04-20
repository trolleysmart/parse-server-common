'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterProductService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('./schema');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MasterProductService = function () {
  function MasterProductService() {
    _classCallCheck(this, MasterProductService);
  }

  _createClass(MasterProductService, null, [{
    key: 'create',
    value: function create(_ref) {
      var description = _ref.description,
          barcode = _ref.barcode,
          imageUrl = _ref.imageUrl;

      return new Promise(function (resolve, reject) {
        _schema.MasterProduct.spawn(description, barcode, imageUrl).save().then(function (result) {
          return resolve(result.id);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'exists',
    value: function exists(product) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct);

        if (product.has('description') && product.get('description')) {
          query.equalTo('description', product.get('description'));
        }

        if (product.has('barcode') && product.get('barcode')) {
          query.equalTo('barcode', product.get('barcode'));
        }

        if (product.has('imageUrl') && product.get('imageUrl')) {
          query.equalTo('imageUrl', product.get('imageUrl'));
        }

        return query.count().then(function (total) {
          return resolve(total > 0);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return MasterProductService;
}();

exports.MasterProductService = MasterProductService;
exports.default = MasterProductService;