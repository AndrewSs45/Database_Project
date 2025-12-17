/**
 * ICreditHistoryRepository - Interface for Credit History repository
 */
class ICreditHistoryRepository {
  /**
   * Get credit history by user ID
   * @param {string} userId
   * @returns {Promise<CreditHistoryEntity>}
   */
  async getByUserId(userId) {
    throw new Error('getByUserId() must be implemented');
  }

  /**
   * Get all credit histories
   * @returns {Promise<CreditHistoryEntity[]>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Create credit history
   * @param {CreditHistoryEntity} history
   * @returns {Promise<number>}
   */
  async create(history) {
    throw new Error('create() must be implemented');
  }

  /**
   * Update credit history
   * @param {number} historyId
   * @param {CreditHistoryEntity} history
   * @returns {Promise<boolean>}
   */
  async update(historyId, history) {
    throw new Error('update() must be implemented');
  }
}

module.exports = ICreditHistoryRepository;
