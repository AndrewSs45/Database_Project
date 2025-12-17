/**
 * IUserRepository - Interface for User repository
 */
class IUserRepository {
  /**
   * Get all users
   * @returns {Promise<UserEntity[]>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Get user by ID
   * @param {string} userId
   * @returns {Promise<UserEntity>}
   */
  async getById(userId) {
    throw new Error('getById() must be implemented');
  }

  /**
   * Get all professors (Role_ID = 1000)
   * @returns {Promise<UserEntity[]>}
   */
  async getProfessors() {
    throw new Error('getProfessors() must be implemented');
  }

  /**
   * Get all students (Role_ID = 1001)
   * @returns {Promise<UserEntity[]>}
   */
  async getStudents() {
    throw new Error('getStudents() must be implemented');
  }

  /**
   * Count users by role
   * @returns {Promise<Object>} { professors: number, students: number }
   */
  async countByRole() {
    throw new Error('countByRole() must be implemented');
  }

  /**
   * Update user field
   * @param {string} userId
   * @param {string} field
   * @param {any} value
   * @returns {Promise<boolean>}
   */
  async updateField(userId, field, value) {
    throw new Error('updateField() must be implemented');
  }

  /**
   * Delete user by ID
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  async deleteById(userId) {
    throw new Error('deleteById() must be implemented');
  }
}

module.exports = IUserRepository;
