const { error } = require('console');
const http = require("http");
const { parse } = require('querystring');
const { client } = require('./connect');
const { loginQuery } = require('./login-query');
const { regisration } = require('./registration-query');

http.createServer(function (request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  if (request.method === 'OPTIONS') {
    response.end('');
  }

  if (request.method == 'POST') {
    if (request.url == "/login") {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      request.on('end', async () => {
        const data = JSON.parse(body)
        let result = await loginQuery(data.email, data.password)
        console.log(result)
        const result1 = (JSON.stringify({ error: 'invalid login or password' }))
        if (!result) {
          response.statusCode = 401;
          response.end(result1)

          return;
        }
        var jwt = require('jsonwebtoken');
        var token = jwt.sign({ id: result.id,name: data.name }, "nasrat");
        const result2 = JSON.stringify({ token: token })

      
        response.end(result2)
      });
    }

    if (request.url == "/registration") {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      request.on('end', async () => {
        const data = JSON.parse(body)
        let result = await regisration(data.email, data.password, data.name)
        const result1 = (JSON.stringify({ error: 'this login is already in use' }))
        var jwt = require('jsonwebtoken');
        var token = jwt.sign({ login: data.email,name: data.name }, "nasrat");
        const result2 = JSON.stringify({ token: token })
        if (result == true) {
          response.end(result2)
          return
        } 
        response.statusCode = 401;
          response.end(result1)
      });
    }
  }

  console.log(`Запрошенный адрес: ${request.url}`);

}).listen(2000, "127.0.0.1", async function () {
  console.log('подключаемся к базе данных')
  await client.connect()
  console.log("Сервер начал прослушивание запросов на порту 2000");

});
