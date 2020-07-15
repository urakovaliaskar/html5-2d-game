exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("priorities")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("priorities").insert([
        { title: "default" },
        { title: "standart" },
        { title: "priority" },
        { title: "express" },
      ]);
    });
};
