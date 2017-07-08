// @flow

export default class ServiceBase {
  static addStringSearchToQuery = (conditions, query, conditionPropKey, columnName) => {
    if (conditions.has(conditionPropKey)) {
      const value = conditions.get(conditionPropKey);

      if (value) {
        query.equalTo(columnName, value.toLowerCase());

        return true;
      }
    }

    if (conditions.has(`startsWith_${conditionPropKey}`)) {
      const value = conditions.get(`startsWith_${conditionPropKey}`);

      if (value) {
        query.startsWith(columnName, value.toLowerCase());

        return true;
      }
    }

    if (conditions.has(`contains_${conditionPropKey}`)) {
      const value = conditions.get(`contains_${conditionPropKey}`);

      if (value) {
        query.contains(columnName, value.toLowerCase());

        return true;
      }
    }

    if (conditions.has(`contains_${conditionPropKey}s`)) {
      const values = conditions.get(`contains_${conditionPropKey}s`);

      if (values && values.count() === 1) {
        query.contains(columnName, values.first().toLowerCase());

        return true;
      } else if (values && values.count() > 1) {
        query.matches(columnName, values.map(value => `(?=.*${value.toLowerCase()})`).reduce((reduction, value) => reduction + value));

        return true;
      }
    }

    return false;
  };
}
