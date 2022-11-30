/*
JSON은 독자적인 표준을 가진 데이터 형식으로, 대부분의 언어엔 JSON을 쉽게 다룰 수 있게 해주는 라이브러리가 있습니다.
JSON은 일반 객체, 배열, 문자열, 숫자, 불린값, null을 지원합니다.
JSON.stringify를 사용하면 원하는 값을 JSON으로 직렬화 할 수 있고, JSON.parse를 사용하면 JSON을 본래 값으로 역 직렬화 할 수 있습니다.
위 두 메서드에 함수를 인수로 넘겨주면 원하는 값만 읽거나 쓰는 게 가능합니다.
JSON.stringify는 객체에 toJSON 메서드가 있으면 이를 자동으로 호출해줍니다.
*/

let student = {
  name: "John",
  age: 30,
  isAdmin: false,
  courses: ["html", "css", "js"],
  wife: null,
};

console.log(student);
console.log(JSON.stringify(student));
console.log(JSON.stringify(`a`));
