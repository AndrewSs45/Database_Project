const TutorEntity = require('../../domain/entities/TutorEntity');

/**
 * UpdateTutorUseCase - Update tutor
 */
class UpdateTutorUseCase {
  constructor(tutorRepository) {
    this.tutorRepository = tutorRepository;
  }

  async execute(tutorId, userId, firstName, lastName, contactNumber) {
    try {
      // Validate input
      if (!tutorId || !userId || !firstName || !lastName || !contactNumber) {
        return {
          success: false,
          error: 'All fields are required'
        };
      }

      // Validate lengths
      if (firstName.length > 50 || lastName.length > 50) {
        return {
          success: false,
          error: 'First name and last name must be 50 characters or less'
        };
      }

      if (contactNumber.length > 20) {
        return {
          success: false,
          error: 'Contact number must be 20 characters or less'
        };
      }

      // Create tutor entity
      const tutor = new TutorEntity(tutorId, userId, firstName, lastName, contactNumber);

      // Update tutor
      const updated = await this.tutorRepository.update(tutorId, tutor);
      
      if (!updated) {
        return {
          success: false,
          error: 'Tutor not found or update failed'
        };
      }

      return {
        success: true,
        message: 'Tutor updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = UpdateTutorUseCase;
