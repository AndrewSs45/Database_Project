/**
 * ITutorRepository - Interface for Tutor repository
 */
class ITutorRepository {
  /**
   * Get all tutors
   * @returns {Promise<TutorEntity[]>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Get tutor by ID
   * @param {number} tutorId
   * @returns {Promise<TutorEntity>}
   */
  async getById(tutorId) {
    throw new Error('getById() must be implemented');
  }

  /**
   * Get tutor by User ID
   * @param {string} userId
   * @returns {Promise<TutorEntity>}
   */
  async getByUserId(userId) {
    throw new Error('getByUserId() must be implemented');
  }

  /**
   * Create new tutor
   * @param {TutorEntity} tutor
   * @returns {Promise<number>} tutor ID
   */
  async create(tutor) {
    throw new Error('create() must be implemented');
  }

  /**
   * Update tutor
   * @param {number} tutorId
   * @param {TutorEntity} tutor
   * @returns {Promise<boolean>}
   */
  async update(tutorId, tutor) {
    throw new Error('update() must be implemented');
  }

  /**
   * Delete tutor
   * @param {number} tutorId
   * @returns {Promise<boolean>}
   */
  async delete(tutorId) {
    throw new Error('delete() must be implemented');
  }

  /**
   * Delete tutor by User ID
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  async deleteByUserId(userId) {
    throw new Error('deleteByUserId() must be implemented');
  }
}

module.exports = ITutorRepository;
