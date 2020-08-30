(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleNewMsg=void 0;var _sockets=require("./sockets"),sendMsgForm=document.getElementById("js-sendMsgForm"),messages=document.getElementById("js-messages"),appendMsg=function(e,s){var n=document.createElement("li");n.innerHTML='\n    <span class="author '.concat(s?"others":"self",'">\n    ').concat(s||"You",":\n    </span>").concat(e,"\n    "),messages.appendChild(n)},handleNewMsg=function(e){var s=e.message,n=e.nickname;return appendMsg(s,n)};exports.handleNewMsg=handleNewMsg;var handleSubmit=function(e){e.preventDefault();var s=sendMsgForm.querySelector("input"),n=s.value;(0,_sockets.getSocket)().emit(window.events.sendMsg,{message:n}),s.value="",appendMsg(n)};sendMsgForm&&sendMsgForm.addEventListener("submit",handleSubmit);

},{"./sockets":6}],2:[function(require,module,exports){
"use strict";var _require=require("./sockets"),initSocket=_require.initSocket,loginForm=document.getElementById("js-loginForm"),body=document.querySelector("body"),NICKNAME="nickname",LOGGED_IN="loggedIn",LOGGED_OUT="loggedOut",nickname=localStorage.getItem(NICKNAME),login=function(e){var n=io("/");n.emit(window.events.setNickname,{nickname:e}),initSocket(n)};null===nickname?body.className=LOGGED_OUT:(body.className=LOGGED_IN,login(nickname));var handleFormSubmit=function(e){e.preventDefault();var n=loginForm.querySelector("input"),o=n.value;n.value="",localStorage.setItem(NICKNAME,o),body.className=LOGGED_IN,login(o)};loginForm.addEventListener("submit",handleFormSubmit);

},{"./sockets":6}],3:[function(require,module,exports){
"use strict";require("./login"),require("./sockets"),require("./chat"),require("./paint");

},{"./chat":1,"./login":2,"./paint":5,"./sockets":6}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleDisconnected=exports.handleNewUser=void 0;var body=document.querySelector("body"),fireNotification=function(e,n){var t=document.createElement("div");t.innerText=e,t.style.backgroundColor=n,t.className="notification",body.appendChild(t)},handleNewUser=function(e){var n=e.nickname;fireNotification("".concat(n," just joined!"),"rgb(0, 122, 255)")};exports.handleNewUser=handleNewUser;var handleDisconnected=function(e){var n=e.nickname;fireNotification("".concat(n," just left!"),"rgb(255, 149, 0)")};exports.handleDisconnected=handleDisconnected;

},{}],5:[function(require,module,exports){
"use strict";

},{}],6:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSocket=exports.updateSocket=exports.getSocket=void 0;var _notificatoins=require("./notificatoins"),_chat=require("./chat"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var updateSocket=function(e){return socket=e};exports.updateSocket=updateSocket;var initSocket=function(e){var t=window.events;updateSocket(e),socket.on(t.newUser,_notificatoins.handleNewUser),socket.on(t.disconnected,_notificatoins.handleDisconnected),socket.on(t.newMsg,_chat.handleNewMsg)};exports.initSocket=initSocket;

},{"./chat":1,"./notificatoins":4}]},{},[3]);
