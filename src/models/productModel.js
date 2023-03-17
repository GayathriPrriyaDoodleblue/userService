const { Model } = require('objection');

class product extends Model {
  static get tableName() {
    return 'producttable';
  }

}
module.exports = product