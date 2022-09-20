const { client } = require('./connect');

async function loginQuery(login, password) {
  const test = await client.query(`select * from users where login = '${login}' and password = '${password}'`);

  return test.rows[0];
}

module.exports = {
  loginQuery,
};
