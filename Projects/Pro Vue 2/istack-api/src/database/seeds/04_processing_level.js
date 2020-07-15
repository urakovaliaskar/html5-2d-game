exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("processing_level")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("processing_level").insert([
        { title: "L1" },
        { title: "L2" },
        { title: "L2RPC" },
      ]);
    });
};
