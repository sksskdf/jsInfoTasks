/*
브라우저는 스크립트, iframe, 사진과 같은 외부 리소스의 로딩을 추적할 수 있도록 해줍니다.
외부 리소스 로딩엔 두 가지 이벤트가 있습니다.

- onload - 성공적으로 로드 됐을 때
- onerror - 에러가 발생했을 때

써드 파티 스크립트를 로드하고 함수를 호출해야 한다고 가정해봅시다.
우리는 다음과 같이 동적으로 스크립트를 로드 할 수도 있습니다.
*/
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);

/*
하지만 불러온 스크립트 내부에 정의 된 함수를 어떻게 하면 호출 할 수 있을까요?
우린 스크립트가 로드 될 때까지 기다렸다가 호출 하는 수 밖에 없을 겁니다.

위와 같은 상황을 해결해 줄 수 있는 이벤트 중 하나는 load 이벤트 입니다.
load 이벤트는 스크립트가 로드 된 후 실행을 트리거 합니다.
*/

let script = document.createElement('script');

// can load any script, from any domain
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

script.onload = function() {
  // the script creates a variable "_"
  alert( _.VERSION ); // shows library version
};

/*
onload 내부에선 불러온 스크립트의 변수를 사용하거나 함수를 호출할 수도 있습니다.
하지만 만약 불러오기에 실패한다면 어떻게 될까요?

스크립트를 불러오는 도중 에러가 발생한다면 error 이벤트로 이를 추적할 수 있습니다.
예시로, 존재하지 않는 스크립트를 요청해보겠습니다.
*/

let script = document.createElement('script');
script.src = "https://example.com/404.js"; // no such script
document.head.append(script);

script.onerror = function() {
  alert("Error loading " + this.src); // Error loading https://example.com/404.js
};

/*
상세한 HTTP 에러메시지를 얻을 순 없습니다.

load와 error 이벤트는 스크립트 외에 다른 리소스에도 사용할 수 있습니다.
기본적으로 외부 src를 갖는 모든 리소스에는 다 사용할 수 있습니다.
*/

let img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif"; // (*)

img.onload = function() {
  alert(`Image loaded, size ${img.width}x${img.height}`);
};

img.onerror = function() {
  alert("Error occurred while loading image");
};

/*
명심해야 할 몇가지 사항이 있습니다.
- 대부분의 리소스는 도큐먼트에 추가될 때 로드를 시작합니다. 하지만 img는 예외입니다. img는 src가 선언될 때 로드를 시작합니다. (*)
- iframe은 iframe 로딩이 완료(load, error)됐을때 iframe.onload 이벤트를 트리거 합니다.

한가지 규칙이 있습니다.
다른 사이트에서 가져온 스크립트에선 다른 사이트의 요소에 접근할 수 없습니다.
가령 페이스북에서 가져온 스크립트에선 지메일에서의 유저의 메일박스에 접근할 수 없습니다.

혹은, 조금 더 정확하게 묘사하자면 한 오리진(도메인/포트/프로토콜)에선 다른 오리진의 컨텐츠에 접근할 수 없습니다.
따라서 하위 도메인이나 다른 포트가 있더라도 이들은 서로 액세스할 수 없는 다른 출처입니다.

이러한 규칙은 다른 도메인의 리소스에도 영향을 끼칩니다.

만약 다른 도메인의 스크립트를 사용하고 있고, 스크립트에서 에러가 난다면, 우리는 에러의 상세를 알 수 없습니다.

액세스를 허용하려면 <script> 태그에 crossorigin 속성이 있어야 하며 원격 서버에서 특수 헤더를 제공해야 합니다.
CORS엔 세가지 단계가 있습니다.

1. crossorigin 속성이 없을 경우.
2. crossorigin="anonymous" – 서버가 헤더 Access-Control-Allow-Origin with * 또는 오리진으로 응답하는 경우 액세스가 허용됩니다. 브라우저는 인증 정보와 쿠키를 원격 서버로 보내지 않습니다.
3. crossorigin="use-credentials" – 서버가 원본과 함께 Access-Control-Allow-Origin 헤더를 다시 보내고 Access-Control-Allow-Credentials: true인 경우 액세스가 허용됩니다. 브라우저는 인증 정보와 쿠키를 원격 서버로 보냅니다.
*/