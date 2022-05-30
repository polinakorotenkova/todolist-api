/**var pg = require("pg")
var connectionString = "pg://postgres:postgres@localhost:5432/todolist-db";
var client = new pg.Client(connectionString);
const connection = client.connect();
*/
const { Client } = require('pg')

const client = new Client({password:'password', user:'postgres', database:'todolist-db'})

module.exports = {
  client
};
