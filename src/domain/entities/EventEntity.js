/**
 * EventEntity - Domain entity for academic events
 */
class EventEntity {
  constructor(eventId, eventName, description, date, location) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.description = description;
    this.date = date;
    this.location = location;
  }

  getDateFormatted() {
    return new Date(this.date).toLocaleDateString('es-ES');
  }

  isUpcoming() {
    return new Date(this.date) > new Date();
  }
}

module.exports = EventEntity;
