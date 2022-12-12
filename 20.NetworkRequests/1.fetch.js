/*
일반적인 fetch 요청은 두 개의 await 호출로 구성됩니다.

let response = await fetch(url, options); // 응답 헤더와 함께 이행됨
let result = await response.json(); // json 본문을 읽음
물론 await 없이도 요청을 보낼 수 있습니다.

fetch(url, options)
  .then(response => response.json())
  .then(result =>  결과 처리 )
  응답 객체의 프로퍼티는 다음과 같습니다.

  response.status – 응답의 HTTP 코드
  response.ok – 응답 상태가 200과 299 사이에 있는 경우 true
  response.headers – 맵과 유사한 형태의 HTTP 헤더
  응답 본문을 얻으려면 다음과 같은 메서드를 사용하면 됩니다.
  
  response.text() – 응답을 텍스트 형태로 반환함
  response.json() – 응답을 파싱해 JSON 객체로 변경함
  response.formData() – 응답을 FormData 객체 형태로 반환(form/multipart 인코딩에 대한 내용은 다음 챕터에서 다룸)
  response.blob() – 응답을 Blob(타입이 있는 바이너리 데이터) 형태로 반환
  response.arrayBuffer() – 응답을 ArrayBuffer(바이너리 데이터를 로우 레벨로 표현한 것) 형태로 반환
  지금까지 배운 fetch 옵션은 다음과 같습니다.
  
  method – HTTP 메서드
  headers – 요청 헤드가 담긴 객체(제약 사항이 있음)
  body – 보내려는 데이터(요청 본문)로 string이나 FormData, BufferSource, Blob, UrlSearchParams 객체 형태
  이어지는 챕터에선 이 외의 옵션과 다양한 fetch 유스 케이스를 살펴보겠습니다.
*/