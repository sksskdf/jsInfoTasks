/*
    아마 실무에선 querySelector나 querySelectorAll을 가장 많이 사용하실 겁니다. getElementBy로 시작하는 메서드는 대개 오래된 스크립트에서 만날 수 있는데, 일부 이 메서드가 꼭 필요한 상황에서 쓰이는 경우도 있습니다.

이 외에 알아두면 좋을 만한 메서드는 아래와 같습니다.

elem.matches(css)는 elem이 해당 CSS 선택자와 일치하는지 여부를 검사합니다.
elem.closest(css)는 해당 CSS 선택자와 일치하는 가장 가까운 조상 요소를 탐색합니다. 이때, elem 자기 자신도 검색 대상에 포함됩니다.
위에선 언급하지 않았지만, 노드의 부모-자식 관계를 확인할 수 있도록 도와주는 유용한 메서드 하나를 더 소개해 드리고 마무리하겠습니다.

elemA.contains(elemB)는 elemB가 elemA에 속하거나(elemB가 elemA의 후손인 경우) elemA==elemB일 때, 참을 반환합니다.
*/