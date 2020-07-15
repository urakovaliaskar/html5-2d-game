exports.up = async (knex) => {
  return await knex.schema.createTable("users", (t) => {
    t.increments();

    t.string("email").unique().notNullable();
    t.string("password").notNullable();
    t.string("role").notNullable();

    t.datetime("created_at").notNullable().defaultTo(knex.fn.now());
    t.datetime("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => await knex.schema.dropTable("users");
