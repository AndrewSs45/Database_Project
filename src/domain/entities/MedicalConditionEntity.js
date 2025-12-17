/**
 * MedicalConditionEntity - Domain entity for medical conditions
 */
class MedicalConditionEntity {
  constructor(conditionId, userId, conditionName, description) {
    this.conditionId = conditionId;
    this.userId = userId;
    this.conditionName = conditionName;
    this.description = description;
  }
}

module.exports = MedicalConditionEntity;
