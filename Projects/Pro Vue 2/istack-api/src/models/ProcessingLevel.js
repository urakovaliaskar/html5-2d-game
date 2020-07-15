import BaseModel from "./BaseModel";

export default class ProcessingLevel extends BaseModel {
  static get tableName() {
    return "processing_level";
  }

  static get relationMappings() {
    return {
      images: {
        relation: Model.HasManyRelation,
        modelClass: path.resolve(__dirname, "Image.js"),
        join: {
          from: "processing_level.id",
          to: "images.processing_level_id",
        },
      },
    };
  }
}
