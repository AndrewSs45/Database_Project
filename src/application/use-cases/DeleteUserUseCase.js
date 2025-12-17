/**
 * DeleteUserUseCase - Delete user by ID
 */
class DeleteUserUseCase {
  constructor(userRepository, tutorRepository) {
    this.userRepository = userRepository;
    this.tutorRepository = tutorRepository;
  }

  async execute(userId) {
    try {
      // Validate input
      if (!userId || typeof userId !== 'string') {
        return {
          success: false,
          error: 'Invalid User ID'
        };
      }

      // Check if user exists
      const user = await this.userRepository.getById(userId);
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      // Delete associated tutor if exists
      await this.tutorRepository.deleteByUserId(userId);

      // Delete user
      const deleted = await this.userRepository.deleteById(userId);
      
      if (!deleted) {
        return {
          success: false,
          error: 'Delete failed'
        };
      }

      return {
        success: true,
        message: `User ${userId} deleted successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = DeleteUserUseCase;
