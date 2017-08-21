// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { ProductPriceService } from '../';
import { createLightWeigthProductPriceInfo } from '../../schema/__tests__/ProductPrice.test';
import { createStores } from './StoreService.test';
import { createTags } from './TagService.test';

export const createProductPriceInfo = async () => {
  const store = (await createStores(1)).first();
  const tags = await createTags(2);

  return { productPrice: createLightWeigthProductPriceInfo({ storeId: store.get('id'), tagIds: tags.map(_ => _.get('id')) }), store, tags };
};

const getFieldList = () =>
  List.of('name', 'description', 'priceDetails', 'priceToDisplay', 'saving', 'savingPercentage', 'offerEndDate', 'status', 'store', 'tags');

const expectProductPrice = (productPriceInfo, expectedProductPriceInfo, productPriceId, store, tags) => {
  expect(productPriceInfo.get('id')).toBe(productPriceId);
  expect(productPriceInfo.get('name')).toBe(expectedProductPriceInfo.get('name'));
  expect(productPriceInfo.get('description')).toBe(expectedProductPriceInfo.get('description'));
  expect(productPriceInfo.get('priceDetails')).toEqual(expectedProductPriceInfo.get('priceDetails'));
  expect(productPriceInfo.get('priceToDisplay')).toEqual(expectedProductPriceInfo.get('priceToDisplay'));
  expect(productPriceInfo.get('saving')).toEqual(expectedProductPriceInfo.get('saving'));
  expect(productPriceInfo.get('savingPercentage')).toEqual(expectedProductPriceInfo.get('savingPercentage'));
  expect(productPriceInfo.get('offerEndDate')).toEqual(expectedProductPriceInfo.get('offerEndDate'));
  expect(productPriceInfo.get('status')).toEqual(expectedProductPriceInfo.get('status'));
  expect(productPriceInfo.get('store')).toEqual(store);
  expect(productPriceInfo.get('tags')).toEqual(tags);
};

export const createIncludeCriteria = () =>
  Map({
    fields: getFieldList(),
    includeStore: true,
    includeTags: true,
  });

export const createCriteria = () =>
  Map({
    conditions: Map({
      name: uuid(),
      description: uuid(),
    }),
  }).merge(createProductPriceInfo);

export const createCriteriaUsingProvidedProductPriceInfo = productPriceInfo =>
  Map({
    conditions: Map({
      name: productPriceInfo.get('name'),
      description: productPriceInfo.get('description'),
      storeId: productPriceInfo.get('storeId'),
      tags: productPriceInfo.get('tags'),
    }),
  }).merge(createProductPriceInfo);

describe('create', () => {
  test('should return the created product price Id', async () => {
    const productPriceId = await ProductPriceService.create((await createProductPriceInfo()).productPrice);

    expect(productPriceId).toBeDefined();
  });

  test('should create the product price', async () => {
    const { productPrice, store, tags } = await createProductPriceInfo();
    const productPriceId = await ProductPriceService.create(productPrice);
    const fetchedProductPrice = await ProductPriceService.read(productPriceId, createIncludeCriteria());

    expectProductPrice(fetchedProductPrice, productPrice, productPriceId, store, tags);
  });
});
