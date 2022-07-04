const { client } = require('./connect')

async function receivingTodos(userId) {
  console.log(userId);
  const todos = await client.query(`select * from todos where user_id = ${userId}`)
  console.log(todos.rows)

  return todos.rows
}

module.exports = {
  receivingTodos
}