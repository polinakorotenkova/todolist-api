const http = require("http");
http.createServer(function (request, response) {

  response.end(JSON.stringify({1:request.url}));
  console.log(`Запрошенный адрес: ${request.url}`);

}).listen(2000, "127.0.0.1", function () {
  console.log("Сервер начал прослушивание запросов на порту 3000");
});

let object = {1: '9'}