// Repository Interface - defines contract for data access
class ITableRepository {
  async getAllTables() {
    throw new Error('Method not implemented');
  }

  async getTableData(tableName) {
    throw new Error('Method not implemented');
  }
}

module.exports = ITableRepository;
