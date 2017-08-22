// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { UserFeedbackService } from '../';
import { createUserFeedbackInfo, expectUserFeedback } from '../../schema/__tests__/UserFeedback.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('user', 'feedback'),
    includeUser: true,
  });

const createCriteria = userFeedback =>
  Map({
    conditions: Map({
      userId: userFeedback ? userFeedback.get('userId') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createUserFeedbacks = async (count, useSameInfo = false) => {
  let userFeedback;

  if (useSameInfo) {
    const { userFeedback: tempUserFeedback } = await createUserFeedbackInfo();

    userFeedback = tempUserFeedback;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalUserFeedback;

          if (useSameInfo) {
            finalUserFeedback = userFeedback;
          } else {
            const { userFeedback: tempUserFeedback } = await createUserFeedbackInfo();

            finalUserFeedback = tempUserFeedback;
          }

          return UserFeedbackService.read(await UserFeedbackService.create(finalUserFeedback), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createUserFeedbacks;

describe('create', () => {
  test('should return the created user feedback Id', async () => {
    const userFeedbackId = await UserFeedbackService.create((await createUserFeedbackInfo()).userFeedback);

    expect(userFeedbackId).toBeDefined();
  });

  test('should create the user feedback', async () => {
    const { userFeedback } = await createUserFeedbackInfo();
    const userFeedbackId = await UserFeedbackService.create(userFeedback);
    const fetchedUserFeedback = await UserFeedbackService.read(userFeedbackId, createCriteriaWthoutConditions());

    expect(fetchedUserFeedback).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided user feedback Id does not exist', async () => {
    const userFeedbackId = uuid();

    try {
      await UserFeedbackService.read(userFeedbackId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });

  test('should read the existing user feedback', async () => {
    const { userFeedback: expectedUserFeedback } = await createUserFeedbackInfo();
    const userFeedbackId = await UserFeedbackService.create(expectedUserFeedback);
    const userFeedback = await UserFeedbackService.read(userFeedbackId, createCriteriaWthoutConditions());

    expectUserFeedback(userFeedback, expectedUserFeedback);
  });
});

describe('update', () => {
  test('should reject if the provided user feedback Id does not exist', async () => {
    const userFeedbackId = uuid();

    try {
      const userFeedback = await UserFeedbackService.read(
        await UserFeedbackService.create((await createUserFeedbackInfo()).userFeedback),
        createCriteriaWthoutConditions(),
      );

      await UserFeedbackService.update(userFeedback.set('id', userFeedbackId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });

  test('should return the Id of the updated user feedback', async () => {
    const { userFeedback: expectedUserFeedback } = await createUserFeedbackInfo();
    const userFeedbackId = await UserFeedbackService.create((await createUserFeedbackInfo()).userFeedback);
    const id = await UserFeedbackService.update(expectedUserFeedback.set('id', userFeedbackId));

    expect(id).toBe(userFeedbackId);
  });

  test('should update the existing user feedback', async () => {
    const { userFeedback: expectedUserFeedback } = await createUserFeedbackInfo();
    const userFeedbackId = await UserFeedbackService.create((await createUserFeedbackInfo()).userFeedback);

    await UserFeedbackService.update(expectedUserFeedback.set('id', userFeedbackId));

    const userFeedback = await UserFeedbackService.read(userFeedbackId, createCriteriaWthoutConditions());

    expectUserFeedback(userFeedback, expectedUserFeedback);
  });
});

describe('delete', () => {
  test('should reject if the provided user feedback Id does not exist', async () => {
    const userFeedbackId = uuid();

    try {
      await UserFeedbackService.delete(userFeedbackId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });

  test('should delete the existing user feedback', async () => {
    const userFeedbackId = await UserFeedbackService.create((await createUserFeedbackInfo()).userFeedback);
    await UserFeedbackService.delete(userFeedbackId);

    try {
      await UserFeedbackService.delete(userFeedbackId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });
});

describe('search', () => {
  test('should return no user feedback if provided criteria matches no user feedback', async () => {
    const userFeedbacks = await UserFeedbackService.search(createCriteria());

    expect(userFeedbacks.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { userFeedback: expectedUserFeedback } = await createUserFeedbackInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => UserFeedbackService.create(expectedUserFeedback)).toArray()),
    );
    const userFeedbacks = await UserFeedbackService.search(createCriteria(expectedUserFeedback));

    expect(userFeedbacks.count).toBe(results.count);
    userFeedbacks.forEach((userFeedback) => {
      expect(results.find(_ => _.localeCompare(userFeedback.get('id')) === 0)).toBeDefined();
      expectUserFeedback(userFeedback, expectedUserFeedback);
    });
  });
});

describe('searchAll', () => {
  test('should return no user feedback if provided criteria matches no user feedback', async () => {
    let userFeedbacks = List();
    const result = UserFeedbackService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        userFeedbacks = userFeedbacks.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(userFeedbacks.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { userFeedback: expectedUserFeedback } = await createUserFeedbackInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => UserFeedbackService.create(expectedUserFeedback)).toArray()),
    );

    let userFeedbacks = List();
    const result = UserFeedbackService.searchAll(createCriteria(expectedUserFeedback));

    try {
      result.event.subscribe((info) => {
        userFeedbacks = userFeedbacks.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(userFeedbacks.count).toBe(results.count);
    userFeedbacks.forEach((userFeedback) => {
      expect(results.find(_ => _.localeCompare(userFeedback.get('id')) === 0)).toBeDefined();
      expectUserFeedback(userFeedback, expectedUserFeedback);
    });
  });
});

describe('exists', () => {
  test('should return false if no user feedback match provided criteria', async () => {
    expect(await UserFeedbackService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any user feedback match provided criteria', async () => {
    const userFeedbacks = await createUserFeedbacks(chance.integer({ min: 1, max: 10 }), true);

    expect(await UserFeedbackService.exists(createCriteria(userFeedbacks.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no user feedback match provided criteria', async () => {
    expect(await UserFeedbackService.count(createCriteria())).toBe(0);
  });

  test('should return the count of user feedback match provided criteria', async () => {
    const userFeedbacks = await createUserFeedbacks(chance.integer({ min: 1, max: 10 }), true);

    expect(await UserFeedbackService.count(createCriteria(userFeedbacks.first()))).toBe(userFeedbacks.count());
  });
});
