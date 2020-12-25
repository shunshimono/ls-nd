/**
 * httpモジュールをインストール
 * httpとは？サーバとクライアントの対話を可能にするプロトコルのこと
 */
const http = require("http");

/**
 * リクエストとレスポンスを管理する関数
 * サーバーにアクセスされた場合、当関数が実行される
 * @param {Object} request http.ClientRequest
 * @param {Object} response http.ServerResponse
 */
const controlRequestAndResponse = (request, response) => {
  response.end("hello node.js");
};

/**
 * サーバーオブジェクトを作成する
 * @return http.serverオブジェクト
 */
var server = http.createServer(controlRequestAndResponse);

server.listen(3000);
