import {
  BaseObject,
} from 'micro-business-parse-server-common';
import {
  Maybe,
} from 'monet';

class MasterProduct extends BaseObject {
  constructor(object) {
    super(object, 'MasterProduct');

    this.getDescription = this.getDescription.bind(this);
    this.getBarcode = this.getBarcode.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
  }

  static spawn(
    description,
    barcode,
    imageUrl,
  ) {
    const object = new MasterProduct();

    object.set('description', description);
    object.set('barcode', barcode);
    object.set('imageUrl', imageUrl);

    return object;
  }

  getDescription() {
    return this.getObject()
      .get('description');
  }

  getBarcode() {
    return Maybe.fromNull(this.getObject()
      .get('barcode'));
  }

  getImageUrl() {
    return Maybe.fromNull(this.getObject()
      .get('imageUrl'));
  }
}

export {
  MasterProduct,
};

export default MasterProduct;
