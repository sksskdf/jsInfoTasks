/**
 *지금까지 살펴본 배열 메서드를 요약해보도록 합시다.

요소를 더하거나 지우기

push(...items) – 맨 끝에 요소 추가하기
pop() – 맨 끝 요소 추출하기
shift() – 첫 요소 추출하기
unshift(...items) – 맨 앞에 요소 추가하기
splice(pos, deleteCount, ...items) – pos부터 deleteCount개의 요소를 지우고, items 추가하기
slice(start, end) – start부터 end 바로 앞까지의 요소를 복사해 새로운 배열을 만듦
concat(...items) – 배열의 모든 요소를 복사하고 items를 추가해 새로운 배열을 만든 후 이를 반환함. items가 배열이면 이 배열의 인수를 기존 배열에 더해줌
원하는 요소 찾기

indexOf/lastIndexOf(item, pos) – pos부터 원하는 item을 찾음. 찾게 되면 해당 요소의 인덱스를, 아니면 -1을 반환함
includes(value) – 배열에 value가 있으면 true를, 그렇지 않으면 false를 반환함
find/filter(func) – func의 반환 값을 true로 만드는 첫 번째/전체 요소를 반환함
findIndex는 find와 유사함. 다만 요소 대신 인덱스를 반환함
배열 전체 순회하기

forEach(func) – 모든 요소에 func을 호출함. 결과는 반환되지 않음
배열 변형하기

map(func) – 모든 요소에 func을 호출하고, 반환된 결과를 가지고 새로운 배열을 만듦
sort(func) – 배열을 정렬하고 정렬된 배열을 반환함
reverse() – 배열을 뒤집어 반환함
split/join – 문자열을 배열로, 배열을 문자열로 변환함
reduce(func, initial) – 요소를 차례로 돌면서 func을 호출함. 반환값은 다음 함수 호출에 전달함. 최종적으로 하나의 값이 도출됨
기타

Array.isArray(arr) – arr이 배열인지 여부를 판단함
sort, reverse, splice는 기존 배열을 변형시킨다는 점에 주의하시기 바랍니다.

지금까지 배운 메서드만으로 배열과 관련된 작업 99%를 해결할 수 있습니다. 이 외의 배열 메서드도 있긴 한데 잠시 언급하고 넘어가겠습니다.

arr.some(fn)과 arr.every(fn)는 배열을 확인합니다.

두 메서드는 map과 유사하게 모든 요소를 대상으로 함수를 호출합니다. some은 함수의 반환 값을 true로 만드는 요소가 하나라도 있는지 여부를 확인하고 every는 모든 요소가 함수의 반환 값을 true로 만드는지 여부를 확인합니다. 두 메서드 모두 조건을 충족하면 true를, 그렇지 않으면 false를 반환합니다.

arr.fill(value, start, end)은 start부터 end까지 value를 채워 넣습니다.

arr.copyWithin(target, start, end)은 start부터 end까지 요소를 복사하고, 복사한 요소를 target에 붙여넣습니다. 기존 요소가 있다면 덮어씁니다.

배열에 관한 모든 메서드는 manual에서 찾아볼 수 있습니다.

배워야 할 메서드 종류가 너무 많아서 이걸 다 외워야 하나라는 생각이 들 수 있는데, 생각보다 쉬우니 너무 걱정하지 않으셨으면 좋겠습니다.

일단은 요약본을 참고해 자주 사용하는 메서드가 무엇인지 정도만 알아두어도 괜찮습니다. 아래 과제를 풀면서 충분히 연습하다 보면 배열 메서드에 대한 경험치가 쌓일 겁니다.

나중에 배열을 이용해 뭔가를 해야 하는데 방법이 떠오르지 않을 때 이곳으로 돌아와 요약본을 다시 보고 상황에 맞는 메서드를 찾으면 됩니다. 설명에 딸린 예시들이 실제 코드 작성 시 도움이 될 겁니다. 이런 과정을 반복하다 보면 특별한 노력 없이도 메서드를 저절로 외울 수 있습니다.
 */

let arr = [1, 2, 15];

arr.sort((a, b) => {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
});

console.log(arr);

/**
 * border-left-width를 borderLeftWidth로 변경하기
중요도: 5
"my-short-string"같이 여러 단어를 대시(-)로 구분한 문자열을 카멜 표기법을 사용한 문자열 "myShortString"로 변경해주는 함수를 작성해보세요.

대시는 모두 지우고 각 단어의 첫 번째 글자는 대문자로 써주면 됩니다.

예시:

camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
힌트: split을 사용해 문자열을 배열로 바꾼 다음 join을 사용해 다시 합치면 됩니다.
 */

function convertCssProperty(prop) {
  let splittedProp = prop.split(`-`);
  for (let i = 0; i < splittedProp.length; i++) {
    if (i === 0) continue;
    splittedProp[i] =
      splittedProp[i][0].toUpperCase() + splittedProp[i].slice(1);
  }

  return splittedProp.join(``);
}

console.log('task1 : ' + convertCssProperty(`border-left-width`));

//solution
function camelize(str) {
  return str
    .split("-") 
    .map(
      (word, index) =>
        index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");
}

/**
 * 특정 범위에 속하는 요소 찾기
중요도: 4
배열 arr의 요소 중 a이상 b 이하 범위에 속하는 요소만 골라 새로운 배열에 집어넣고, 해당 요소를 출력해주는 함수 filterRange(arr, a, b)를 작성해봅시다.

새로 작성하는 함수는 기존 배열 arr을 변경하면 안 되고, 반환되는 함수는 새로운 배열이어야 합니다.

예시:

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (조건에 맞는 요소)

alert( arr ); // 5,3,8,1 (기존 배열은 변경되지 않았습니다.)
 */

function filterRange(arr, a, b) {
    return arr.filter(e => e >= a && e < b);
}

let givenArr = [5, 3, 8, 1];

console.log('task2 : ' + filterRange(givenArr, 1, 4));

/**
 * 특정 범위에 속하는 요소 찾기(배열 변경하기)
중요도: 4
배열 arr의 요소 중 a와 b 사이에 속하지 않는 요소는 삭제해주는 함수 filterRangeInPlace(arr, a, b)를 작성해보세요. 배열의 모든 요소(i)는 다음 조건을 만족해야 합니다. a ≤ arr[i] ≤ b

작성한 함수는 기존 배열을 변경하기만 하고 아무것도 반환하지 않아야 합니다.

예시:

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 1과 4 사이에 있지 않은 요소는 모두 제거함

alert( arr ); // [3, 1]
 */

function filterRangeInPlace(arr, a, b) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
        }
    }
}

let givenArr2 = [5, 3, 8, 1];

filterRangeInPlace(givenArr2, 1, 4);

console.log('task3 : ' + givenArr2);

/**
 * 내림차순으로 정렬하기
중요도: 4
let arr = [5, 2, 1, -10, 8];

// 요소를 내림차순으로 정렬해주는 코드를 여기에 작성해보세요.

alert( arr ); // 8, 5, 2, 1, -10
 */

let givenArr3 = [5, 2, 1, -10, 8];

givenArr3.sort((a, b) => b - a);

console.log(givenArr3);

/**
 * 배열 복사본을 정렬하기
중요도: 5
문자열이 담긴 배열 arr을 복사한 다음 해당 배열을 정렬해봅시다. 단 이때 arr은 변경되면 안 됩니다.

함수 copySorted(arr)는 복사 후 정렬된 배열을 반환해야 합니다.

let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (no changes)
 */

function copySorted(arr) {
    return arr.slice().sort();
}

let givenArr4 = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(givenArr4);

console.log( sorted ); // CSS, HTML, JavaScript
console.log( givenArr4 ); // HTML, JavaScript, CSS (no changes)

/**
 * 확장 가능한 계산기
중요도: 5
기능을 "확장"할 수 있는 계산기 객체를 만들어 주는 생성자 함수 Calculator를 작성해봅시다.

Calculator는 두 단계를 거쳐 만들 수 있습니다.

첫 번째 단계는 "1 + 2"와 같은 문자열을 받아서 “숫자 연산자 숫자” 형태(공백으로 구분)로 바꿔주는 메서드 calculate(str)를 구현하는 것입니다. 이 함수는 +와 -를 처리할 수 있어야 하고, 연산 결과를 반환해야 합니다.

예시:

let calc = new Calculator;

alert( calc.calculate("3 + 7") ); // 10
두 번째 단계는 계산기가 새로운 연산을 학습할 수 있도록 해주는 메서드 addMethod(name, func)를 추가해 주는 것입니다. 연산자 이름을 나타내는 name과 인수가 두개인 익명 함수 func(a,b)를 받는 새 메서드를 구현해야 하죠.

구현된 메서드를 이용해 곱셈 *과 나눗셈 /, 거듭제곱 **연산자를 추가해주는 예시는 아래와 같습니다.

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
alert( result ); // 8
참고사항:

괄호나 복잡한 표현식 없이도 본 과제를 풀 수 있습니다.
숫자와 연산자는 공백 하나로 구분합니다.
에러 핸들링을 위한 코드를 추가해도 좋습니다(선택 사항).
 */

function Calculator() {
    this.methods = {
        "-" : (a, b) => a - b,
        "+" : (a, b) => a + b
    };

    this.calculate = function(str) {
        let split = str.split(` `);
        a = +split[0],
        op = split[1],
        b = +split[2];

        if(!this.methods[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }

        return this.methods[op](a, b);
    };

    this.addMethod = function(name, func) {
        this.methods[name] = func;
    }
}

let calc = new Calculator();
console.log(calc.calculate(`3 + 7`));

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
console.log( result ); // 8

/**
 * 확장 가능한 계산기 문제 응용, 심화
 * 
 */