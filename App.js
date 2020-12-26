const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");

const index_page = fs.readFileSync("./index.ejs", "utf8");
const other_page = fs.readFileSync("./other.ejs", "utf8");

/**
 * リクエストとレスポンスを管理する関数
 * サーバーにアクセスされた場合、当関数が実行される
 * @param {Object} request http.ClientRequest
 * @param {Object} response http.ServerResponse
 */
const controlRequestAndResponse = (request, response) => {
  var url_parts = url.parse(request.url);
  switch (url_parts.pathname) {
    case "/":
      var content = ejs.render(index_page, {
        title: "shimonoshun",
      });
      response.writeHead(200, { "Content-type": "text/html" });
      response.write(content);
      response.end();
      break;
    case "/other":
      var content = ejs.render(other_page, {
        title: "shimonoarisa",
      });
      response.writeHead(200, { "Content-type": "text/html" });
      response.write(content);
      response.end();
      break;
    default:
      response.writeHead(200, { "Content-type": "text/plain" });
      response.write("no..page");
      response.end();
      break;
  }
};

/**
 * サーバーオブジェクトを作成する
 * @return http.serverオブジェクト
 */
var server = http.createServer(controlRequestAndResponse);

server.listen(3000);

console.log("start server");
