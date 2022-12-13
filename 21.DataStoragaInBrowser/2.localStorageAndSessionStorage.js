/*
웹 스토리지 객체 localStorage와 sessionStorage를 사용하면 브라우저에 키-값 쌍을 저장할 수 있습니다. 이때,

키와 값은 반드시 문자열이어야 합니다.
제한 용량은 5MB 이상인데, 브라우저에 따라 다를 수 있습니다.
파기되지 않습니다.
오리진(도메인·포트·프로토콜)에 묶여있습니다.


localStorage | sessionStorage
오리진이 같은 탭, 창 전체에서 공유됩니다. |	오리진이 같은 브라우저 탭, iframe에서 공유됩니다.
브라우저를 껐다 켜도 남아있습니다. | 페이지를 새로 고침 해도 남아있습니다. 하지만 탭이나 브라우저를 종료하면 사라집니다.

API:

setItem(key, value) – 키-값 쌍을 보관합니다.
getItem(key) – 키에 해당하는 값을 받아옵니다.
removeItem(key) – 키와 해당 값을 삭제합니다.
clear() – 모든 것을 삭제합니다.
key(index) – 인덱스에 해당하는 키를 받아옵니다.
length – 저장된 항목의 개수를 얻습니다.
Object.keys를 사용해 키 전체를 얻을 수 있습니다.
객체 프로퍼티처럼 키에 접근할 수 있는데, 이 경우 storage 이벤트가 발생하지 않습니다.
storage 이벤트:

setItem, removeItem, clear를 호출할 때 발생합니다.
연산(key/oldValue/newValue)과 관련된 데이터 전체와 문서 url, 스토리지 객체 storageArea를 가지고 있습니다.
이벤트가 생성된 곳을 제외하고 스토리지에 접근하는 모든 window 객체에서 일어납니다(sessionStorage는 탭 내에서, localStorage에서는 전역에서).
*/
