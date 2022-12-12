/*
페이지 로드 관련 이벤트는 다음과 같습니다.

DOMContentLoaded – DOM 구성이 완료되었을 때 document 객체에서 실행됩니다. 자바스크립트를 사용해 요소를 조작하는 것은 이 이벤트가 실행된 후입니다.
<script>...</script>나 <script src="..."></script>를 사용해 삽입한 스크립트는 DOMContentLoaded가 실행되는 것을 막습니다. 브라우저는 이 스크립트가 실행되길 기다립니다.
DOMContentLoaded는 실행되어도 이미지를 비롯한 기타 리소스들은 여전히 로드 중일 수 있습니다.
load – 페이지를 비롯한 이미지 등의 자원 전부가 모두 불러와졌을 때 window 객체에서 실행됩니다. 모든 자원이 로드되는 걸 기다리기에는 시간이 오래 걸릴 수 있으므로 이 이벤트는 잘 사용되지 않습니다.
beforeunload – 사용자가 페이지를 떠나려 할 때 window 객체에서 발생합니다. 이 이벤트를 취소하려 하면 브라우저는 사용자에게 "we have unsaved changes…"등의 메시지를 띄워 정말 페이지를 떠날 건지 물어봅니다.
unload – 사용자가 최종적으로 사이트를 떠날 때 window 객체에서 발생합니다. unload 이벤트 핸들러에선 지연을 유발하는 복잡한 작업이나 사용자와의 상호작용은 할 수 없습니다. 이 제약사항 때문에 unload 이벤트는 아주 드물게 사용됩니다. 하지만 예외적으로 navigator.sendBeacon을 사용해 네트워크 요청을 보낼 수 있습니다.
document.readyState – 문서의 현재 상태를 나타내줍니다. readystatechange 이벤트를 사용하면 변화를 추적할 수 있습니다.
loading – 문서를 불러오는 중일 때
interactive – 문서가 완전히 불러와졌을 때. DOMContentLoaded가 실행되기 바로 직전에 해당 값으로 변경됩니다.
complete – 문서를 비롯한 이미지 등의 리소스들도 모두 불러와졌을 때. window.onload가 실행되기 바로 직전에 해당 값으로 변경됩니다.
*/