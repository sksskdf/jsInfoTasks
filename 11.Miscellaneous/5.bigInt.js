/*
BigInt는 길이의 제약 없이 정수를 다룰 수 있게 해주는 숫자형입니다.

정수 리터럴 끝에 n을 붙이거나 함수 BigInt를 호출하면 문자열이나 숫자를 가지고 BigInt 타입의 값을 만들 수 있습니다.

const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // 10n과 동일합니다.

BigInt는 대개 일반 숫자와 큰 차이 없이 사용할 수 있습니다.

alert(1n + 2n); // 3

alert(5n / 2n); // 2
위 예시에서 나눗셈 연산 5/2의 결과엔 소수부가 없다는 점에 주의하시기 바랍니다. BigInt형 값을 대상으로 한 연산은 BigInt형 값을 반환합니다.

BigInt형 값과 일반 숫자를 섞어서 사용할 순 없습니다.

alert(1n + 2); // Error: Cannot mix BigInt and other types
일반 숫자와 섞어서 써야 하는 상황이라면 BigInt()나 Number()를 사용해 명시적으로 형 변환을 해주면 됩니다.
*/
