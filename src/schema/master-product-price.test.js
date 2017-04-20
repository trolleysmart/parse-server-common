import Immutable from 'immutable';
import uuid from 'uuid/v4';
import {
  MasterProduct,
} from './master-product';
import {
  MasterProductPrice,
} from './master-product-price';

function createMasterProduct() {
  return MasterProduct.spawn('description', 'barcode', 'imageUrl');
}

describe('constructor', () => {
  test('should set class name', () => {
    const masterProduct = createMasterProduct();

    expect(MasterProductPrice.spawn(masterProduct.getId(), {})
        .className)
      .toBe('MasterProductPrice');
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const masterProduct = createMasterProduct();
    const object = MasterProductPrice.spawn(masterProduct.getId(), {});

    expect(new MasterProduct(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const masterProduct = createMasterProduct();
    const object = MasterProductPrice.spawn(masterProduct.getId(), {});

    expect(new MasterProduct(object)
        .getId())
      .toBe(object.id);
  });

  test('getMasterProduct should return provided crawl session', () => {
    const masterProduct = createMasterProduct();
    const object = MasterProductPrice.spawn(masterProduct.getId(), {});

    expect(new MasterProductPrice(object)
        .getMasterProduct()
        .getId())
      .toBe(masterProduct.getId());
  });

  test('getPriceDetails should return provided result', () => {
    const expectedValue = Immutable.fromJS({
      val: uuid(),
    });
    const masterProduct = createMasterProduct();
    const object = MasterProductPrice.spawn(masterProduct.getId(), expectedValue);

    expect(new MasterProductPrice(object)
        .getPriceDetails())
      .toBe(expectedValue);
  });
});
