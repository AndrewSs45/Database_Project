// Use Case - Get all tables with data
class GetTablesUseCase {
  constructor(tableRepository) {
    this.tableRepository = tableRepository;
  }

  async execute() {
    try {
      // Get list of all tables
      const tableNames = await this.tableRepository.getAllTables();
      
      // Get data for each table
      const tablesData = await Promise.all(
        tableNames.map(async (tableName) => {
          return await this.tableRepository.getTableData(tableName);
        })
      );

      return tablesData;
    } catch (error) {
      throw new Error(`Error fetching tables: ${error.message}`);
    }
  }
}

module.exports = GetTablesUseCase;
