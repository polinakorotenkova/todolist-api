const http = require("http");
const { parse } = require('querystring');
const { client } = require('./connect');
const { loginQuery } = require('./login-query');

http.createServer(function (request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  if (request.method === 'OPTIONS') {
    response.end('');
  }

  if (request.method == 'POST' && request.url == "/login") {
    let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', async () => {
          const data = JSON.parse (body)
          let result = await loginQuery(data.email, data.password)
          response.end(body);
          console.log(result)
      });
  }
  console.log(`Запрошенный адрес: ${request.url}`);

}).listen(2000, "127.0.0.1", async function () {
  console.log('подключаемся к базе данных')
  await client.connect()
  console.log("Сервер начал прослушивание запросов на порту 2000");

});
