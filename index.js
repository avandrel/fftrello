var self = require('sdk/self');
var contextMenu = require("sdk/context-menu");
var Request = require("sdk/request").Request;
var notifications = require("sdk/notifications");

var token = "02T80GqJBJ5jdFVrwBXWDRI2";
var url = "http://ditrello.mgpm.pl/create";
//var url = "http://localhost:9292/create";

function show_response(responseText) {
	console.log(responseText);
  var parsed = JSON.parse(responseText);
  notifications.notify({
  title: "AW RAZEM",
  iconURL: self.data.url(parsed['status']+".png"),
  text: parsed['text']})
}

function post(text) {
  Request({
      url: url,
      content: "token="+token+'&text="'+encodeURIComponent(text)+'"',
      onComplete: function (response) {
        show_response(response.text);
      }
    }).post();
}

var menuItemURL = contextMenu.Item({
  label: "Send selected URL to Trello",
  image: self.data.url("ico.png"),
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
  image: self.data.url("ico.png"),
  context: contextMenu.PageContext(),
  contentScript: 'self.on("click", function (node, data) {' +
           '  self.postMessage(window.top.location.href);' +
           '});',
  onMessage: function (selectionText) {
    post(selectionText)
  }
});