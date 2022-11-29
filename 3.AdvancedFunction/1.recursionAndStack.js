/*
지금까지 나온 용어를 정리해봅시다.

재귀(recursion) – 함수 내부에서 자기 자신을 호출하는 것을 나타내는 프로그래밍 용어입니다. 재귀 함수는 우아하게 원하는 문제를 해결할 때 자주 쓰이곤 합니다.

함수가 자신을 호출하는 단계를 재귀 단계(recursion step) 라고 부릅니다. basis라고도 불리는 재귀의 베이스(base) 는 작업을 아주 간단하게 만들어서 함수가 더 이상은 서브 호출을 만들지 않게 해주는 인수입니다.

재귀적으로 정의된 자료 구조는 자기 자신을 이용해 자료 구조를 정의합니다.

재귀적으로 정의된 자료구조에 속하는 연결 리스트는 리스트 혹은 null을 참조하는 객체로 이루어진 데이터 구조를 사용해 정의됩니다.

list = {value, next -> list}
HTML 문서의 HTML 요소 트리나 위에서 다룬 부서를 나타내는 트리 역시 재귀적인 자료 구조로 만들었습니다. 
이렇게 재귀적인 자료 구조를 사용하면 가지가 여러 개인데 각 가지가 여러 가지로 뻗쳐 나가는 형태로 자료 구조를 만들 수 있습니다.

예시에서 구현한 sumSalary같은 재귀 함수를 사용하면 각 분기(가지)를 순회할 수 있습니다.

모든 재귀 함수는 반복문을 사용한 함수로 다시 작성할 수 있습니다. 최적화를 위해 반복문으로 다시 작성해야 할 수도 있죠. 
그러나 상당수 작업은 재귀를 사용해도 만족할 만큼 빠르게 동작합니다. 재귀를 사용하면 구현과 유지보수가 쉽다는 장점도 있습니다.
*/

function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

let company = {
  // 동일한 객체(간결성을 위해 약간 압축함)
  sales: [
    { name: "John", salary: 1000 },
    { name: "Alice", salary: 1600 },
  ],
  development: {
    sites: [
      { name: "Peter", salary: 2000 },
      { name: "Alex", salary: 1800 },
    ],
    internals: [{ name: "Jack", salary: 1300 }],
  },
};

// 급여 합계를 구해주는 함수
function sumSalaries(department) {
  if (Array.isArray(department)) {
    // 첫 번째 경우
    return department.reduce((prev, current) => prev + current.salary, 0); // 배열의 요소를 합함
  } else {
    // 두 번째 경우
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // 재귀 호출로 각 하위 부서 임직원의 급여 총합을 구함
    }
    return sum;
  }
}

console.log(sumSalaries(company)); // 7700

/*
주어진 숫자까지의 모든 숫자 더하기
중요도: 5
숫자 1 + 2 + ... + n을 계산하는 함수 sumTo (n)을 만들어보세요.

sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

아래 방법을 사용해 세 가지 답안을 만들어보세요.

for 반복문 사용하기
재귀 사용하기(n > 1일 때 sumTo(n) = n + sumTo(n-1))
등차수열 공식 사용하기
*/

function sumTo(n) {
  return n === 0 ? n : n + sumTo(n - 1);
}

console.log(`sumTo(100) :  ${sumTo(100)}`); // 5050

/*
더 생각해보기 1: 세 가지 방법 중 어떤 방법이 가장 빠른가요? 어떤 방법이 가장 느린가요? 이유도 함께 제시해주세요.

더 생각해보기 2: 재귀를 사용해 sumTo (100000)를 계산할 수 있을까요?
*/
