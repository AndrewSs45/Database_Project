// Domain Entity - Table representation
class TableEntity {
  constructor(tableName, columns, rows) {
    this.tableName = tableName;
    this.columns = columns;
    this.rows = rows;
  }
}

module.exports = TableEntity;
