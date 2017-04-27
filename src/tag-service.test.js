import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import {
  TagService,
} from './tag-service';
import {
  createTagInfo,
} from './schema/tag.test';

function expectTagInfo(tagInfo, expectedTagInfo, tagId) {
  expect(tagInfo.get('id'))
    .toBe(tagId);
  expect(tagInfo.get('name'))
    .toBe(expectedTagInfo.get('name'));
  expect(tagInfo.get('weight'))
    .toBe(expectedTagInfo.get('weight'));
}

function createCriteria() {
  return Map({
    name: uuid(),
  });
}

function createCriteriaUsingProvidedTagInfo(tagInfo) {
  return Map({
    name: tagInfo.get('name'),
    weight: tagInfo.get('weight'),
  });
}

describe('create', () => {
  test('should return the created tag Id', (done) => {
    TagService.create(createTagInfo())
      .then((result) => {
        expect(result)
          .toBeDefined();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should create the tag', (done) => {
    const expectedTagInfo = createTagInfo();
    let tagId;

    TagService.create(expectedTagInfo)
      .then((id) => {
        tagId = id;

        return TagService.read(tagId);
      })
      .then((tagInfo) => {
        expectTagInfo(tagInfo, expectedTagInfo, tagId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('read', () => {
  test('should reject if the provided tag Id does not exist', (done) => {
    const tagId = uuid();

    TagService.read(tagId)
      .catch((error) => {
        expect(error)
          .toBe(`No tag found with Id: ${tagId}`);
        done();
      });
  });

  test('should read the existing tag', (done) => {
    const expectedTagInfo = createTagInfo();
    let tagId;

    TagService.create(expectedTagInfo)
      .then((id) => {
        tagId = id;

        return TagService.read(tagId);
      })
      .then((tagInfo) => {
        expectTagInfo(tagInfo, expectedTagInfo, tagId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('update', () => {
  test('should reject if the provided tag Id does not exist', (done) => {
    const tagId = uuid();

    TagService.update(createTagInfo()
        .set('id', tagId))
      .catch((error) => {
        expect(error)
          .toBe(`No tag found with Id: ${tagId}`);
        done();
      });
  });

  test('should return the Id of the updated tag', (done) => {
    let tagId;

    TagService.create(createTagInfo())
      .then((id) => {
        tagId = id;

        return TagService.update(createTagInfo()
          .set('id', tagId));
      })
      .then((id) => {
        expect(id)
          .toBe(tagId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should update the existing tag', (done) => {
    const expectedTagInfo = createTagInfo();
    let tagId;

    TagService.create(createTagInfo())
      .then(id => TagService.update(expectedTagInfo.set('id', id)))
      .then((id) => {
        tagId = id;

        return TagService.read(tagId);
      })
      .then((tagInfo) => {
        expectTagInfo(tagInfo, expectedTagInfo, tagId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('delete', () => {
  test('should reject if the provided tag Id does not exist', (done) => {
    const tagId = uuid();

    TagService.delete(tagId)
      .catch((error) => {
        expect(error)
          .toBe(`No tag found with Id: ${tagId}`);
        done();
      });
  });

  test('should delete the existing tag', (done) => {
    let tagId;

    TagService.create(createTagInfo())
      .then((id) => {
        tagId = id;
        return TagService.delete(tagId);
      })
      .then(() => TagService.read(tagId))
      .catch((error) => {
        expect(error)
          .toBe(`No tag found with Id: ${tagId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no tag if provided criteria matches no tag', (done) => {
    TagService.search(createCriteria())
      .then((tags) => {
        expect(tags.size)
          .toBe(0);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the tags matches the criteria', (done) => {
    const expectedTagInfo = createTagInfo();
    let tagId;

    TagService.create(expectedTagInfo)
      .then((id) => {
        tagId = id;

        return TagService.search(createCriteriaUsingProvidedTagInfo(expectedTagInfo));
      })
      .then((tagInfos) => {
        expect(tagInfos.size)
          .toBe(1);

        const tagInfo = tagInfos.first();
        expectTagInfo(tagInfo, expectedTagInfo, tagId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('searchAll', () => {
  test('should return no tag if provided criteria matches no tag', (done) => {
    const result = TagService.searchAll(createCriteria());
    let tags = List();

    result.event.subscribe((tag) => {
      tags = tags.push(tag);
    });
    result.promise.then(() => {
      expect(tags.size)
          .toBe(0);
      done();
    })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the tags matches the criteria', (done) => {
    const expectedTagInfo = createTagInfo();

    Promise.all([TagService.create(expectedTagInfo), TagService.create(expectedTagInfo)])
      .then((ids) => {
        const tagIds = List.of(ids[0], ids[1]);
        const result = TagService.searchAll(createCriteriaUsingProvidedTagInfo(expectedTagInfo));
        let tags = List();

        result.event.subscribe((tag) => {
          tags = tags.push(tag);
        });
        result.promise.then(() => {
          expect(tags.size)
              .toBe(tagIds.size);
          done();
        })
          .catch((error) => {
            fail(error);
            done();
          });
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('exists', () => {
  test('should return false if no tag match provided criteria', (done) => {
    TagService.exists(createCriteria())
      .then((response) => {
        expect(response)
          .toBeFalsy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return true if any tag match provided criteria', (done) => {
    const tagInfo = createTagInfo();

    TagService.create(tagInfo)
      .then(() => TagService.exists(createCriteriaUsingProvidedTagInfo(tagInfo)))
      .then((response) => {
        expect(response)
          .toBeTruthy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});