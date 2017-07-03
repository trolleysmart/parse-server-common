// @flow

export default class ServiceBase {
  static addStringSearchToQuery = (conditions, query, columnName, lowerCaseColumnName) => {
    if (conditions.has(columnName)) {
      const value = conditions.get(columnName);

      if (value) {
        query.equalTo(lowerCaseColumnName, value.toLowerCase());
        return true;
      }
    }

    if (conditions.has(`startsWith_${columnName}`)) {
      const value = conditions.get(`startsWith_${columnName}`);

      if (value) {
        query.startsWith(lowerCaseColumnName, value.toLowerCase());
        return true;
      }
    }

    if (conditions.has(`contains_${columnName}`)) {
      const value = conditions.get(`contains_${columnName}`);

      if (value) {
        query.contains(lowerCaseColumnName, value.toLowerCase());
        return true;
      }
    }

    if (conditions.has(`contains_${columnName}s`)) {
      const values = conditions.get(`contains_${columnName}s`);

      if (values && values.count() === 1) {
        query.contains(lowerCaseColumnName, values.first().toLowerCase());
        return true;
      } else if (values && values.count() > 1) {
        query.matches(lowerCaseColumnName, values.map(value => `(?=.*${value.toLowerCase()})`).reduce((reduction, value) => reduction + value));
        return true;
      }
    }

    return false;
  };
}
