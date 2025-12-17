/**
 * GetCreditsUseCase - Get all credits
 */
class GetCreditsUseCase {
  constructor(creditRepository) {
    this.creditRepository = creditRepository;
  }

  async execute() {
    try {
      const credits = await this.creditRepository.getAll();
      return {
        success: true,
        data: credits
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GetCreditsUseCase;
