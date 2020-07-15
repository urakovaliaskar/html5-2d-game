exports.seed = (knex) => {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        {
          email: "urakov.aliaskar@gmail.com",
          password:
            "$2b$12$o.oMyWzdRt2/goY4m2KdyOCKv.CeMp7s7C4vVw92LVAS8DP7FhgMm", //Admin123456789
          role: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    });
};
