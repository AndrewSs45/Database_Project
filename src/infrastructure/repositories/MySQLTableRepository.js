const ITableRepository = require('../../domain/repositories/ITableRepository');
const TableEntity = require('../../domain/entities/TableEntity');
const db = require('../database/DatabaseConnection');

class MySQLTableRepository extends ITableRepository {
  async getAllTables() {
    try {
      const tables = await db.query('SHOW TABLES');
      const dbName = process.env.DB_NAME;
      const tableKey = `Tables_in_${dbName}`;
      
      return tables.map(table => table[tableKey] || Object.values(table)[0]);
    } catch (error) {
      throw new Error(`Error fetching table list: ${error.message}`);
    }
  }

  async getTableData(tableName) {
    try {
      // Get table structure
      const columns = await db.query(`DESCRIBE ${tableName}`);
      const columnNames = columns.map(col => col.Field);

      // Get table data
      const rows = await db.query(`SELECT * FROM ${tableName} LIMIT 100`);

      return new TableEntity(tableName, columnNames, rows);
    } catch (error) {
      throw new Error(`Error fetching data for table ${tableName}: ${error.message}`);
    }
  }

  async executeCustomQuery(sqlQuery) {
    try {
      const rows = await db.query(sqlQuery);
      
      let columnNames = [];
      if (rows && rows.length > 0) {
        columnNames = Object.keys(rows[0]);
      }

      return new TableEntity('Custom Query Result', columnNames, rows);
    } catch (error) {
      throw new Error(`Error executing custom query: ${error.message}`);
    }
  }
}

module.exports = MySQLTableRepository;
