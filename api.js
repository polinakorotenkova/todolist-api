const { error } = require('console');
const http = require("http");
var jwt = require('jsonwebtoken');
const { parse } = require('querystring');
const { addTodos } = require('./add-todos');
const { client } = require('./connect');
const { loginQuery } = require('./login-query');
const { receivingTodos } = require('./receiving-todos');
const { regisration } = require('./registration-query');

http.createServer(async function (request, response) {
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
        var token = jwt.sign({ userId: result.id,name: data.name }, "nasrat");
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

    if (request.url == "/addtodos") {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      request.on('end', async () => {
        const data = JSON.parse(body)
        const token = request.headers.authorization;
        const decoded = jwt.verify(token, 'nasrat');
        console.log(decoded);
        let result = await addTodos(data.text, data.isDone, decoded.userId)
        console.log(result)
        const result2 = 'task added successfully'
        const result1 = JSON.stringify({ error: 'error 1' })
        if (!result) {
          response.statusCode = 401;
          response.end(result1)

          return;
        }
        response.end(result2)})
    }
  }

  if (request.method == 'GET') {
    if (request.url == "/todos") {
        const token = request.headers.authorization;
        const decoded = jwt.verify(token, 'nasrat');
        console.log(decoded);
        let result = await receivingTodos(decoded.userId)
        console.log(result)
        const result1 = (JSON.stringify({ error: 'error' }))
        if (!result.length) {
          response.statusCode = 401;
          response.end(result1)

          return;
        }

        response.end(JSON.stringify(result))
    }
  }

  console.log(`Запрошенный адрес: ${request.url}`);

}).listen(2000, "127.0.0.1", async function () {
  console.log('подключаемся к базе данных')
  await client.connect()
  console.log("Сервер начал прослушивание запросов на порту 2000");

});
