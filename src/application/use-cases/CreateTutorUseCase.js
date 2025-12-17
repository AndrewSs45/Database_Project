const TutorEntity = require('../../domain/entities/TutorEntity');

/**
 * CreateTutorUseCase - Create new tutor
 */
class CreateTutorUseCase {
  constructor(tutorRepository) {
    this.tutorRepository = tutorRepository;
  }

  async execute(userId, firstName, lastName, contactNumber) {
    try {
      // Validate input
      if (!userId || !firstName || !lastName || !contactNumber) {
        return {
          success: false,
          error: 'All fields are required: userId, firstName, lastName, contactNumber'
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
      const tutor = new TutorEntity(null, userId, firstName, lastName, contactNumber);

      // Save tutor
      const tutorId = await this.tutorRepository.create(tutor);

      return {
        success: true,
        tutorId,
        message: 'Tutor created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = CreateTutorUseCase;
