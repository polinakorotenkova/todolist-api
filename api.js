const http = require("http");
const { parse } = require('querystring');

http.createServer(function (request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

  if (request.method === 'OPTIONS') {
    response.end('');
  }

  if (request.method == 'POST') {
    let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
          console.log(body);
          response.end(body);
      });
    console.log(body)
  }
  console.log(`Запрошенный адрес: ${request.url}`);

}).listen(2000, "127.0.0.1", function () {
  console.log("Сервер начал прослушивание запросов на порту 2000");
});
