const { client } = require('./connect');

async function deleteTodos(id, userId) {
  const test = await client.query(`DELETE FROM todos WHERE id = ${id} and user_id = ${userId}`);

  return test.rowCount;
}

module.exports = {
  deleteTodos,
};
