const { client } = require('./connect')

async function changeTodo(id, userId, text, isDone) {
  
  let textSql = ''
  let isDoneSql = ''

  if (text) {
   textSql = `text = '${text}'`
  }

  if (isDone !== undefined){
    isDoneSql = `is_done = ${isDone}`
  }

  const textAndIsDone = [textSql, isDoneSql].filter(elem => elem).join(', ')

  const test = await client.query(`UPDATE todos SET ${textAndIsDone} WHERE id = ${id} and user_id = ${userId}`)

  return test.rowCount
}

module.exports = {
  changeTodo
}