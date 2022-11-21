/**
 * 위크맵은 맵과 유사한 컬렉션입니다. 위크맵을 구성하는 요소의 키는 오직 객체만 가능합니다. 키로 사용된 객체가 메모리에서 삭제되면 이에 대응하는 값 역시 삭제됩니다.

위크셋은 셋과 유사한 컬렉션입니다. 위크셋엔 객체만 저장할 수 있습니다. 위크셋에 저장된 객체가 도달 불가능한 상태가 되면 해당 객체는 메모리에서 삭제됩니다.

두 자료구조 모두 구성 요소 전체를 대상으로 하는 메서드를 지원하지 않습니다. 구성 요소 하나를 대상으로 하는 메서드만 지원합니다.

객체엔 ‘주요’ 자료를, 위크맵과 위크셋엔 ‘부수적인’ 자료를 저장하는 형태로 위크맵과 위크셋을 활용할 수 있습니다. 객체가 메모리에서 삭제되면, (그리고 오로지 위크맵과 위크셋의 키만 해당 객체를 참조하고 있다면) 위크맵이나 위크셋에 저장된 연관 자료들 역시 메모리에서 자동으로 삭제됩니다.
 */

let john = { name : `john` };
let arr = [ john ];
john = null;
console.log(arr[0]);

let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, `ok`);
console.log(weakMap.get(obj));
obj = null;
console.log(weakMap.get(obj));
console.log(weakMap);

/**
 * '읽음'상태인 메시지 저장하기
중요도: 5
메시지가 저장되어 있는 배열이 있습니다.

여러분이 작성하고 있는 코드를 사용해 이 배열에 접근할 수 있지만, 메시지를 관리하는 건 다른 코드에서 이뤄지고 있는 상황입니다. 새로운 메시지가 있으면 배열에 추가되고, 
오래된 메시는 배열에서 삭제되지만 이런 작업은 외부코드에 의해 이뤄지고 있기 때문에 여러분은 언제 메시지가 추가/삭제되는지 알 수 없는 상황이죠.

이와 같은 상황에서 ‘읽음’ 상태의 메시지는 어떤 자료구조에 저장해야 좋을까요? 특정 메시지 객체를 대상으로 "메시지가 읽음 상태인가요?"라는 질문을 던지면 제대로 된 답이 반환되는 자료구조는 무엇일까요?

주의: messages에서 특정 메시지가 삭제되면 여러분이 구현할 자료구조에서도 해당 메시지가 삭제되어야 합니다.

주의: 메시지 객체에 프로퍼티를 추가하는 것과 같이 메시지 객체를 수정해선 안 됩니다. 메시지 객체는 외부코드에서 관리하고 있기 때문에 메시지 객체를 직접 수정하면 예상치 않은 결과가 나타날 수 있습니다.
 */

let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

readMessages.add(messages[0]);
readMessages.add(messages[1]);

readMessages.add(messages[0]);

alert("message 0은 읽음 상태인가요?: " + readMessages.has(messages[0]));

messages.shift();

let isRead = Symbol("isRead");
messages[0][isRead] = true;

let readMessagesDate = new WeakMap();
readMessagesDate.set(messages[0], new Date(2022, 11, 19));