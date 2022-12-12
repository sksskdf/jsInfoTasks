/*
동일 출처 same origin(같은 사이트) 정책은 윈도우, 프레임  이 둘 서로 간의 접근을 제한합니다.
사용자가 두 개의 페이지를 열어 놓은 경우 하나는 john-smith.com이고 다른 하나는 gmail.com인 경우 john-smith.com의 스크립트가 gmail.com의 메일을 읽는 것을 허용하지 않습니다.
따라서 "동일 출처" 정책의 목적은 정보 도용으로부터 사용자를 보호하는 것입니다.

두 개의 URL이 동일한 프로토콜, 도메인 및 포트를 가진 경우 "동일 출처"를 갖는다고 합니다.
다음 URL은 모두 동일한 출처를 공유합니다.
http://site.com
http://site.com/
http://site.com/my/page.html

다음 URL들은 출처가 다릅니다.
http://www.site.com (another domain: www. matters)
http://site.org (another domain: .org matters)
https://site.com (another protocol: https)
http://site.com:8080 (another port: 8080)

동일 출처 정책은 다음과 같습니다.
- 다른 창에 대한 참조가 있는 경우, 예를 들어 window.open 으로 만들어진 팝업이나 창 내부의 iframe 은 창의 출저가 같은 출처인 경우 접근 가능합니다.
- 반면에 출처가 다를 경우 접근 할 수 없습니다. 

iframe은 분할된 내장 윈도우 창을 호스팅 합니다.
내장 창 내부에 접근할 때 브라우저는 iframe이 같은 출처인지 확인합니다.
만약 아니라면 접근이 거부됩니다.

정의에 따르면 서로 다른 URL은 다른 출처를 의미합니다.
하지만 윈도우 창이 같은 second-level 도메인을 공유한다면 (john.site.com peter.site.com site.com)
브라우저에게 이러한 차이를 무시하게 할 수도 있습니다.

이러한 일이 가능하게 하려면 다음과 같은 코드가 필요합니다.
*/

document.domain = 'site.com';

/*
로드되지 않은 iframe의 문서로 작업을 하면 예기치 못한 오류가 발생할 수 있으므로, iframe.onload 를 사용해야 합니다.

요약 : 

메서드를 호출하고 다른 창의 콘텐츠에 액세스하려면 먼저 해당 창에 대한 참조가 있어야 합니다.

팝업의 경우 다음 참조가 있습니다.

오프너 창에서: window.open– 새 창을 열고 이에 대한 참조를 반환합니다.
팝업에서: window.opener– 팝업에서 오프너 창에 대한 참조입니다.
iframe의 경우 다음을 사용하여 부모/자식 창에 액세스할 수 있습니다.

window.frames– 중첩된 창 개체 모음,
window.parent, window.top부모 및 최상위 창에 대한 참조입니다.
iframe.contentWindow태그 내부의 창입니다 <iframe>.
윈도우가 동일한 출처(호스트, 포트, 프로토콜)를 공유하는 경우 윈도우는 서로 원하는 모든 작업을 수행할 수 있습니다.

그렇지 않으면 가능한 조치는 다음과 같습니다.

다른 창의  location(쓰기 전용 액세스).을 변경합니다
예외는 다음과 같습니다.

동일한 두 번째 수준 도메인을 공유하는 Windows: a.site.com및 b.site.com. document.domain='site.com'그런 다음 둘 다 설정하면 "동일한 출처" 상태가 됩니다.
iframe에 속성이 있는 경우 속성 값에 sandbox가 지정되지 않는 한 강제로 "다른 원본" 상태로 전환됩니다 . 
allow-same-origin은 동일한 사이트의 iframe에서 신뢰할 수 없는 코드를 실행하는 데 사용할 수 있습니다.
인터페이스 postMessage를 사용하면 출처에 상관없이 두 개의 창이 대화할 수 있습니다.

targetWin.postMessage(data, targetOrigin) 메시지의 발신자가가 호출합니다,

origin– 보낸 사람 창의 출처(예 http://my.site.com: )
source– 발신자 창에 대한 참조.
data– 데이터, 문자열만 지원하는 IE를 제외한 모든 개체.
addEventListener대상 창 내에서 이 이벤트에 대한 핸들러를 설정하는 데 사용해야 합니다 .
*/