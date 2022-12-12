/*
뮤테이션 옵저버는 내장 객체로 DOM요소의 변화를 감지하여 콜백함수를 실행시켜줍니다.

뮤테이션 옵저버는 사용하기 매우 간편합니다.
*/

let observer = new MutationObserver(callback);

observer.observe(node, config);

/*
config는 부울 값을 가지는 객체로 어떤 종류의 변화에 반응하게 할 것이지를 결정합니다.

childList – 직계 자손 노드의 변화에 반응
subtree – 모든 하위 노드 변화에 반응
attributes – 노드의 속성에 반응
attributeFilter – 속성 이름의 배열중 선택된 하나에 반응
characterData –  node.data (textcontent)에 반응

그런 다음 변화가 감지되면 콜백이 실행되고 변화는 MutationRecord객체의 리스트중 첫 번째 인자로 넘겨집니다.
그리고 옵저버 자기 자신이 두번째 인자로 넘겨집니다.

그렇다면 이 뮤테이션 옵저버는 어떤 상황에 유용하게 쓰일 수 있을까요?
유용한 기능을 포함하고 있지만 원치 않는 작업(<div class="ads">Unwanted ads</div>와 같은 코드를 집어넣음)을 수행하는 타사 스크립트를 추가해야 하는 상황을 상상해 봅시다.
당연히 타사 스크립트는 이를 제거하는 메커니즘을 제공하지 않습니다.
MutationObserver를 사용하면 원치 않는 요소가 DOM에 나타나는 시기를 감지하고 제거할 수 있습니다.
타사 스크립트가 문서에 무언가를 추가하는 다른 상황이 있으며, 발생 시 페이지를 조정하고 무언가를 동적으로 크기 조정하는 등을 감지하고 싶다고 쳐봅시다.
MutationObserver는 이것을 구현할 수 있습니다.

또한 구조적 관점에서 MutationObserver가 좋은 경우도 있습니다.
프로그래밍에 관한 웹사이트를 만들고 있다고 가정해 보겠습니다. 당연히 기사 및 기타 자료에는 소스 코드 스니펫이 포함될 수 있습니다.
HTML 마크업의 스니펫은 다음과 같습니다.

<pre class="language-javascript">
    <code>
        // here's the code
        let hello = "world";
    </code>
</pre>

가독성을 높이고 동시에 아름답게 하기 위해 Prism.js와 같은 JavaScript 구문 강조 라이브러리를 사이트에서 사용할 것입니다.
Prism에서 위의 스니펫에 대한 구문 강조를 얻기 위해 Prism.highlightElem(pre)이 호출됩니다. 
이것은 이러한 pre 요소의 내용을 검사하고 해당 요소에 색상이 지정된 구문 강조를 위한 특수 태그 및 스타일을 추가합니다.
강조 표시 방법을 정확히 언제 실행해야 할까요?
DOMContentLoaded 이벤트에서 수행하거나 스크립트를 페이지 하단에 배치할 수 있습니다. 
DOM이 준비되면 pre[class*="language"] 요소를 검색하고 Prism.highlightElem을 호출할 수 있습니다.
*/

// highlight all code snippets on the page
document
  .querySelectorAll('pre[class*="language"]')
  .forEach(Prism.highlightElem);

/*
여기까지는 간단하죠?

이제 서버에서 자료를 동적으로 가져오려고 한다고 가정해 보겠습니다. 
이 튜토리얼의 뒷부분에서 이에 대한 방법을 연구할 것입니다. 
지금은 웹 서버에서 HTML 기사를 가져와 요청 시 표시하는 것만 중요합니다.
*/

let article =
  /* fetch new content from server */
  (articleElem.innerHTML = article);

/*
새 문서 HTML에는 코드 스니펫이 포함될 수 있습니다. Prism.highlightElem을 호출해야 합니다. 그렇지 않으면 강조 표시되지 않습니다.
동적으로 로드된 기사에 대해 Prism.highlightElem을 언제 어디서 호출해야할까요?
다음과 같이 기사를 로드하는 코드에 해당 호출을 추가할 수 있습니다.
*/

let article =
  /* fetch new content from server */
  (articleElem.innerHTML = article);

let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);

/*
… 하지만 기사, 퀴즈, 포럼 게시물 등 콘텐츠를 로드하는 코드에 많은 위치가 있다고 상상해 보세요. 
로드한 후 콘텐츠의 코드를 강조 표시하기 위해 모든 곳에 강조 표시 호출을 넣어야 합니까? 그다지 편리하지 않습니다.
콘텐츠가 타사 모듈에 의해 로드되는 경우에는 어떻게 됩니까? 
예를 들어, 콘텐츠를 동적으로 로드하는 다른 사람이 작성한 포럼에 구문 강조 표시를 추가하고 싶습니다. 
타사 스크립트 패치를 좋아하는 사람은 없습니다.
운 좋게도 다른 옵션이 있습니다. MutationObserver를 사용하여 코드 스니펫이 페이지에 삽입될 때 자동으로 감지하고 강조 표시할 수 있습니다.
따라서 강조 표시 기능을 한 곳에서 처리하여 통합할 필요가 없습니다.
*/
