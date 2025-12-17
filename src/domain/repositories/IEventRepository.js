/**
 * IEventRepository - Interface for Event repository
 */
class IEventRepository {
  /**
   * Get all events
   * @returns {Promise<EventEntity[]>}
   */
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  /**
   * Get upcoming events
   * @returns {Promise<EventEntity[]>}
   */
  async getUpcoming() {
    throw new Error('getUpcoming() must be implemented');
  }

  /**
   * Get event by ID
   * @param {number} eventId
   * @returns {Promise<EventEntity>}
   */
  async getById(eventId) {
    throw new Error('getById() must be implemented');
  }

  /**
   * Create event
   * @param {EventEntity} event
   * @returns {Promise<number>}
   */
  async create(event) {
    throw new Error('create() must be implemented');
  }

  /**
   * Update event
   * @param {number} eventId
   * @param {EventEntity} event
   * @returns {Promise<boolean>}
   */
  async update(eventId, event) {
    throw new Error('update() must be implemented');
  }

  /**
   * Delete event
   * @param {number} eventId
   * @returns {Promise<boolean>}
   */
  async delete(eventId) {
    throw new Error('delete() must be implemented');
  }
}

module.exports = IEventRepository;
