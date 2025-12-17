/**
 * GetMedicalConditionsUseCase - Get all medical conditions
 */
class GetMedicalConditionsUseCase {
  constructor(medicalConditionRepository) {
    this.medicalConditionRepository = medicalConditionRepository;
  }

  async execute() {
    try {
      const conditions = await this.medicalConditionRepository.getAll();
      return {
        success: true,
        data: conditions
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = GetMedicalConditionsUseCase;
