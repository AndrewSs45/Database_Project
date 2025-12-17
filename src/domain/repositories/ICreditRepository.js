/**
 * ICreditRepository - Interface for Credit repository
 */
class ICreditRepository {
  /**
   * Get all credits
   * @returns {Promise<CreditEntity[]>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Get credits by user ID
   * @param {string} userId
   * @returns {Promise<CreditEntity[]>}
   */
  async getByUserId(userId) {
    throw new Error('getByUserId() must be implemented');
  }

  /**
   * Get credit by ID
   * @param {number} creditId
   * @returns {Promise<CreditEntity>}
   */
  async getById(creditId) {
    throw new Error('getById() must be implemented');
  }

  /**
   * Create credit
   * @param {CreditEntity} credit
   * @returns {Promise<number>}
   */
  async create(credit) {
    throw new Error('create() must be implemented');
  }

  /**
   * Delete credit
   * @param {number} creditId
   * @returns {Promise<boolean>}
   */
  async delete(creditId) {
    throw new Error('delete() must be implemented');
  }
}

module.exports = ICreditRepository;
