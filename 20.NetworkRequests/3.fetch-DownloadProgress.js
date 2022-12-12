/*
fetch 메서드는 다운로드 진행률을 추적할 수 있습니다.
참고 : fetch 메서드엔 업로드 진행률을 추적할 수 있는 방법이 없습니다. 추적하려면 XMLHttpRequest를 사용하세요.

다운로드 진행률을 추적하려면 response.body 프로퍼티를 사용해야 합니다.
이는 ReadableStream 으로 청크별로 본문을 제공하는 특수 객체입니다.

response.text() 나 response.json()과 다르게 response.body는 진행률을 읽는 것을 넘어 전체적인 제어권을 줍니다.
다음은 코드 예시입니다.
*/

// instead of response.json() and other methods
const reader = response.body.getReader();

// infinite loop while the body is downloading
while (true) {
  // done is true for the last chunk
  // value is Uint8Array of the chunk bytes
  const { done, value } = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`);
}

/*
await reader.read() 호출 후 결과인 객체는 두 가지 속성을 가졌습니다.

done – 읽기가 완료되면 true 아니면 false를 반환합니다.
value – 바이트의 배열: Uint8Array.

로드가 완료될 때까지 루프에서 응답 청크를 수신합니다. 즉, done이 true가 될 때까지입니다.
진행 상황을 기록하려면 수신된 모든 조각 값을 카운터에 길이를 추가하기만 하면 됩니다.
*/

// Step 1: start the fetch and obtain a reader
let response = await fetch(
  "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100"
);

const reader = response.body.getReader();

// Step 2: get total length
const contentLength = +response.headers.get("Content-Length");

// Step 3: read the data
let receivedLength = 0; // received that many bytes at the moment
let chunks = []; // array of received binary chunks (comprises the body)
while (true) {
  const { done, value } = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`);
}

// Step 4: concatenate chunks into single Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for (let chunk of chunks) {
  chunksAll.set(chunk, position); // (4.2)
  position += chunk.length;
}

// Step 5: decode into a string
let result = new TextDecoder("utf-8").decode(chunksAll);

// We're done!
let commits = JSON.parse(result);
alert(commits[0].author.login);

/*
위의 예제 코드를 스텝 바이 스텝으로 알아봅시다.

1. response.json() 대신 스트림리더를 포함한 reponse.body.getReader()를 호출했습니다.

2. 읽기 전에 Content-Length 헤더에서 전체 응답 길이를 파악할 수 있습니다.

3. 완료될 때까지 await reader.read()를 호출합니다.
배열 청크에서 응답 청크를 수집합니다. 응답이 소비된 후에는 response.json() 또는 다른 방법을 사용하여 응답을 "다시 읽을" 수 없기 때문에 중요합니다(시도해 볼 순 있지만,오류가 발생함).

4. 마지막에는 Uint8Array 바이트 청크의 배열인 청크가 있습니다. 청크들을 하나의 결과로 결합해야 합니다. 안타깝게도 이들을 연결하는 단일 메서드가 없으므로 이를 수행하는 코드가  필요합니다.

5. chunksAll에 결과가 있습니다. 문자열이 아니라 바이트 배열입니다.
문자열을 생성하려면 이러한 바이트를 해석해야 합니다. 내장된 TextDecoder가 바로 그 일을 합니다. 그런 다음 필요한 경우 JSON.parse할 수 있습니다.
문자열 대신 바이너리 콘텐츠가 필요한 경우 어떻게 해야 할까요? 더 간단합니다. 4단계와 5단계에서 모든 청크에서 Blob을 생성하는 한 줄로 바꾸기만 하면 됩니다.
*/

let blob = new Blob(chunks);

