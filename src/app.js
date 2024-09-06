const http = require("http");
const getUsers = require("./modules/users");
const hostIP = "http://127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `${hostIP}/`);
  const searchValue = url.searchParams;

  if (searchValue.has("hello")) {
    const userName = searchValue.get("hello");

    if (userName) {
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.header = "Content-Type: text/plain, application/json";
      response.end(`Hello, ${userName}`);
    } else {
      response.statusCode = 400;
      response.header = "Content-Type: text/plain";
      response.end("Enter a name");
    }
    return;
  }

  if (request.url === "/?users") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }

  if (request.url === "/") {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.end("Hello, world");
  } else {
    response.statusCode = 500;
    response.header = "Content-Type: text/plain";
    response.end("");
  }
  return;
});

server.listen(port, () => {
  console.log(`Сервер запущен по адресу ${hostIP}:${port}/`);
});
