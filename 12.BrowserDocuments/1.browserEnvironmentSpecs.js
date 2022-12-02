/*
표준에 대하여 이야기하면서 다음 명세서들을 알아보았습니다.

DOM 명세서
문서 구조, 조작, 이벤트에 관한 설명이 담겨있고, https://dom.spec.whatwg.org 에서 볼 수 있습니다.
CSSOM 명세서
스타일시트와 스타일 규칙, 이 둘을 어떻게 조작할 수 있는지, 이 둘과 문서 사이의 관계를 어떻게 조작할 수 있는지에 대한 설명이 담겨있고, https://www.w3.org/TR/cssom-1/ 에서 볼 수 있습니다.
HTML 명세서
태그 등의 HTML 언어, setTimeout, alert, location 등의 다양한 브라우저 기능을 정의한 BOM에 대한 설명이 담겨있고, https://html.spec.whatwg.org 에서 볼 수 있습니다. DOM 명세서에 다양한 프로퍼티와 메서드를 추가해 확장한 명세서입니다.
몇몇 클래스에 대한 설명은 https://spec.whatwg.org/에서 확인할 수 있습니다.

배울 게 많지만, 모든 걸 한꺼번에 다루고 기억하기엔 그 양이 너무 많기 때문에 지금까지 소개해 드린 링크를 잘 기록해 놓으시기 바랍니다.

프로퍼티나 메서드에 대한 설명을 읽고 싶을 때 Mozilla 재단의 매뉴얼 https://developer.mozilla.org/en-US/search 을 찾아보는 것도 좋긴 하지만, 명세서에서 관련 설명을 찾는 게 더 나을 때도 있기 때문입니다. 
명세서에 있는 설명은 복잡하고 내용도 더 많긴 하지만 명세서를 읽는 습관을 들이다 보면 기본 지식을 탄탄하게 쌓을 수 있습니다.

검색창에 ‘WHATWG [용어]’ 혹은 'MDN [용어]'로 검색하면 명세서나 MDN문서에서 원하는 내용을 쉽게 찾을 수 있습니다. https://google.com?q=whatwg+localstorage, https://google.com?q=mdn+localstorage 처럼 말이죠.

자 이제 UI에서 핵심적인 역할을 하는 DOM에 대해 본격적으로 살펴보도록 합시다.
*/
