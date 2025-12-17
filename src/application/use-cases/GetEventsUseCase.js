/**
 * GetEventsUseCase - Get all events
 */
class GetEventsUseCase {
  constructor(eventRepository) {
    this.eventRepository = eventRepository;
  }

  async execute() {
    try {
      const events = await this.eventRepository.getAll();
      return {
        success: true,
        data: events
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GetEventsUseCase;
