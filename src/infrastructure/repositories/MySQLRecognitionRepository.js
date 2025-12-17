const IRecognitionRepository = require('../../domain/repositories/IRecognitionRepository');
const RecognitionEntity = require('../../domain/entities/RecognitionEntity');

/**
 * MySQLRecognitionRepository - MySQL implementation of IRecognitionRepository
 */
class MySQLRecognitionRepository extends IRecognitionRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getAll() {
    const [rows] = await this.pool.query('SELECT * FROM Recognition');
    return rows.map(row => this._mapToEntity(row));
  }

  async getRecent(limit = 10) {
    const [rows] = await this.pool.query('SELECT * FROM Recognition ORDER BY Date DESC LIMIT ?', [limit]);
    return rows.map(row => this._mapToEntity(row));
  }

  async getByUserId(userId) {
    const [rows] = await this.pool.query('SELECT * FROM Recognition WHERE User_ID = ? ORDER BY Date DESC', [userId]);
    return rows.map(row => this._mapToEntity(row));
  }

  async create(recognition) {
    const query = 'INSERT INTO Recognition (User_ID, Description, Date) VALUES (?, ?, ?)';
    const [result] = await this.pool.query(query, [
      recognition.userId,
      recognition.description,
      recognition.date
    ]);
    return result.insertId;
  }

  async delete(recognitionId) {
    const [result] = await this.pool.query('DELETE FROM Recognition WHERE Recognition_ID = ?', [recognitionId]);
    return result.affectedRows > 0;
  }

  _mapToEntity(row) {
    return new RecognitionEntity(
      row.Recognition_ID,
      row.User_ID,
      row.Description,
      row.Date
    );
  }
}

module.exports = MySQLRecognitionRepository;
