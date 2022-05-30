const { client } = require('./connect')
async function loginQuery(login, password){
  const test = await client.query(`select * from users where login = '${login}' and password = '${password}'`)
  console.log(test.rows)
}
module.exports = {
loginQuery
}