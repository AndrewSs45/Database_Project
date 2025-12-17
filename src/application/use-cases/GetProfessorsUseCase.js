/**
 * GetProfessorsUseCase - Get list of professors
 */
class GetProfessorsUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    try {
      const professors = await this.userRepository.getProfessors();
      return {
        success: true,
        data: professors
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GetProfessorsUseCase;
