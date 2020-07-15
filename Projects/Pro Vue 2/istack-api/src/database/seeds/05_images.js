const Status = require("../../models/Status");

exports.seed = (knex) => {
  return knex("images")
    .del()
    .then(async () => {
      const [status_id] = await knex("statuses")
        .select("*")
        .where({ title: "unprocessed" })
        .pluck("id");
      const [priority_id] = await knex("priorities")
        .select("*")
        .where({ title: "default" })
        .pluck("id");
      const [processing_level_id] = await knex("processing_level")
        .select("*")
        .where({ title: "L2" })
        .pluck("id");

      return knex("images").insert([
        {
          satellite: "Kazeosat-1",
          quicklook: "DGFHGJHK",
          quicklook_url: "dbsjksdllklfd.jpg",
          code: "GCFVHBJNKML",
          meta_date: new Date(),
          status_id,
          priority_id,
          processing_level_id,
        },
      ]);
    });
};
