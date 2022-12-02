/*
클래스를 관리할 수 있게 해주는 DOM 프로퍼티:

className – 클래스 전체를 문자열 형태로 반환해주는 프로퍼티로 클래스 전체를 관리할 때 유용합니다.
classList – 클래스 하나를 관리할 수 있게 해주는 메서드입니다. add/remove/toggle/contains가 구현된 객체를 반환합니다. 개별 클래스를 조작할 때 유용합니다.
스타일 변경 방법:

style 프로퍼티 – 카멜 표기법을 이용해 변경한 스타일이 있는 객체로, 이 객체를 조작하는 것은 "style" 속성과 대응하는 개별 프로퍼티를 조작하는 것과 같습니다. important 등의 규칙을 어떻게 적용할 수 있는지 알아보려면 MDN에서 관련 메서드를 살펴보시기 바랍니다.

style.cssText 프로퍼티는 "style" 속성 전체에 대응하므로 스타일 전체에 대한 문자열이 저장됩니다.

요소의 스타일 결정 값을 읽는 방법:

스타일 정보가 들어 있는 객체를 반환해주는 메서드 getComputedStyle(elem, [pseudo])를 사용합니다. 이 메서드는 읽기 전용입니다.
*/
