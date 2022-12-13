/*
지금까지 fetch에 대해 간략히 알아보았습니다.
이제 fetch API의 나머지 부분을 알아보겠습니다.

다음은 fetch API의 전체 리스트입니다.
*/

let promise = fetch(url, {
    method: "GET", // POST, PUT, DELETE, etc.
    headers: {
      // the content type header value is usually auto-set
      // depending on the request body
      "Content-Type": "text/plain;charset=UTF-8"
    },
    body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
    referrer: "about:client", // or "" to send no Referer header,
    // or an url from the current origin
    referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
    mode: "cors", // same-origin, no-cors
    credentials: "same-origin", // omit, include
    cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
    redirect: "follow", // manual, error
    integrity: "", // a hash, like "sha256-abcdef1234567890"
    keepalive: false, // true
    signal: undefined, // AbortController to abort request
    window: window // null
});

/*
referrer, referrerPolicy

이 옵션들은 HTTP referrer헤더를 설정합니다.
일반적으로 해당 헤더는 자동으로 설정되며 요청한 페이지의 URL을 포함합니다. 대부분의 시나리오에서는 전혀 중요하지 않으며 때로는 보안상의 이유로 제거하거나 줄이는 것이 좋습니다.
리퍼러 옵션을 사용하면 현재 원점 내의 모든 리퍼러를 설정하거나 제거할 수 있습니다.
리퍼러를 보내지 않으려면 빈 문자열로 설정하세요
referrerPolicy 옵션은 Referer에 대한 일반 규칙을 설정합니다.

요청은 3가지 유형으로 나뉩니다..
1. 동일한 원본에 요청합니다. 
2. 다른 원본에 요청합니다. 
3. HTTPS에서 HTTP로(안전한 프로토콜에서 안전하지 않은 프로토콜로) 요청합니다.

정확한 Referer 값을 설정할 수 있는 참조 옵션과 달리 referrerPolicy는 각 요청 유형에 대한 일반 규칙을 브라우저에 알려줍니다.

사이트 외부에서 알려서는 안 되는 URL 구조를 가진 관리 영역이 있다고 가정해 보겠습니다.
fetch를 보내면 기본적으로 항상 페이지의 전체 URL과 함께 Referer 헤더를 보냅니다(HTTPS에서 HTTP로 요청한 다음 참조자가 없는 경우 제외).
다른 웹 사이트가 URL 경로가 아닌 원본 부분만 알고 싶다면 다음 옵션을 설정할 수 있습니다.
*/

fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});

/*
mode

모드 옵션은 간혹 발생하는 교차 출처 요청을 방지하는 안전 장치입니다.
cors - 기본값이며, 교차 출처 요청이 허용됩니다.
same-origin - 교차 출처 요청이 금지됩니다.
no-cors - 단순 교차 출처 요청만 허용됩니다.

이 옵션은 fetch를 위한 URL이 타사에서 제공되고 출처 간 기능을 제한하기 위해 "전원 끄기 스위치"가 필요한 경우에 유용할 수 있습니다.
*/

/*
credentials

이 옵션은 요청에 쿠키와 함께 HTTP 인증 헤더를 보낼지에 대한 여부입니다.
same-origin - 기본값, 교차출처요청시엔 보내지 않는다.
include - 항상 보냄. 교차출처 서버로부터 Accept-Control-Allow-Credentials 를 필요로 함.
omit - 보내지 않음. 심지어 같은 출처 요청시에도
*/

/*
cache

fetch요청은 표준 HTTP caching을 사용합니다. 
캐시 옵션을 사용하면 HTTP 캐시를 무시하거나 사용법을 미세 조정할 수 있습니다.

default - 기본 HTTP caching
no-store - HTTP chacing을 무시. 만약 If-Modified-Since, If-None-Match, If-Unmodified-Since, If-Match,  If-Range 헤더를 설정했다면 이 값이 기본값이 됨.
reload - HTTP 캐시(있는 경우)에서 결과를 가져오지 않고 응답으로 캐시를 채움(응답 헤더가 허용하는 경우).
no-cache - 캐시된 응답이 있으면 조건부 요청을, 그렇지 않으면 일반 요청을 작성함. 응답으로 HTTP 캐시를 채움.
force-cache - 오래된 경우에도 HTTP 캐시의 응답을 사용함. HTTP 캐시에 응답이 없으면 정기적으로 HTTP 요청을 하고 정상적으로 작동함.
only-if-cache - 오래된 경우에도 HTTP 캐시의 응답을 사용함 HTTP 캐시에 응답이 없으면 오류임. 모드가 "same-origin"인 경우에만 작동합니다.
*/

/*
redirect

일반적으로 fetch는 301, 302 등과 같은 HTTP 리디렉션을 투명하게 따릅니다.
리디렉션 옵션을 사용하면 다음을 변경할 수 있습니다.
follow – 기본값, HTTP-리다이렉션 따름.
error - 리다이렉트의 에러의 경우.
manual - HTTP 리디렉션을 따르지 않지만 response.url이 새 URL이 되고 response.redirected가 true가 되어 새 URL로 수동으로 리디렉션을 수행할 수 있음.(필요한 경우).
*/

/*
integrity

무결성 옵션을 사용하면 응답이 미리 알려진 체크섬과 일치하는지 확인할 수 있습니다.
사양에 설명된 대로 지원되는 해시 함수는 SHA-256, SHA-384 및 SHA-512이며 브라우저에 따라 다른 것이 있을 수 있습니다.
예를 들어 파일을 다운로드하고 있는데 SHA-256 체크섬이 "abcdef"라는 것을 알고 있습니다(물론 실제 체크섬은 더 깁니다).
다음과 같이 무결성 옵션에 넣을 수 있습니다.
그런 다음 가져오기는 자체적으로 SHA-256을 계산하고 문자열과 비교합니다. 일치하지 않는 경우 오류가 발생합니다.
*/

/*
keepalive

keepalive 옵션은 요청이 시작된 웹페이지보다 오래 지속될 수 있음을 나타냅니다.
예를 들어, 현재 방문자가 우리 페이지를 사용하는 방법(마우스 클릭, 그가 본 페이지 조각)에 대한 통계를 수집하여 사용자 경험을 분석하고 개선합니다.
방문자가 페이지를 떠날 때 – 우리는 서버에 데이터를 저장하고 싶습니다. 이를 위해 window.onunload 이벤트를 사용할 수 있습니다.
*/

window.onunload = function() {
    fetch('/analytics', {
      method: 'POST',
      body: "statistics",
      keepalive: true
    });
};

/*
일반적으로 문서가 언로드되면 연결된 모든 네트워크 요청이 중단됩니다. 
그러나 keepalive 옵션은 브라우저가 페이지를 떠난 후에도 백그라운드에서 요청을 수행하도록 지시합니다. 
따라서 이 옵션은 요청이 성공하는 데 필수적입니다.
*/