/**
 * GetRecentRecognitionsUseCase - Get recent recognitions
 */
class GetRecentRecognitionsUseCase {
  constructor(recognitionRepository) {
    this.recognitionRepository = recognitionRepository;
  }

  async execute(limit = 10) {
    try {
      const recognitions = await this.recognitionRepository.getRecent(limit);
      return {
        success: true,
        data: recognitions
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GetRecentRecognitionsUseCase;
