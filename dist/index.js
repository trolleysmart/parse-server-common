'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterProductService = exports.CrawlService = undefined;

var _crawlService = require('./crawl-service');

var _masterProductService = require('./master-product-service');

exports.CrawlService = _crawlService.CrawlService;
exports.MasterProductService = _masterProductService.MasterProductService;
exports.default = {
  CrawlService: _crawlService.CrawlService,
  MasterProductService: _masterProductService.MasterProductService
};