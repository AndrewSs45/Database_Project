/**
 * IAnnotationRepository - Interface for Annotation repository
 */
class IAnnotationRepository {
  /**
   * Get all annotations
   * @returns {Promise<AnnotationEntity[]>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Get recent annotations
   * @param {number} limit
   * @returns {Promise<AnnotationEntity[]>}
   */
  async getRecent(limit = 10) {
    throw new Error('getRecent() must be implemented');
  }

  /**
   * Get annotations by user ID
   * @param {string} userId
   * @returns {Promise<AnnotationEntity[]>}
   */
  async getByUserId(userId) {
    throw new Error('getByUserId() must be implemented');
  }

  /**
   * Create annotation
   * @param {AnnotationEntity} annotation
   * @returns {Promise<number>}
   */
  async create(annotation) {
    throw new Error('create() must be implemented');
  }

  /**
   * Delete annotation
   * @param {number} annotationId
   * @returns {Promise<boolean>}
   */
  async delete(annotationId) {
    throw new Error('delete() must be implemented');
  }
}

module.exports = IAnnotationRepository;
