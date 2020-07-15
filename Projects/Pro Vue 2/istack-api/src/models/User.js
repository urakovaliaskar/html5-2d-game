import BaseModel from './BaseModel';
const Password = require('objection-password')();

export default class User extends Password(BaseModel) {
  static get tableName() {
    return 'users';
  }
}
