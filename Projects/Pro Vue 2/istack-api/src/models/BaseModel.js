import { Model } from "objection";

const now = new Date().toISOString();

export default class BaseModel extends Model {
  $beforeInsert() {
    this.created_at = now;
    this.updated_at = now;
  }

  $beforeUpdate() {
    this.updated_at = now;
  }
}
