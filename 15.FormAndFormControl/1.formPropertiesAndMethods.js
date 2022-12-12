/*
폼 탐색하기

document.forms
document.forms[name/index]로 폼에 접근할 수 있습니다.
form.elements
폼 요소는 form.elements[name/index] 또는 form[name/index]로 접근합니다. elements 프로퍼티는 <fieldset>에도 똑같이 작동합니다.
element.form
요소는 form 프로퍼티에서 자신이 속한 폼을 참조합니다.
각 요소의 값은 input.value, textarea.value, select.value 등으로 접근할 수 있습니다. 체크박스와 라디오 버튼에서는 input.checked를 사용할 수 있습니다.

<select>에서는 인덱스 select.selectedIndex나 option 컬렉션 select.options을 통해 값을 구할 수도 있습니다.

지금까지는 폼 관련 기본을 다뤘습니다. 이 튜토리얼에서 앞으로 더 많은 예시를 만날 것입니다.

다음 챕터에서는 어느 요소에서든 발생할 수 있지만 대부분 폼에서 처리되는 focus와 blur 이벤트를 다루겠습니다.
*/
