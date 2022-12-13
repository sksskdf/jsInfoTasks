/*
fetch는 프로미스를 반환합니다.
그리고 자바스크립트는 프로미스를 중단하는 것과 같은 컨셉이 없습니다.
그렇다면 진행되고 있는 프로미스는 어떻게 하면 중단할 수 있을까요?
예를 들어 사용자로부터의 데이터불러오기와 같은 작업을 말이죠

위와 같은 목적을 가진 내장객체가 있습니다.
AbortController는 fetch 뿐만 아니라 다른 비동기작업들 또한 중단시킬 수 있습니다.

사용법은 간단합니다.
*/

let controller = new AbortController();

/*
컨트롤러는 굉장히 단순합니다.
abort() 라는 메서드 만 가지고 있고, signal이라는 프로퍼티 하나만 갖고 있는데, 이 signal 프로퍼티에는 이벤트리스너를 등록할 수 있습니다,

abort()가 호출되면 controller.signal은 중단 이벤트를 내보내고
controller.signal.aborted 속성이 true가 됩니다.

일반적으로, 우리는 사용법은 아래와 같습니다.

1. controller.signal에 리스너를 설정합니다.
2. 필요할 때 controller.abort()를 호출합니다.

다음은 예제 입니다.
*/

let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation
// gets "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));

// The other party, that cancels (at any point later):
controller.abort(); // abort!

// The event triggers and signal.aborted becomes true
alert(signal.aborted); // true

/*
보시다시피 AbortController는 abort()가 호출될 때 중단 이벤트를 전달하는 수단일 뿐입니다.
우리는 AbortController 객체 없이 자체적으로 이벤트 수신을 구현할 수 있습니다.
그러나 중요한 것은 fetch가 AbortController 객체와 함께 작동하는 방법을 알고 있으며 객체와 통합되어 있다는 것입니다.

fetch를 취소하려면 AbortController의 signal 프로퍼티를 fetch 옵션으로 전달하면 됩니다.
fetch 메서드는 AbortController와 작업하는 방법을 알고 있습니다. signal에서 중단 이벤트를 수신합니다.
이제 중단하려면 controller.abort()를 호출하면됩니다.
fetch는 signal에서 이벤트를 가져오고 요청을 중단합니다. 
fetch가 중단되면 Promise는 AbortError 오류와 함께 거부되므로 try..catch에서 이를 처리해야 합니다.

AbortController는 확장 가능하며 한 번에 여러개의 fetch를 취소할 수 있습니다.
다음은 많은 URL을 병렬로 가져오고 단일 컨트롤러를 사용하여 모두 중단하는 코드 스케치입니다.
*/

let urls = [...]; // a list of urls to fetch in parallel

let controller = new AbortController();

// an array of fetch promises
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// if controller.abort() is called from elsewhere,
// it aborts all fetches

/*
fetch와 다른 자체 비동기 작업이 있는 경우 fetch와 함께 단일 AbortController를 사용하여 중지할 수 있습니다.
작업에서 중단 이벤트를 수신하기만 하면 됩니다.
*/
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // our task
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// if controller.abort() is called from elsewhere,
// it aborts all fetches and ourJob

/*
요약 : 
AbortController는 abort() 메서드가 호출될 때 signal 속성에서 중단 이벤트를 생성하는 간단한 객체입니다(또한 signal.aborted를 true로 설정함).
fetch가 그것과 통합됩니다: signal 속성을 옵션으로 전달한 다음 fetch가 이를 수신하므로 fetch를 중단할 수 있습니다.
코드에서 AbortController를 사용할 수 있습니다. "call abort()" → "listen to abort event" 상호 작용은 간단하고 보편적입니다. fetch가 아니어도 사용할 수 있습니다.
*/