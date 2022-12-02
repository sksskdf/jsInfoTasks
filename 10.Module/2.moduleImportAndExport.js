/*
지금까지 배운 export 타입을 다시 한번 살펴봅시다.

아래 타입들을 쭉 보고 얼마나 기억하는지 체크해 보세요.

클래스, 함수 등의 선언부 앞에 export 붙여서 내보내기:
export [default] class/function/variable ...
이름 없는 개체 내보내기:
export {x [as y], ...}.
다시 내보내기:
export {x [as y], ...} from "module"
export * from "module" (default export는 다시 내보내 지지 않음)
export {default [as y]} from "module" (default export를 다시 내보냄)
가져오기 타입 역시 정리해 봅시다.

named export 가져오기:
import {x [as y], ...} from "mod"
default export 가져오기:
import x from "mod"
import {default as x} from "mod"
한 번에 가져오기:
import * as obj from "mod"
모듈을 가져오긴 하지만(코드는 실행됨), 변수에 할당하지 않기:
import "mod"
import/export 문은 스크립트의 맨 위나 맨 아래에 올 수 있는데 이 둘엔 차이가 없습니다.

따라서 아래 스크립트는 문제없이 잘 동작합니다.

sayHi();

// ...

import {sayHi} from './say.js'; // import 문을 파일 맨 아래에 위치시킴
대개는 편의상 스크립트 맨 위에 import 문을 위치시킵니다.

import/export 문은 블록 {...}안에선 동작하지 않는다는 점에 유의하시길 바랍니다.

조건을 충족하면 모듈을 가져오려는 의도로 작성된 아래 코드는 동작하지 않습니다.

if (something) {
  import {sayHi} from "./say.js"; // 에러: import 문은 최상위 레벨에 위치해야 합니다.
}
그런데 애플리케이션을 작성하다 보면 조건에 따라 모듈을 가져와야 하거나 어떤 특정 시점에 모듈을 불러와야 하는 경우가 생깁니다. 이럴 땐 어떤 방법을 사용해야 할까요? 요청이 있을 때만 모듈을 불러오는 게 가능할까요?

동적으로 모듈을 가져오는 방법(dynamic import)은 다음 챕터에서 알아보도록 하겠습니다.
*/
