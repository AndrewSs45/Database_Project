/**
 * GetDashboardKPIsUseCase - Get key performance indicators for dashboard
 */
class GetDashboardKPIsUseCase {
  constructor(userRepository, tutorRepository, eventRepository, creditHistoryRepository) {
    this.userRepository = userRepository;
    this.tutorRepository = tutorRepository;
    this.eventRepository = eventRepository;
    this.creditHistoryRepository = creditHistoryRepository;
  }

  async execute() {
    try {
      const [{ professors, students }, tutors, upcomingEvents] = await Promise.all([
        this.userRepository.countByRole(),
        this.tutorRepository.getAll(),
        this.eventRepository.getUpcoming()
      ]);

      return {
        success: true,
        data: {
          totalProfessors: professors,
          totalStudents: students,
          totalTutors: tutors.length,
          upcomingEvents: upcomingEvents.length
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GetDashboardKPIsUseCase;
