const { client } = require('./connect')

async function addTodos(text, isDone, userId) {
  const test = await client.query(`INSERT INTO todos (text, is_done, user_id) values ('${text}', ${isDone}, ${userId})`)

  return test.rows
}

module.exports = {
  addTodos
}