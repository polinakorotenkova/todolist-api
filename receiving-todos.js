const { client } = require('./connect')

async function receivingTodos(userId) {
  const todos = await client.query(`select * from todos where user_id = ${userId}`)

  return todos.rows
}

module.exports = {
  receivingTodos
}