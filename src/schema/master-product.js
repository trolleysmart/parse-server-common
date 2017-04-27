import Immutable, {
  List,
  Map,
} from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';
import {
  Maybe,
} from 'monet';

class MasterProduct extends BaseObject {
  static spawn(info) {
    const object = new MasterProduct();

    MasterProduct.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal(object, info) {
    object.set('description', info.get('description'));
    object.set('barcode', info.get('barcode')
      .orSome(undefined));
    object.set('imageUrl', info.get('imageUrl')
      .orSome(undefined));
    object.set('tags', info.get('tags')
      .orSome(List())
      .toJS());
  }

  constructor(object) {
    super(object, 'MasterProduct');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  updateInfo(info) {
    const object = this.getObject();

    MasterProduct.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    return Map({
      id: this.getId(),
      description: this.getObject()
        .get('description'),
      barcode: Maybe.fromNull(this.getObject()
        .get('barcode')),
      imageUrl: Maybe.fromNull(this.getObject()
        .get('imageUrl')),
      tags: Maybe.fromNull(Immutable.fromJS(this.getObject()
        .get('tags'))),
    });
  }
}

export {
  MasterProduct,
};

export default MasterProduct;
