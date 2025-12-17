const ICreditRepository = require('../../domain/repositories/ICreditRepository');
const CreditEntity = require('../../domain/entities/CreditEntity');

/**
 * MySQLCreditRepository - MySQL implementation of ICreditRepository
 */
class MySQLCreditRepository extends ICreditRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getAll() {
    const [rows] = await this.pool.query('SELECT * FROM Credit');
    return rows.map(row => this._mapToEntity(row));
  }

  async getByUserId(userId) {
    const [rows] = await this.pool.query('SELECT * FROM Credit WHERE User_ID = ? ORDER BY Date DESC', [userId]);
    return rows.map(row => this._mapToEntity(row));
  }

  async getById(creditId) {
    const [rows] = await this.pool.query('SELECT * FROM Credit WHERE Credit_ID = ?', [creditId]);
    if (rows.length === 0) return null;
    return this._mapToEntity(rows[0]);
  }

  async create(credit) {
    const query = 'INSERT INTO Credit (User_ID, Type, Reason, Date, Value) VALUES (?, ?, ?, ?, ?)';
    const [result] = await this.pool.query(query, [
      credit.userId,
      credit.type,
      credit.reason,
      credit.date,
      credit.value
    ]);
    return result.insertId;
  }

  async delete(creditId) {
    const [result] = await this.pool.query('DELETE FROM Credit WHERE Credit_ID = ?', [creditId]);
    return result.affectedRows > 0;
  }

  _mapToEntity(row) {
    return new CreditEntity(
      row.Credit_ID,
      row.User_ID,
      row.Type,
      row.Reason,
      row.Date,
      row.Value
    );
  }
}

module.exports = MySQLCreditRepository;
