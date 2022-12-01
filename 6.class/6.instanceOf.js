/*
지금까지 배운 타입 확인 메서드를 요약하면 다음과 같습니다.

                                                     동작 대상                                 | 	반환값
typeof	     |                                     원시형                                    |   문자열
{}.toString	|  원시형, 내장 객체, Symbol.toStringTag가 있는 객체  | 	문자열
instanceof |                                   	객체                                         |	true나 false

예시에서 보았듯이 {}.toString은 typeof보다 ‘기능이 더’ 많습니다.

instanceof 연산자는 계층 구조를 가진 클래스를 다룰 때나 클래스의 상속 여부를 확인하고자 할 때 그 진가를 발휘합니다.
*/