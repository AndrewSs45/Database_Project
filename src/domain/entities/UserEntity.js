/**
 * UserEntity - Domain entity for users (students, professors)
 */
class UserEntity {
  constructor(userId, firstName, lastName, age, email, gradeId, characteristics, roleId) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.gradeId = gradeId;
    this.characteristics = characteristics;
    this.roleId = roleId;
  }

  isStudent() {
    return this.roleId === 1001;
  }

  isProfessor() {
    return this.roleId === 1000;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = UserEntity;
