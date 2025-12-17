/**
 * AnnotationEntity - Domain entity for annotations (notes about students)
 */
class AnnotationEntity {
  constructor(annotationId, userId, description, date) {
    this.annotationId = annotationId;
    this.userId = userId;
    this.description = description;
    this.date = date;
  }

  getDateFormatted() {
    return new Date(this.date).toLocaleDateString('es-ES');
  }
}

module.exports = AnnotationEntity;
