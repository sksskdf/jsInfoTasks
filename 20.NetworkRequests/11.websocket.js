/*
RFC 6455 명세서에 정의된 프로토콜인 웹소켓(WebSocket)을 사용하면 서버와 브라우저 간 연결을 유지한 상태로 데이터를 교환할 수 있습니다. 이때 데이터는 ‘패킷(packet)’ 형태로 전달되며, 전송은 커넥션 중단과 추가 HTTP 요청 없이 양방향으로 이뤄집니다.
이런 특징 때문에 웹소켓은 온라인 게임이나 주식 트레이딩 시스템같이 데이터 교환이 지속적으로 이뤄져야 하는 서비스에 아주 적합합니다.

웹소켓 커넥션을 만들려면 new WebSocket을 호출하면 되는데, 이때 ws라는 특수 프로토콜을 사용합니다.
*/

let socket = new WebSocket("ws://javascript.info");

/*
ws말고 wss://라는 프로토콜도 있는데, 두 프로토콜의 관계는 HTTP와 HTTPS의 관계와 유사합니다.
* wss://를 사용하자.

소켓이 정상적으로 만들어지면 아래 네 개의 이벤트를 사용할 수 있게 됩니다.

open – 커넥션이 제대로 만들어졌을 때 발생함
message – 데이터를 수신하였을 때 발생함
error – 에러가 생겼을 때 발생함
close – 커넥션이 종료되었을 때 발생함

커넥션이 만들어진 상태에서 무언가를 보내고 싶으면 socket.send(data)를 사용하면 됩니다.

예시를 살펴봅시다.
*/
let socket = new WebSocket(
  "wss://javascript.info/article/websocket/demo/hello"
);

socket.onopen = function (e) {
  alert("[open] 커넥션이 만들어졌습니다.");
  alert("데이터를 서버에 전송해봅시다.");
  socket.send("My name is Bora");
};

socket.onmessage = function (event) {
  alert(`[message] 서버로부터 전송받은 데이터: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    alert(
      `[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`
    );
  } else {
    // 예시: 프로세스가 죽거나 네트워크에 장애가 있는 경우
    // event.code가 1006이 됩니다.
    alert("[close] 커넥션이 죽었습니다.");
  }
};

socket.onerror = function (error) {
  alert(`[error]`);
};

/*
위 예시는 데모 목적을 위해 만들어놓은 간이 Node.js 서버(server.js)에서 돌아갑니다. 서버는 'Hello from server, Bora’라는 메시지가 담긴 응답을 클라이언트에 보내고, 5초 후 커넥션을 종료시킵니다.

서버 쪽 코드가 동작하면서 open → message → close 순의 이벤트를 볼 수 있었던 것이죠.

이제 여러분은 웹소켓 통신이 어떻게 이뤄지는지를 알게 되셨습니다. 생각보다 꽤 간단하죠?

지금부턴 실무 수준에서 웹소켓을 활용할 수 있도록 웹소켓에 대해 좀 더 자세히 알아봅시다.
*/

/*
new WebSocket(url)을 호출해 소켓을 생성하면 즉시 연결이 시작됩니다.

커넥션이 유지되는 동안, 브라우저는 (헤더를 사용해) 서버에 '웹소켓을 지원하나요?'라고 물어봅니다. 
이에 서버가 '네’라는 응답을 하면 서버-브라우저간 통신은 HTTP가 아닌 웹소켓 프로토콜을 사용해 진행됩니다.
*/

/*
요약
WebSocket은 지속적인 브라우저-서버 연결을 유지하는 현대적인 방법입니다.

WebSocket에는 원본 간 제한이 없습니다.
브라우저에서 잘 지원됩니다.
문자열 및 바이너리 데이터를 송수신할 수 있습니다.
API는 간단합니다.

행동 양식:

socket.send(data),
socket.close([code], [reason]).
이벤트:

open,
message,
error,
close.
WebSocket 자체에는 재연결, 인증 및 기타 많은 고급 메커니즘이 포함되어 있지 않습니다. 따라서 이를 위한 클라이언트/서버 라이브러리가 있으며 이러한 기능을 수동으로 구현하는 것도 가능합니다.

때때로 WebSocket을 기존 프로젝트에 통합하기 위해 사람들은 WebSocket 서버를 기본 HTTP 서버와 병렬로 실행하고 단일 데이터베이스를 공유합니다. 
WebSocket에 대한 요청은 wss://ws.site.comWebSocket 서버로 연결되는 하위 도메인인 https://site.com기본 HTTP 서버로 이동합니다.

물론 다른 통합 방법도 가능합니다.
*/
