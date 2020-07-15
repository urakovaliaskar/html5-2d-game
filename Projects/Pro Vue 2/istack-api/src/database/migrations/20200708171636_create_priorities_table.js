exports.up = async (knex) => {
  return await knex.schema.createTable("priorities", (t) => {
    t.increments();

    t.string("title").unique().notNullable();
    t.string("description");

    t.datetime("created_at").notNullable().defaultTo(knex.fn.now());
    t.datetime("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => await knex.schema.dropTable("priorities");
