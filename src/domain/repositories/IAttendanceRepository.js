/**
 * IAttendanceRepository - Interface for Attendance repository
 */
class IAttendanceRepository {
  /**
   * Get all attendance records
   * @returns {Promise<AttendanceEntity[]>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Get attendance by event ID
   * @param {number} eventId
   * @returns {Promise<AttendanceEntity[]>}
   */
  async getByEventId(eventId) {
    throw new Error('getByEventId() must be implemented');
  }

  /**
   * Get attendance by user ID
   * @param {string} userId
   * @returns {Promise<AttendanceEntity[]>}
   */
  async getByUserId(userId) {
    throw new Error('getByUserId() must be implemented');
  }

  /**
   * Get attendance by ID
   * @param {number} attendanceId
   * @returns {Promise<AttendanceEntity>}
   */
  async getById(attendanceId) {
    throw new Error('getById() must be implemented');
  }

  /**
   * Create attendance record
   * @param {AttendanceEntity} attendance
   * @returns {Promise<number>}
   */
  async create(attendance) {
    throw new Error('create() must be implemented');
  }

  /**
   * Update attendance record
   * @param {number} attendanceId
   * @param {AttendanceEntity} attendance
   * @returns {Promise<boolean>}
   */
  async update(attendanceId, attendance) {
    throw new Error('update() must be implemented');
  }

  /**
   * Delete attendance record
   * @param {number} attendanceId
   * @returns {Promise<boolean>}
   */
  async delete(attendanceId) {
    throw new Error('delete() must be implemented');
  }
}

module.exports = IAttendanceRepository;
