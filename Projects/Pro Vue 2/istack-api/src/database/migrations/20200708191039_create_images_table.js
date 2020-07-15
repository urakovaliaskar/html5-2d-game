exports.up = async (knex) => {
  return await knex.schema.createTable("images", (t) => {
    t.increments("id").primary();
    t.string("satellite").notNullable();
    t.text("quicklook");
    t.text("quicklook_url");
    t.string("code").unique();
    t.date("meta_date").notNullable();
    t.specificType("polygon", "GEOMETRY");
    t.string("east", 64);
    t.string("west", 64);
    t.string("north", 64);
    t.string("south", 64);
    t.specificType("pitch", "DOUBLE PRECISION");
    t.specificType("roll", "DOUBLE PRECISION");
    t.specificType("yaw", "DOUBLE PRECISION");
    t.text("coordinates");
    t.specificType("across_track_incidence_angle", "DOUBLE PRECISION");
    t.specificType("along_track_incidence", "DOUBLE PRECISION");
    t.specificType("incidence_angle", "DOUBLE PRECISION");
    t.specificType("sun_elevation_angle", "DOUBLE PRECISION");
    t.specificType("sun_azimuth_angle", "DOUBLE PRECISION");
    t.json("raw_json");
    t.integer("cloud_coverage");
    t.json("geometry");
    t.integer("status_id").references("id").inTable("statuses").notNullable();
    t.integer("priority_id")
      .references("id")
      .inTable("priorities")
      .notNullable();
    t.integer("processing_level_id")
      .references("id")
      .inTable("processing_level")
      .notNullable();
    t.specificType("order", "serial");
    t.timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable("images");
};
