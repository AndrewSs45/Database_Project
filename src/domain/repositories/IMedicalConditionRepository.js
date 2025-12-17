/**
 * IMedicalConditionRepository - Interface for Medical Condition repository
 */
class IMedicalConditionRepository {
  /**
   * Get all medical conditions
   * @returns {Promise<MedicalConditionEntity[]>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Get medical conditions by user ID
   * @param {string} userId
   * @returns {Promise<MedicalConditionEntity[]>}
   */
  async getByUserId(userId) {
    throw new Error('getByUserId() must be implemented');
  }

  /**
   * Get medical condition by ID
   * @param {number} conditionId
   * @returns {Promise<MedicalConditionEntity>}
   */
  async getById(conditionId) {
    throw new Error('getById() must be implemented');
  }

  /**
   * Create medical condition
   * @param {MedicalConditionEntity} condition
   * @returns {Promise<number>}
   */
  async create(condition) {
    throw new Error('create() must be implemented');
  }

  /**
   * Delete medical condition
   * @param {number} conditionId
   * @returns {Promise<boolean>}
   */
  async delete(conditionId) {
    throw new Error('delete() must be implemented');
  }
}

module.exports = IMedicalConditionRepository;
