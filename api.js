const http = require('http');
const jwt = require('jsonwebtoken');
const { addTodos } = require('./add-todos');
const { changeTodo } = require('./changeTodos');
const { client } = require('./connect');
const { deleteTodos } = require('./delete');
const { loginQuery } = require('./login-query');
const { receivingTodos } = require('./receiving-todos');
const { regisration } = require('./registration-query');
const { getDataFromBody } = require('./getDataFromBody');

http.createServer(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
  response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

  if (request.method === 'OPTIONS') {
    response.end('');
  }

  if (request.method === 'POST') {
    if (request.url === '/login') {
      getDataFromBody(request, async (data) => {
        const result = await loginQuery(data.email, data.password);
        const result1 = (JSON.stringify({ error: 'invalid login or password' }));
        if (!result) {
          response.statusCode = 401;
          response.end(result1);

          return;
        }
        const token = jwt.sign({ userId: result.id, name: data.name }, 'nasrat');
        const result2 = JSON.stringify({ token });

        response.end(result2);
      });
    }
  }

  if (request.url === '/registration') {
    getDataFromBody(request, async (data) => {
      const result = await regisration(data.email, data.password, data.name);

      if (!result) {
        const result1 = (JSON.stringify({ error: 'this login is already in use' }));
        response.statusCode = 401;
        response.end(result1);
        return;
      }

      const token = jwt.sign({ userId: result.rows[0].id, name: data.name }, 'nasrat');
      const result2 = JSON.stringify({ token });

      response.end(result2);
    });
  }

  if (request.url === '/addtodos') {
    getDataFromBody(request, async (data) => {
      const token = request.headers.authorization;
      const decoded = jwt.verify(token, 'nasrat');
      const result = await addTodos(data.text, data.isDone, decoded.userId);
      const result2 = 'task added successfully';
      const result1 = JSON.stringify({ error: 'error 1' });
      if (!result) {
        response.statusCode = 401;
        response.end(result1);

        return;
      }
      response.end(result2);
    });
  }

  if (request.method === 'GET') {
    if (request.url === '/todos') {
      const token = request.headers.authorization;
      const decoded = jwt.verify(token, 'nasrat');
      const result = await receivingTodos(decoded.userId);
      response.end(JSON.stringify(result));
    }
  }

  if (request.method === 'DELETE') {
    if (request.url === '/delete') {
      getDataFromBody(request, async (data) => {
        const token = request.headers.authorization;
        const decoded = jwt.verify(token, 'nasrat');
        const { userId } = decoded;
        const result = await deleteTodos(data.id, userId);
        const result1 = JSON.stringify({ error: 'error' });
        const result2 = 'task deleted';
        if (result === 0) {
          response.statusCode = 401;
          response.end(result1);
          return;
        }
        response.end(result2);
      });
    }
  }

  if (request.method === 'PUT') {
    if (request.url === '/change') {
      getDataFromBody(request, async (data) => {
        const token = request.headers.authorization;
        const decoded = jwt.verify(token, 'nasrat');
        const { userId } = decoded;
        const result = await changeTodo(data.id, userId, data.text, data.isDone);
        const result1 = JSON.stringify({ error: 'error' });
        const result2 = 'task changed';
        if (result === 0) {
          response.statusCode = 401;
          response.end(result1);
          return;
        }
        response.end(result2);
      });
    }
  }
}).listen(2000, '127.0.0.1', async () => {
  await client.connect();
});
