import BaseModel from "./BaseModel";

export default class Priority extends BaseModel {
  static get tableName() {
    return "priorities";
  }

  static get relationMappings() {
    return {
      images: {
        relation: Model.HasManyRelation,
        modelClass: path.resolve(__dirname, "Image.js"),
        join: {
          from: "priority.id",
          to: "images.priority_id",
        },
      },
    };
  }
}
