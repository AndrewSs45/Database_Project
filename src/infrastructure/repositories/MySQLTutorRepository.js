const ITutorRepository = require('../../domain/repositories/ITutorRepository');
const TutorEntity = require('../../domain/entities/TutorEntity');

/**
 * MySQLTutorRepository - MySQL implementation of ITutorRepository
 */
class MySQLTutorRepository extends ITutorRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getAll() {
    const [rows] = await this.pool.query('SELECT * FROM Tutor');
    return rows.map(row => this._mapToEntity(row));
  }

  async getById(tutorId) {
    const [rows] = await this.pool.query('SELECT * FROM Tutor WHERE Tutor_ID = ?', [tutorId]);
    if (rows.length === 0) return null;
    return this._mapToEntity(rows[0]);
  }

  async getByUserId(userId) {
    const [rows] = await this.pool.query('SELECT * FROM Tutor WHERE User_ID = ?', [userId]);
    if (rows.length === 0) return null;
    return this._mapToEntity(rows[0]);
  }

  async create(tutor) {
    const query = 'INSERT INTO Tutor (User_ID, First_Name, Last_Name, Contact_Number) VALUES (?, ?, ?, ?)';
    const [result] = await this.pool.query(query, [
      tutor.userId,
      tutor.firstName,
      tutor.lastName,
      tutor.contactNumber
    ]);
    return result.insertId;
  }

  async update(tutorId, tutor) {
    const query = 'UPDATE Tutor SET User_ID = ?, First_Name = ?, Last_Name = ?, Contact_Number = ? WHERE Tutor_ID = ?';
    const [result] = await this.pool.query(query, [
      tutor.userId,
      tutor.firstName,
      tutor.lastName,
      tutor.contactNumber,
      tutorId
    ]);
    return result.affectedRows > 0;
  }

  async delete(tutorId) {
    const [result] = await this.pool.query('DELETE FROM Tutor WHERE Tutor_ID = ?', [tutorId]);
    return result.affectedRows > 0;
  }

  async deleteByUserId(userId) {
    const [result] = await this.pool.query('DELETE FROM Tutor WHERE User_ID = ?', [userId]);
    return result.affectedRows > 0;
  }

  _mapToEntity(row) {
    return new TutorEntity(
      row.Tutor_ID,
      row.User_ID,
      row.First_Name,
      row.Last_Name,
      row.Contact_Number
    );
  }
}

module.exports = MySQLTutorRepository;
