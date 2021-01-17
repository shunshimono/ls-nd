const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring");

// サーバー側でファイルを読み込みをさせる
const index_page = fs.readFileSync("./index.ejs", "utf8");
const other_page = fs.readFileSync("./other.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");

const server = http.createServer(accessFromClient);

server.listen(4000);

console.log("Start Server!!");

function accessFromClient(request, response) {
  // trueにすることでクエリーパラメータを受け取ることが可能となる
  const url_parts = url.parse(request.url, true);
  switch (url_parts.pathname) {
    case "/":
      responseIndex(request, response);
      break;
    case "/other":
      responseOther(request, response);
      break;
    case "/style.css":
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(style_css);
      response.end();
      break;
    default:
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("no page....");
      break;
  }
}

var data = {
  msg: "no message...",
};

function responseIndex(request, response) {
  if (request.method == "POST") {
    var body = "";
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      data = qs.parse(body);
      setCookie("msg", data.msg, response);
      white_index(request, response);
    });
  } else {
    white_index(request, response);
  }
}

function white_index(request, response) {
  var msg = "※伝言を表示します。";
  var cookie_data = getCookie("msg", request);
  var content = ejs.render(index_page, {
    title: "index",
    content: msg,
    data: data,
    cookie_data: cookie_data,
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}

function setCookie(key, value, response) {
  var cookie = escape(value);
  response.setHeader("Set-Cookie", [key + "=" + cookie]);
}

function getCookie(key, request) {
  var cookie_data =
    request.headers.cookie != undefined ? request.headers.cookie : "";
  var data = cookie_data.split(";");
  for (var i in data) {
    if (data[i].trim().startsWith(key + "=")) {
      var result = data[i].trim().substring(key.length + 1);
      return unescape(result);
    }
  }
  return ``;
}

function responseOther(request, response) {
  var msg = "これがOtherページです";
  if (request.method == "POST") {
    var body = "";
    request.on("data", (data) => {
      body += data;
    });
    request.on("end", () => {
      var post_data = qs.parse(body);
      msg = `あなたは${post_data.msg}と書きました`;
      var content = ejs.render(other_page, {
        title: "other",
        content: msg,
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
    });
  } else {
    var msg = "ページはありません";
    var content = ejs.render(other_page, {
      title: "other",
      content: msg,
    });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(content);
    response.end();
  }
}
