const { client } = require('./connect')

async function loginQuery(login, password) {
  const test = await client.query(`select * from users where login = '${login}' and password = '${password}'`)
  console.log(test.rows)

  if (test.rows == '') {
    return false
  } 

  return true
}

module.exports = {
  loginQuery
}
//если пользователь ввел неверные данные то передать ошибку с сервера на  фронтэнд
// а если все ок то ответить токеном (библитотека джейсон веб токен(скачать))