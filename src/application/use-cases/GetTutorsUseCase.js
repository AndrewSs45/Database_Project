/**
 * GetTutorsUseCase - Get list of tutors
 */
class GetTutorsUseCase {
  constructor(tutorRepository) {
    this.tutorRepository = tutorRepository;
  }

  async execute() {
    try {
      const tutors = await this.tutorRepository.getAll();
      return {
        success: true,
        data: tutors
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GetTutorsUseCase;
