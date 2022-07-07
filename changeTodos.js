const { client } = require('./connect')

async function changeTodo(id, userId, text, isDone) {
  //console.log(id)
  // const textSql = text ? textSql = text = '${text}'
  // text = '${text}' | is_done = '${isDone}' | text = '${text}' | is_done = '${isDone}'
  
  let textSql = ''
  let isDoneSql = ''

  if (text) {
   textSql = `text = '${text}'`
  }

  if (isDone !== undefined){
    isDoneSql = `is_done = ${isDone}`
  }

  const textAndIsDone = [textSql, isDoneSql].filter(elem => elem).join(', ')
  console.log(`UPDATE todos SET ${textAndIsDone} WHERE id = ${id} and user_id = ${userId}`)

  const test = await client.query(`UPDATE todos SET ${textAndIsDone} WHERE id = ${id} and user_id = ${userId}`)
  console.log(test)

  return test.rowCount
}

module.exports = {
  changeTodo
}