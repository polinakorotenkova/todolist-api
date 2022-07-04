const { client } = require('./connect')

async function addTodos(text, isDone, userId) {
  console.log(text,isDone,userId)
  const test = await client.query(`INSERT INTO todos (text, is_done, user_id) values ('${text}', ${isDone}, ${userId})`)
  console.log(test.rows)

  return test.rows
}

module.exports = {
  addTodos
}