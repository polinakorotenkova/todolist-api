
const { Client } = require('pg')

const client = new Client({password:'password', user:'postgres', database:'todolist-db'})

module.exports = {
  client
};
