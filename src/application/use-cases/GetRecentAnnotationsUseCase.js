/**
 * GetRecentAnnotationsUseCase - Get recent annotations
 */
class GetRecentAnnotationsUseCase {
  constructor(annotationRepository) {
    this.annotationRepository = annotationRepository;
  }

  async execute(limit = 10) {
    try {
      const annotations = await this.annotationRepository.getRecent(limit);
      return {
        success: true,
        data: annotations
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GetRecentAnnotationsUseCase;
