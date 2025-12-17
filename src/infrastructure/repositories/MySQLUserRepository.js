const IUserRepository = require('../../domain/repositories/IUserRepository');
const UserEntity = require('../../domain/entities/UserEntity');

/**
 * MySQLUserRepository - MySQL implementation of IUserRepository
 */
class MySQLUserRepository extends IUserRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getAll() {
    const [rows] = await this.pool.query('SELECT * FROM Users');
    return rows.map(row => this._mapToEntity(row));
  }

  async getById(userId) {
    const [rows] = await this.pool.query('SELECT * FROM Users WHERE User_ID = ?', [userId]);
    if (rows.length === 0) return null;
    return this._mapToEntity(rows[0]);
  }

  async getProfessors() {
    const [rows] = await this.pool.query('SELECT * FROM Users WHERE Role_ID = 1000');
    return rows.map(row => this._mapToEntity(row));
  }

  async getStudents() {
    const [rows] = await this.pool.query('SELECT * FROM Users WHERE Role_ID = 1001');
    return rows.map(row => this._mapToEntity(row));
  }

  async countByRole() {
    const [professors] = await this.pool.query('SELECT COUNT(*) as count FROM Users WHERE Role_ID = 1000');
    const [students] = await this.pool.query('SELECT COUNT(*) as count FROM Users WHERE Role_ID = 1001');
    return {
      professors: professors[0].count,
      students: students[0].count
    };
  }

  async updateField(userId, field, value) {
    const allowedFields = ['First_Name', 'Last_Name', 'Age', 'Email', 'Grade_ID', 'Characteristics', 'Role_ID'];
    if (!allowedFields.includes(field)) {
      throw new Error(`Field ${field} not allowed for update`);
    }

    const query = `UPDATE Users SET ${field} = ? WHERE User_ID = ?`;
    const [result] = await this.pool.query(query, [value, userId]);
    return result.affectedRows > 0;
  }

  async deleteById(userId) {
    const [result] = await this.pool.query('DELETE FROM Users WHERE User_ID = ?', [userId]);
    return result.affectedRows > 0;
  }

  _mapToEntity(row) {
    return new UserEntity(
      row.User_ID,
      row.First_Name,
      row.Last_Name,
      row.Age,
      row.Email,
      row.Grade_ID,
      row.Characteristics,
      row.Role_ID
    );
  }
}

module.exports = MySQLUserRepository;
