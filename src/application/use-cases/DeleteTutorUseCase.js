/**
 * DeleteTutorUseCase - Delete tutor
 */
class DeleteTutorUseCase {
  constructor(tutorRepository) {
    this.tutorRepository = tutorRepository;
  }

  async execute(tutorId) {
    try {
      // Validate input
      if (!tutorId || typeof tutorId !== 'number') {
        return {
          success: false,
          error: 'Invalid Tutor ID'
        };
      }

      // Delete tutor
      const deleted = await this.tutorRepository.delete(tutorId);
      
      if (!deleted) {
        return {
          success: false,
          error: 'Tutor not found or delete failed'
        };
      }

      return {
        success: true,
        message: `Tutor ${tutorId} deleted successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = DeleteTutorUseCase;
