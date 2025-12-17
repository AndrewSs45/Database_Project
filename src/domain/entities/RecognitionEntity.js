/**
 * RecognitionEntity - Domain entity for student recognitions
 */
class RecognitionEntity {
  constructor(recognitionId, userId, description, date) {
    this.recognitionId = recognitionId;
    this.userId = userId;
    this.description = description;
    this.date = date;
  }

  getDateFormatted() {
    return new Date(this.date).toLocaleDateString('es-ES');
  }
}

module.exports = RecognitionEntity;
