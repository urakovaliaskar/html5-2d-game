import BaseModel from './BaseModel';
import { Model } from 'objection';
import path from 'path';

export default class Status extends BaseModel {
  static get tableName() {
    return 'images';
  }

  static get modifiers() {
    return {
      filter(query, status_id, priority_id, processing_level_id) {
        if (status_id) query.where('status_id', status_id);
        if (priority_id) query.where('priority_id', priority_id);
        if (processing_level_id)
          query.where('processing_level_id', processing_level_id);
      },
    };
  }

  static get relationMappings() {
    return {
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, 'Status.js'),
        join: {
          from: 'images.status_id',
          to: 'statuses.id',
        },
      },
      priority: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, 'Priority.js'),
        join: {
          from: 'images.priority_id',
          to: 'priorities.id',
        },
      },
      processing_level: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, 'ProcessingLevel.js'),
        join: {
          from: 'images.processing_level_id',
          to: 'processing_level.id',
        },
      },
    };
  }
}
