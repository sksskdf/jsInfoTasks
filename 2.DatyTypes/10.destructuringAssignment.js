const { log: l } = console;
/*
구조 분해 할당을 사용하면 객체나 배열을 변수로 연결할 수 있습니다.

객체 분해하기:

let {prop : varName = default, ...rest} = object
object의 프로퍼티 prop의 값은 변수 varName에 할당되는데, object에 prop이 없으면 default가 varName에 할당됩니다.

연결할 변수가 없는 나머지 프로퍼티들은 객체 rest에 복사됩니다.

배열 분해하기:

let [item1 = default, item2, ...rest] = array
array의 첫 번째 요소는 item1에, 두 번째 요소는 변수 item2에 할당되고, 이어지는 나머지 요소들은 배열 rest 저장됩니다.

할당 연산자 좌측의 패턴과 우측의 구조가 같으면 중첩 배열이나 객체가 있는 복잡한 구조에서도 원하는 데이터를 뽑아낼 수 있습니다.
*/

let options = {
  title: "Menu",
};

let { width: w = 100, height: h = 200, title } = options;
l(h);

{
  let options = {
    size: {
      width: 100,
      height: 200,
    },
    items: ["Cake", "Donut"],
    extra: true,
  };

  // 코드를 여러 줄에 걸쳐 작성해 의도하는 바를 명확히 드러냄
  let {
    size: {
      // size는 여기,
      width,
      height,
    },
    items: [item1, item2], // items는 여기에 할당함
    title = "Menu", // 분해하려는 객체에 title 프로퍼티가 없으므로 기본값을 사용함
  } = options;

  l(item1);
}

/*
구조 분해 할당
중요도: 5
아래와 같은 객체가 있다고 가정해봅시다.
let user = {
  name: "John",
  years: 30
};
구조 분해 할당을 사용해 아래 미션을 수행해 보세요.

name 프로퍼티의 값을 변수 name에 할당하세요.
years 프로퍼티의 값을 변수 age에 할당하세요.
isAdmin 프로퍼티의 값을 변수 isAdmin에 할당하세요. isAdmin이라는 프로퍼티가 없으면 false를 할당하세요.
미션을 달성하면 아래 예시를 제대로 실행할 수 있게 됩니다.
*/

let user = { name: "John", years: 30 };

// 할당 연산자 좌측에 답안을 작성하시면 되겠죠?
// ... = user
let { name, years: age, isAdmin = false } = user;

l(name); // John
l(age); // 30
l(isAdmin); // false
