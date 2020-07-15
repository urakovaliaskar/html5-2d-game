exports.up = async (knex) =>
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "postgis"');
exports.down = async (knex) =>
  await knex.schema.raw('DROP EXTENSION IF EXISTS "postgis"');
