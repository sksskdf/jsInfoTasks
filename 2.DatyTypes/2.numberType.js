/**
 * 0이 많이 붙은 큰 숫자는 다음과 같은 방법을 사용해 쓴다.

0의 개수를 'e' 뒤에 추가한다. 123e6은 0이 6개인 숫자, 123000000을 나타낸다.
'e' 다음에 음수가 오면, 음수의 절댓값 만큼 10을 거듭제곱한 숫자로 주어진 숫자를 나눈다. 123e-6은 0.000123을 나타낸다.
다양한 진법을 사용할 수도 있다.

자바스크립트는 특별한 변환 없이 16진수(0x), 8진수(0o), 2진수(0b)를 바로 사용할 수 있게 지원한다.
parseInt(str, base)를 사용하면 str을 base진수로 바꿔준다(단, 2 ≤ base ≤ 36).
num.toString(base)는 숫자를 base진수로 바꾸고, 이를 문자열 형태로 반환한다.
12pt나 100px과 같은 값을 숫자로 변환하는 것도 가능하다.

parseInt/parseFloat를 사용하면 문자열에서 숫자만 읽고, 읽은 숫자를 에러가 발생하기 전에 반환해주는 ‘약한’ 형 변환을 사용할 수 있다.
소수를 처리하는 데 쓰이는 메서드는 다음과 같다.

Math.floor, Math.ceil, Math.trunc, Math.round, num.toFixed(precision)를 사용하면 어림수를 구할 수 있다.
소수를 다룰 땐 정밀도 손실에 주의하라.
이 외에도 다양한 수학 함수가 있다.

수학 연산이 필요할 때 Math 객체를 찾아보라. 작은 객체이지만 기본적인 연산은 대부분 다룰 수 있다.
 */

console.log(1e-2);
console.log(0xff);
console.log(0b11111111);
console.log(0xff.toString(16));
console.log(0xff.toString(2));
console.log(0.1.toFixed(100));
console.log(+(0.1 + 0.2).toFixed(1));
console.log(isNaN("15"));
console.log(isFinite("15"));
console.log(parseInt('150px'));
console.log(parseFloat('0.3원'));

/**
 * 과제 : 수를 입력받아 덧셈하기
 * 사용자에게 두 수를 입력받고, 두 수의 합을 출력해주는 스크립트를 작성해보라.
 */
let a = +prompt('a');
let b = +prompt('b');
alert(a + b);
