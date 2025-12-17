// Controller - handles HTTP requests
class TableController {
  constructor(getTablesUseCase, tableRepository) {
    this.getTablesUseCase = getTablesUseCase;
    this.tableRepository = tableRepository;
  }

  async showTablesPage(req, res) {
    try {
      const tables = await this.getTablesUseCase.execute();
      
      res.render('index', {
        tables: tables,
        error: null
      });
    } catch (error) {
      console.error('Error:', error);
      res.render('index', {
        tables: [],
        error: error.message
      });
    }
  }

  async showBankPage(req, res) {
    try {
      const tableName = process.env.BANK_TABLE_NAME;
      
      if (!tableName) {
        throw new Error('BANK_TABLE_NAME not configured in .env file');
      }

      const tableData = await this.tableRepository.getTableData(tableName);
      
      res.render('bank', {
        table: tableData,
        error: null
      });
    } catch (error) {
      console.error('Error:', error);
      res.render('bank', {
        table: null,
        error: error.message
      });
    }
  }

  async showHelloWorld(req, res) {
    res.render('hello');
  }

  async showQueryPage(req, res) {
    try {
      const customQuery = process.env.CUSTOM_SQL_QUERY;
      
      if (!customQuery) {
        throw new Error('CUSTOM_SQL_QUERY not configured in .env file');
      }

      const queryResult = await this.tableRepository.executeCustomQuery(customQuery);
      
      res.render('query', {
        result: queryResult,
        query: customQuery,
        error: null
      });
    } catch (error) {
      console.error('Error:', error);
      res.render('query', {
        result: null,
        query: process.env.CUSTOM_SQL_QUERY || '',
        error: error.message
      });
    }
  }
}

module.exports = TableController;
