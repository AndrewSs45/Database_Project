const IAttendanceRepository = require('../../domain/repositories/IAttendanceRepository');
const AttendanceEntity = require('../../domain/entities/AttendanceEntity');

/**
 * MySQLAttendanceRepository - MySQL implementation of IAttendanceRepository
 */
class MySQLAttendanceRepository extends IAttendanceRepository {
  constructor(pool) {
    super();
    this.pool = pool;
  }

  async getAll() {
    const [rows] = await this.pool.query('SELECT * FROM Attendance');
    return rows.map(row => this._mapToEntity(row));
  }

  async getByEventId(eventId) {
    const [rows] = await this.pool.query('SELECT * FROM Attendance WHERE Event_ID = ?', [eventId]);
    return rows.map(row => this._mapToEntity(row));
  }

  async getByUserId(userId) {
    const [rows] = await this.pool.query('SELECT * FROM Attendance WHERE User_ID = ?', [userId]);
    return rows.map(row => this._mapToEntity(row));
  }

  async getById(attendanceId) {
    const [rows] = await this.pool.query('SELECT * FROM Attendance WHERE Attendance_ID = ?', [attendanceId]);
    if (rows.length === 0) return null;
    return this._mapToEntity(rows[0]);
  }

  async create(attendance) {
    const query = 'INSERT INTO Attendance (User_ID, Event_ID, Date, Status) VALUES (?, ?, ?, ?)';
    const [result] = await this.pool.query(query, [
      attendance.userId,
      attendance.eventId,
      attendance.date,
      attendance.status
    ]);
    return result.insertId;
  }

  async update(attendanceId, attendance) {
    const query = 'UPDATE Attendance SET User_ID = ?, Event_ID = ?, Date = ?, Status = ? WHERE Attendance_ID = ?';
    const [result] = await this.pool.query(query, [
      attendance.userId,
      attendance.eventId,
      attendance.date,
      attendance.status,
      attendanceId
    ]);
    return result.affectedRows > 0;
  }

  async delete(attendanceId) {
    const [result] = await this.pool.query('DELETE FROM Attendance WHERE Attendance_ID = ?', [attendanceId]);
    return result.affectedRows > 0;
  }

  _mapToEntity(row) {
    return new AttendanceEntity(
      row.Attendance_ID,
      row.User_ID,
      row.Event_ID,
      row.Date,
      row.Status
    );
  }
}

module.exports = MySQLAttendanceRepository;
