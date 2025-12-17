/**
 * IRecognitionRepository - Interface for Recognition repository
 */
class IRecognitionRepository {
  /**
   * Get all recognitions
   * @returns {Promise<RecognitionEntity[]>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Get recent recognitions
   * @param {number} limit
   * @returns {Promise<RecognitionEntity[]>}
   */
  async getRecent(limit = 10) {
    throw new Error('getRecent() must be implemented');
  }

  /**
   * Get recognitions by user ID
   * @param {string} userId
   * @returns {Promise<RecognitionEntity[]>}
   */
  async getByUserId(userId) {
    throw new Error('getByUserId() must be implemented');
  }

  /**
   * Create recognition
   * @param {RecognitionEntity} recognition
   * @returns {Promise<number>}
   */
  async create(recognition) {
    throw new Error('create() must be implemented');
  }

  /**
   * Delete recognition
   * @param {number} recognitionId
   * @returns {Promise<boolean>}
   */
  async delete(recognitionId) {
    throw new Error('delete() must be implemented');
  }
}

module.exports = IRecognitionRepository;
