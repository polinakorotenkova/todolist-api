const { client } = require('./connect')

async function deleteTodos(id, userId) {
  console.log(id)
  const test = await client.query(`DELETE FROM todos WHERE id = ${id} and user_id = ${userId}`)
  console.log(test)

  return test.rowCount
}

module.exports = {
  deleteTodos
}