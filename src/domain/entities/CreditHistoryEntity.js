/**
 * CreditHistoryEntity - Domain entity for credit balance history
 */
class CreditHistoryEntity {
  constructor(historyId, userId, totalPositive, totalNegative, balance) {
    this.historyId = historyId;
    this.userId = userId;
    this.totalPositive = totalPositive;
    this.totalNegative = totalNegative;
    this.balance = balance;
  }

  getBalance() {
    return this.totalPositive - this.totalNegative;
  }
}

module.exports = CreditHistoryEntity;
