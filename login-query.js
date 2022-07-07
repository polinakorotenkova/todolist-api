const { client } = require('./connect')

async function loginQuery(login, password) {
  const test = await client.query(`select * from users where login = '${login}' and password = '${password}'`)
  console.log(test.rows)

  return test.rows[0]
}

module.exports = {
  loginQuery
}
//если пользователь ввел неверные данные то передать ошибку с сервера на  фронтэнд
// а если все ок то ответить токеном (библитотека джейсон веб токен(скачать))
// сделать запрос на получение todos конкретного юзера
// добавление 
//удаление
//редактирование
//для редактроования нужно в запросе передать id тудушки and new data (column text or isdone) method put