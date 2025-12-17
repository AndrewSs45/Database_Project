/**
 * CreditEntity - Domain entity for student credits (positive/negative)
 */
class CreditEntity {
  constructor(creditId, userId, type, reason, date, value) {
    this.creditId = creditId;
    this.userId = userId;
    this.type = type; // 'Positive' or 'Negative'
    this.reason = reason;
    this.date = date;
    this.value = value;
  }

  isPositive() {
    return this.type === 'Positive';
  }

  isNegative() {
    return this.type === 'Negative';
  }

  getDateFormatted() {
    return new Date(this.date).toLocaleDateString('es-ES');
  }
}

module.exports = CreditEntity;
