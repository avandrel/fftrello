var self = require('sdk/self');
var contextMenu = require("sdk/context-menu");
var Request = require("sdk/request").Request;

var token = "02T80GqJBJ5jdFVrwBXWDRI2";
var url = "http://ditrello.mgpm.pl/create";
//var url = "http://localhost:9292/create";

function show_response(responseText) {
	console.log(responseText)
}

function post(text) {
  Request({
      url: url,
      content: "token="+token+'&text="'+text+'"',
      onComplete: function (response) {
        show_response(response.text);
      }
    }).post();
}

var menuItemURL = contextMenu.Item({
  label: "Send selected URL to Trello",
  context: [contextMenu.URLContext("*"), contextMenu.SelectorContext("a[href], img")],
  contentScript: 'self.on("click", function (node, data) {' +
    			 '  self.postMessage(node.href||node.src);' +
    			 '});',
  onMessage: function (selectionText) {
    post(selectionText)
  }
});

var menuItemPage = contextMenu.Item({
  label: "Send page URL to Trello",
  context: contextMenu.PageContext(),
  contentScript: 'self.on("click", function (node, data) {' +
           '  self.postMessage(window.top.location.href);' +
           '});',
  onMessage: function (selectionText) {
    post(selectionText)
  }
});