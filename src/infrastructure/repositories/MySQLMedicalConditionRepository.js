const IMedicalConditionRepository = require('../../domain/repositories/IMedicalConditionRepository');
const MedicalConditionEntity = require('../../domain/entities/MedicalConditionEntity');

/**
 * MySQLMedicalConditionRepository - MySQL implementation of IMedicalConditionRepository
 */
class MySQLMedicalConditionRepository extends IMedicalConditionRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getAll() {
    const [rows] = await this.pool.query('SELECT * FROM Medical_Condition');
    return rows.map(row => this._mapToEntity(row));
  }

  async getByUserId(userId) {
    const [rows] = await this.pool.query('SELECT * FROM Medical_Condition WHERE User_ID = ?', [userId]);
    return rows.map(row => this._mapToEntity(row));
  }

  async getById(conditionId) {
    const [rows] = await this.pool.query('SELECT * FROM Medical_Condition WHERE Condition_ID = ?', [conditionId]);
    if (rows.length === 0) return null;
    return this._mapToEntity(rows[0]);
  }

  async create(condition) {
    const query = 'INSERT INTO Medical_Condition (User_ID, Condition_Name, Description) VALUES (?, ?, ?)';
    const [result] = await this.pool.query(query, [
      condition.userId,
      condition.conditionName,
      condition.description
    ]);
    return result.insertId;
  }

  async delete(conditionId) {
    const [result] = await this.pool.query('DELETE FROM Medical_Condition WHERE Condition_ID = ?', [conditionId]);
    return result.affectedRows > 0;
  }

  _mapToEntity(row) {
    return new MedicalConditionEntity(
      row.Condition_ID,
      row.User_ID,
      row.Condition_Name,
      row.Description
    );
  }
}

module.exports = MySQLMedicalConditionRepository;
