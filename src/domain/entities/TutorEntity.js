/**
 * TutorEntity - Domain entity for tutors (parent/guardians)
 */
class TutorEntity {
  constructor(tutorId, userId, firstName, lastName, contactNumber) {
    this.tutorId = tutorId;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.contactNumber = contactNumber;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = TutorEntity;
