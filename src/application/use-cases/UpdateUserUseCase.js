/**
 * UpdateUserUseCase - Update user field (Age, Characteristics, etc.)
 */
class UpdateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId, field, value) {
    try {
      // Validate input
      if (!userId || !field || value === null || value === undefined) {
        return {
          success: false,
          error: 'Invalid input: userId, field, and value are required'
        };
      }

      // Validate field length
      if (field.length > 50) {
        return {
          success: false,
          error: 'Field name too long'
        };
      }

      // Validate value (basic)
      if (typeof value === 'string' && value.length > 500) {
        return {
          success: false,
          error: 'Value too long'
        };
      }

      // Update user
      const updated = await this.userRepository.updateField(userId, field, value);
      
      if (!updated) {
        return {
          success: false,
          error: 'User not found or update failed'
        };
      }

      return {
        success: true,
        message: `User ${field} updated successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = UpdateUserUseCase;
