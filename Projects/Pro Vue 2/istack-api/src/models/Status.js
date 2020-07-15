import BaseModel from './BaseModel';

export default class Status extends BaseModel {
  static get tableName() {
    return 'statuses';
  }

  static get relationMappings() {
    return {
      images: {
        relation: Model.HasManyRelation,
        modelClass: path.resolve(__dirname, 'Image.js'),
        join: {
          from: 'status.id',
          to: 'images.status_id',
        },
      },
    };
  }
}
