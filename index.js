var self = require('sdk/self');
var contextMenu = require("sdk/context-menu");
var Request = require("sdk/request").Request;

var token = "p0huRzD8YD3wyRtW7WDclNuR";
var url = "http://ditrello.mgpm.pl/create";

function show_response(responseText) {
	console.log(responseText)
}

function post(text) {
  Request({
      url: url,
      content: "token="+token+"&text=Zgłaszam link"+text+"&trigger_word=Zgłaszam link",
      onComplete: function (response) {
        show_response(response.text);
      }
    }).post();
}

var menuItem = contextMenu.Item({
  label: "Send to Trello",
  context: [contextMenu.URLContext("*"), contextMenu.SelectorContext("a[href], img")],
  contentScript: 'self.on("click", function (node, data) {' +
    			 '  self.postMessage(node.href||node.src);' +
    			 '});',
  onMessage: function (selectionText) {
    post(selectionText)
  }
});
