/*
문법:

let func = new Function ([arg1, arg2, ...argN], functionBody);
인수를 한꺼번에 모아(쉼표로 구분) 전달할 수도 있습니다.

아래 세 선언 방식은 동일하게 동작하죠.

new Function('a', 'b', 'return a + b'); // 기본 문법
new Function('a,b', 'return a + b'); // 쉼표로 구분
new Function('a , b', 'return a + b'); // 쉼표와 공백으로 구분
new Function을 이용해 만든 함수의 [[Environment]]는 외부 렉시컬 환경이 아닌 전역 렉시컬 환경을 참조하므로 외부 변수를 사용할 수 없습니다. 
단점 같아 보이는 특징이긴 하지만 에러를 예방해 준다는 관점에선 장점이 되기도 합니다. 
구조상으론 매개변수를 사용해 값을 받는 게 더 낫습니다. 압축기에 의한 에러도 방지할 수 있죠.
*/