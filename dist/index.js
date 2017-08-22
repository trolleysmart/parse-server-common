'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require('./schema');

Object.defineProperty(exports, 'ProductPrice', {
  enumerable: true,
  get: function get() {
    return _schema.ProductPrice;
  }
});
Object.defineProperty(exports, 'Store', {
  enumerable: true,
  get: function get() {
    return _schema.Store;
  }
});
Object.defineProperty(exports, 'Tag', {
  enumerable: true,
  get: function get() {
    return _schema.Tag;
  }
});

var _services = require('./services');

Object.defineProperty(exports, 'ProductPriceService', {
  enumerable: true,
  get: function get() {
    return _services.ProductPriceService;
  }
});
Object.defineProperty(exports, 'StoreService', {
  enumerable: true,
  get: function get() {
    return _services.StoreService;
  }
});
Object.defineProperty(exports, 'TagService', {
  enumerable: true,
  get: function get() {
    return _services.TagService;
  }
});