/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("posts").del();

  await knex("posts").insert([
    {
      id: 1,
      title: "How to make yout own homemade toothpaste",
      content:
        "This is some content about making your own homemade toothpaste. It is easy and fun!",
    },
    {
      id: 2,
      title: "Is it bad to eat raw lime every morning?",
      content:
        "This is some content about eating raw lime every morning. It has its pros and cons.",
    },
    {
      id: 3,
      title: "Can you eat 20 bananas every day?",
      content:
        "This is some content about eating 20 bananas every day. It might be too much for some people.",
    },
  ]);
};
