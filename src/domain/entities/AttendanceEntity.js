/**
 * AttendanceEntity - Domain entity for event attendance
 */
class AttendanceEntity {
  constructor(attendanceId, userId, eventId, date, status) {
    this.attendanceId = attendanceId;
    this.userId = userId;
    this.eventId = eventId;
    this.date = date;
    this.status = status; // 'Present', 'Absent', 'Justified'
  }

  isPresent() {
    return this.status === 'Present';
  }

  isAbsent() {
    return this.status === 'Absent';
  }

  isJustified() {
    return this.status === 'Justified';
  }

  getDateFormatted() {
    return new Date(this.date).toLocaleDateString('es-ES');
  }
}

module.exports = AttendanceEntity;
