/**
 * GetAttendanceUseCase - Get all attendance records
 */
class GetAttendanceUseCase {
  constructor(attendanceRepository) {
    this.attendanceRepository = attendanceRepository;
  }

  async execute() {
    try {
      const attendance = await this.attendanceRepository.getAll();
      return {
        success: true,
        data: attendance
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GetAttendanceUseCase;
