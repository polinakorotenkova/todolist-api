function getDataFromBody(request, callBack) {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });
  request.on('end', async () => {
    const data = JSON.parse(body);
    callBack(data);
  });
}

module.exports = {
  getDataFromBody,
};
