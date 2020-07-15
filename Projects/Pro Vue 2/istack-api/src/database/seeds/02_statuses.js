exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("statuses")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("statuses").insert([
        { title: "unprocessed" },
        { title: "processing" },
        { title: "processed" },
      ]);
    });
};
