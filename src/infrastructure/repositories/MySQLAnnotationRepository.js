const IAnnotationRepository = require('../../domain/repositories/IAnnotationRepository');
const AnnotationEntity = require('../../domain/entities/AnnotationEntity');

/**
 * MySQLAnnotationRepository - MySQL implementation of IAnnotationRepository
 */
class MySQLAnnotationRepository extends IAnnotationRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getAll() {
    const [rows] = await this.pool.query('SELECT * FROM Annotation');
    return rows.map(row => this._mapToEntity(row));
  }

  async getRecent(limit = 10) {
    const [rows] = await this.pool.query('SELECT * FROM Annotation ORDER BY Date DESC LIMIT ?', [limit]);
    return rows.map(row => this._mapToEntity(row));
  }

  async getByUserId(userId) {
    const [rows] = await this.pool.query('SELECT * FROM Annotation WHERE User_ID = ? ORDER BY Date DESC', [userId]);
    return rows.map(row => this._mapToEntity(row));
  }

  async create(annotation) {
    const query = 'INSERT INTO Annotation (User_ID, Description, Date) VALUES (?, ?, ?)';
    const [result] = await this.pool.query(query, [
      annotation.userId,
      annotation.description,
      annotation.date
    ]);
    return result.insertId;
  }

  async delete(annotationId) {
    const [result] = await this.pool.query('DELETE FROM Annotation WHERE Annotation_ID = ?', [annotationId]);
    return result.affectedRows > 0;
  }

  _mapToEntity(row) {
    return new AnnotationEntity(
      row.Annotation_ID,
      row.User_ID,
      row.Description,
      row.Date
    );
  }
}

module.exports = MySQLAnnotationRepository;
