const ICreditHistoryRepository = require('../../domain/repositories/ICreditHistoryRepository');
const CreditHistoryEntity = require('../../domain/entities/CreditHistoryEntity');

/**
 * MySQLCreditHistoryRepository - MySQL implementation of ICreditHistoryRepository
 */
class MySQLCreditHistoryRepository extends ICreditHistoryRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getByUserId(userId) {
    const [rows] = await this.pool.query('SELECT * FROM Credit_History WHERE User_ID = ?', [userId]);
    if (rows.length === 0) return null;
    return this._mapToEntity(rows[0]);
  }

  async getAll() {
    const [rows] = await this.pool.query('SELECT * FROM Credit_History');
    return rows.map(row => this._mapToEntity(row));
  }

  async create(history) {
    const query = 'INSERT INTO Credit_History (User_ID, Total_Positive, Total_Negative) VALUES (?, ?, ?)';
    const [result] = await this.pool.query(query, [
      history.userId,
      history.totalPositive,
      history.totalNegative
    ]);
    return result.insertId;
  }

  async update(historyId, history) {
    const query = 'UPDATE Credit_History SET User_ID = ?, Total_Positive = ?, Total_Negative = ? WHERE History_ID = ?';
    const [result] = await this.pool.query(query, [
      history.userId,
      history.totalPositive,
      history.totalNegative,
      historyId
    ]);
    return result.affectedRows > 0;
  }

  _mapToEntity(row) {
    return new CreditHistoryEntity(
      row.History_ID,
      row.User_ID,
      row.Total_Positive,
      row.Total_Negative,
      row.Balance
    );
  }
}

module.exports = MySQLCreditHistoryRepository;
