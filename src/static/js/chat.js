(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.enableChat=exports.disableChat=exports.handleNewMsg=void 0;var _sockets=require("./sockets"),sendMsgForm=document.getElementById("js-sendMsgForm"),messages=document.getElementById("js-messages"),appendMsg=function(e,s){var n=document.createElement("li");n.innerHTML='\n    <span class="author '.concat(s?"others":"self",'">\n    ').concat(s||"You",":\n    </span>").concat(e,"\n    "),messages.appendChild(n)},handleNewMsg=function(e){var s=e.message,n=e.nickname;return appendMsg(s,n)};exports.handleNewMsg=handleNewMsg;var handleSubmit=function(e){e.preventDefault();var s=sendMsgForm.querySelector("input"),n=s.value;(0,_sockets.getSocket)().emit(window.events.sendMsg,{message:n}),s.value="",appendMsg(n)},disableChat=function(){return sendMsgForm.style.display="none"};exports.disableChat=disableChat;var enableChat=function(){return sendMsgForm.style.display="flex"};exports.enableChat=enableChat,sendMsgForm&&sendMsgForm.addEventListener("submit",handleSubmit);

},{"./sockets":5}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleDisconnected=exports.handleNewUser=void 0;var body=document.querySelector("body"),fireNotification=function(e,n){var t=document.createElement("div");t.innerText=e,t.style.backgroundColor=n,t.className="notification",body.appendChild(t)},handleNewUser=function(e){var n=e.nickname;fireNotification("".concat(n," just joined!"),"rgb(0, 122, 255)")};exports.handleNewUser=handleNewUser;var handleDisconnected=function(e){var n=e.nickname;fireNotification("".concat(n," just left!"),"rgb(255, 149, 0)")};exports.handleDisconnected=handleDisconnected;

},{}],3:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleFilled=exports.handleBeganStroke=exports.handleBeganPath=exports.showControls=exports.hideControls=exports.disableCanvas=exports.enableCanvas=exports.resetCanvas=void 0;var _sockets=require("./sockets"),canvas=document.getElementById("js-canvas"),ctx=canvas.getContext("2d"),range=document.getElementById("js-thickness"),colors=document.querySelectorAll("#js-color"),modeBtn=document.getElementById("js-changeMode"),saveBtn=document.getElementById("js-save"),controls=document.getElementById("js-controls"),paint=!1,thickness=1,color="black",mode="PAINT",startPainting=function(){paint=!0},stopPainting=function(){paint=!1},beganPath=function(e,n){ctx.beginPath(),ctx.moveTo(e,n)},beganStroke=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=ctx.strokeStyle;null!==t&&(ctx.strokeStyle=t),ctx.lineTo(e,n),ctx.stroke(),ctx.strokeStyle=a},painting=function(e){var n=e.offsetX,t=e.offsetY;!0!==paint?(beganPath(n,t),(0,_sockets.getSocket)().emit(window.events.beginPath,{x:n,y:t})):(beganStroke(n,t),(0,_sockets.getSocket)().emit(window.events.beginStroke,{x:n,y:t,color:color}))},changeThickness=function(e){thickness=e.target.value,ctx.lineWidth=thickness},changeColor=function(e){var n=e.target;color=n.style.backgroundColor,ctx.strokeStyle=color,ctx.fillStyle=color},filled=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;null!==e&&(ctx.fillStyle=e),ctx.fillRect(0,0,canvas.width,canvas.height)},changeBoardColor=function(){"FILL"===mode&&((0,_sockets.getSocket)().emit(window.events.fill,{color:color}),filled())},changeMode=function(e){mode=e.target.innerText,e.target.innerText="PAINT"==mode?"FILL":"PAINT"},saveFile=function(){var e=document.createElement("a");e.download="Paint✅.png",e.href=canvas.toDataURL(),e.click()},resetCanvas=function(){return filled("#fff")};exports.resetCanvas=resetCanvas;var enableCanvas=function(){canvas.addEventListener("mousedown",startPainting),canvas.addEventListener("mouseup",stopPainting),canvas.addEventListener("mouseleave",stopPainting),canvas.addEventListener("mousemove",painting),canvas.addEventListener("click",changeBoardColor)};exports.enableCanvas=enableCanvas;var disableCanvas=function(){canvas.removeEventListener("mousedown",startPainting),canvas.removeEventListener("mouseup",stopPainting),canvas.removeEventListener("mouseleave",stopPainting),canvas.removeEventListener("mousemove",painting),canvas.removeEventListener("click",changeBoardColor)};exports.disableCanvas=disableCanvas;var hideControls=function(){controls.style.display="none"};exports.hideControls=hideControls;var showControls=function(){controls.style.display="flex"};exports.showControls=showControls;var handleBeganPath=function(e){var n=e.x,t=e.y;return beganPath(n,t)};exports.handleBeganPath=handleBeganPath;var handleBeganStroke=function(e){var n=e.x,t=e.y,a=e.color;return beganStroke(n,t,a)};exports.handleBeganStroke=handleBeganStroke;var handleFilled=function(e){var n=e.color;return filled(n)};exports.handleFilled=handleFilled,canvas&&(enableCanvas(),range.addEventListener("input",changeThickness),colors.forEach(function(e){e.addEventListener("click",changeColor)}),modeBtn.addEventListener("click",changeMode),saveBtn.addEventListener("click",saveFile));

},{"./sockets":5}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleGameStarting=exports.handleGameEnded=exports.handleLeaderNotif=exports.handleGameStarted=exports.handlePlayerUpdate=void 0;var _paint=require("./paint"),_chat=require("./chat"),players=document.getElementById("js-players"),notifs=document.getElementById("js-notifs"),handlePlayerUpdate=function(e){var a=e.sockets;players.innerHTML="",a.forEach(function(e){var a=document.createElement("div");a.innerText="".concat(e.nickname," : ").concat(e.score),players.appendChild(a)})};exports.handlePlayerUpdate=handlePlayerUpdate;var setNotif=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";notifs.innerText=e},handleGameStarted=function(){setNotif(),(0,_paint.disableCanvas)(),(0,_paint.hideControls)()};exports.handleGameStarted=handleGameStarted;var handleLeaderNotif=function(e){var a=e.word;setNotif("You are the leader. Paint: ".concat(a)),(0,_chat.disableChat)(),(0,_paint.enableCanvas)(),(0,_paint.showControls)()};exports.handleLeaderNotif=handleLeaderNotif;var handleGameEnded=function(){setNotif("Game ended"),(0,_paint.disableCanvas)(),(0,_paint.hideControls)(),(0,_paint.resetCanvas)()};exports.handleGameEnded=handleGameEnded;var handleGameStarting=function(){return setNotif("Game will start soon")};exports.handleGameStarting=handleGameStarting;

},{"./chat":1,"./paint":3}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSocket=exports.getSocket=void 0;var _notificatoins=require("./notificatoins"),_chat=require("./chat"),_paint=require("./paint"),_players=require("./players"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var initSocket=function(e){var t=window.events;(socket=e).on(t.newUser,_notificatoins.handleNewUser),socket.on(t.disconnected,_notificatoins.handleDisconnected),socket.on(t.newMsg,_chat.handleNewMsg),socket.on(t.beganPath,_paint.handleBeganPath),socket.on(t.beganStroke,_paint.handleBeganStroke),socket.on(t.filled,_paint.handleFilled),socket.on(t.playerUpdate,_players.handlePlayerUpdate),socket.on(t.gameStarted,_players.handleGameStarted),socket.on(t.leaderNotif,_players.handleLeaderNotif),socket.on(t.gameEnded,_players.handleGameEnded),socket.on(t.gameStarting,_players.handleGameStarting)};exports.initSocket=initSocket;

},{"./chat":1,"./notificatoins":2,"./paint":3,"./players":4}]},{},[1]);
