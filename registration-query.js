const { client } = require('./connect');

async function regisration(login, password, name) {
  const uniclogin = await client.query(`select * from users where login = '${login}'`);

  if (uniclogin.rows === '') {
    const test = await client.query(`INSERT INTO users (login, password, name) values ('${login}', '${password}', '${name}') returning id`);
    return test;
  }

  return false;
}

module.exports = {
  regisration,
};
