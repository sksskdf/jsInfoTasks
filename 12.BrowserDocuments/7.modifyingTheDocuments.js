/*
노드 생성 메서드:

document.createElement(tag) – 태그 이름을 사용해 새로운 요소를 만듦
document.createTextNode(value) – 텍스트 노드를 만듦(잘 쓰이지 않음)
elem.cloneNode(deep) – 요소를 복제함. deep==true일 경우 모든 자손 요소도 복제됨

노드 삽입, 삭제 메서드:

node.append(노드나 문자열) – node 끝에 노드를 삽입
node.prepend(노드나 문자열) – node 맨 앞에 노드를 삽입
node.before(노드나 문자열) –- node 이전에 노드를 삽입
node.after(노드나 문자열) –- node 다음에 노드를 삽입
node.replaceWith(노드나 문자열) –- node를 대체
node.remove() –- node를 제거

문자열을 삽입, 삭제할 땐 문자열을 ‘그대로’ 넣으면 됩니다.

‘구식’ 메서드:

parent.appendChild(node)
parent.insertBefore(node, nextSibling)
parent.removeChild(node)
parent.replaceChild(newElem, node)
이 메서드들은 전부 node를 반환합니다.

html에 HTML을 넣으면 메서드 elem.insertAdjacentHTML(where, html)은 where 값에 따라 특정 위치에 HTML을 삽입함

"beforebegin" – elem 바로 앞에 html을 삽입
"afterbegin" – elem의 첫 번째 자식 요소 바로 앞에 html을 삽입
"beforeend" – elem의 마지막 자식 요소 바로 다음에 html을 삽입
"afterend" – elem 바로 다음에 html을 삽입
문자열이나 요소 삽입에 쓰이는 유사 메서드 elem.insertAdjacentText와 elem.insertAdjacentElement도 있는데, 잘 쓰이지는 않음

페이지 로딩이 끝나기 전에 HTML을 삽입해주는 메서드:

document.write(html)
문서 로딩이 끝난 상태에서 이 메서드를 호출하면 문서 내용이 지워짐. 오래된 스크립트에서 볼 수 있음
*/