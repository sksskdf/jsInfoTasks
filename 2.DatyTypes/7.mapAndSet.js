/**
 * 맵은 키가 있는 값이 저장된 컬렉션입니다.

주요 메서드와 프로퍼티:

new Map([iterable]) – 맵을 만듭니다. [key,value]쌍이 있는 iterable(예: 배열)을 선택적으로 넘길 수 있는데, 이때 넘긴 이터러블 객체는 맵 초기화에 사용됩니다.
map.set(key, value) – 키를 이용해 값을 저장합니다.
map.get(key) – 키에 해당하는 값을 반환합니다. key가 존재하지 않으면 undefined를 반환합니다.
map.has(key) – 키가 있으면 true, 없으면 false를 반환합니다.
map.delete(key) – 키에 해당하는 값을 삭제합니다.
map.clear() – 맵 안의 모든 요소를 제거합니다.
map.size – 요소의 개수를 반환합니다.
일반적인 객체와의 차이점:

키의 타입에 제약이 없습니다. 객체도 키가 될 수 있습니다.
size 프로퍼티 등의 유용한 메서드나 프로퍼티가 있습니다.
셋은 중복이 없는 값을 저장할 때 쓰이는 컬렉션입니다.

주요 메서드와 프로퍼티:

new Set([iterable]) – 셋을 만듭니다. iterable 객체를 선택적으로 전달받을 수 있는데(대개 배열을 전달받음), 이터러블 객체 안의 요소는 셋을 초기화하는데 쓰입니다.
set.add(value) – 값을 추가하고 셋 자신을 반환합니다. 셋 내에 이미 value가 있는 경우 아무런 작업을 하지 않습니다.
set.delete(value) – 값을 제거합니다. 호출 시점에 셋 내에 값이 있어서 제거에 성공하면 true, 아니면 false를 반환합니다.
set.has(value) – 셋 내에 값이 존재하면 true, 아니면 false를 반환합니다.
set.clear() – 셋을 비웁니다.
set.size – 셋에 몇 개의 값이 있는지 세줍니다.
맵과 셋에 반복 작업을 할 땐, 해당 컬렉션에 요소나 값을 추가한 순서대로 반복 작업이 수행됩니다. 따라서 이 두 컬렉션은 정렬이 되어있지 않다고 할 수 없습니다. 그렇지만 컬렉션 내 요소나 값을 재 정렬하거나 (배열에서 인덱스를 이용해 요소를 가져오는 것처럼) 숫자를 이용해 특정 요소나 값을 가지고 오는 것은 불가능합니다.
 */

const { log } = console;

let map = new Map();
let a = "abc";
let john = {
    name: `john`
}
let arr = [1, 2, 3, 4, 5];
map.set(a, 1)
    .set(john, 2)
    .set(arr, 3);
for (let m of map) {
    log(m);
}

let num = 5;

let newMap = new Map(Object.entries(john));
newMap.set(john);
log(newMap);
log(map);

let set = new Set();
set.add(1);
set.add(1);
set.add(1);

log(set);

let mapToSet = new Set(newMap);
log(mapToSet);

/**
 * 배열에서 중복 요소 제거하기
중요도: 5
arr은 배열이라 가정합시다.

arr에서 중복 값을 제거해 주는 함수 unique(arr)를 만들어보세요.

참고 1: 여기선 배열 안의 요소가 모두 문자열이지만 제출 답안을 작성할 땐, 배열 내 어떤 자료형이 들어와도 동작할 수 있어야 합니다.

참고 2: Set을 사용해보세요.
 */

function unique(arr) {
    return Array.from(new Set(arr));
  }
  
  let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  
  log( unique(values) ); // 얼럿창엔 `Hare, Krishna, :-O`만 출력되어야 합니다.

  /**
   * 반복 가능한 객체의 키
중요도: 5
map.keys()를 사용해 배열을 반환받고, 이 배열을 변수에 저장해 .push와 같은 배열 메서드를 적용하고 싶다고 해봅시다.

작동하지 않네요.
   */

let map1 = new Map();

map1.set("name", "John");

let keys = Array.from(map1.keys());

// Error: keys.push is not a function
keys.push("more");