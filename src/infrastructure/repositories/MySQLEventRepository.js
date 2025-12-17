const IEventRepository = require('../../domain/repositories/IEventRepository');
const EventEntity = require('../../domain/entities/EventEntity');

/**
 * MySQLEventRepository - MySQL implementation of IEventRepository
 */
class MySQLEventRepository extends IEventRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getAll() {
    const [rows] = await this.pool.query('SELECT * FROM Event');
    return rows.map(row => this._mapToEntity(row));
  }

  async getUpcoming() {
    const [rows] = await this.pool.query('SELECT * FROM Event WHERE Date >= CURDATE() ORDER BY Date ASC');
    return rows.map(row => this._mapToEntity(row));
  }

  async getById(eventId) {
    const [rows] = await this.pool.query('SELECT * FROM Event WHERE Event_ID = ?', [eventId]);
    if (rows.length === 0) return null;
    return this._mapToEntity(rows[0]);
  }

  async create(event) {
    const query = 'INSERT INTO Event (Event_Name, Description, Date, Location) VALUES (?, ?, ?, ?)';
    const [result] = await this.pool.query(query, [
      event.eventName,
      event.description,
      event.date,
      event.location
    ]);
    return result.insertId;
  }

  async update(eventId, event) {
    const query = 'UPDATE Event SET Event_Name = ?, Description = ?, Date = ?, Location = ? WHERE Event_ID = ?';
    const [result] = await this.pool.query(query, [
      event.eventName,
      event.description,
      event.date,
      event.location,
      eventId
    ]);
    return result.affectedRows > 0;
  }

  async delete(eventId) {
    const [result] = await this.pool.query('DELETE FROM Event WHERE Event_ID = ?', [eventId]);
    return result.affectedRows > 0;
  }

  _mapToEntity(row) {
    return new EventEntity(
      row.Event_ID,
      row.Event_Name,
      row.Description,
      row.Date,
      row.Location
    );
  }
}

module.exports = MySQLEventRepository;
