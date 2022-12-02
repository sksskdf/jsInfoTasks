/*
기하 프로퍼티:

사용자 눈에 보이는 문서(콘텐츠가 실제 보여지는 영역)의 너비와 높이: document.documentElement.clientWidth/clientHeight

스크롤에 의해 가려진 영역을 포함한 문서 전체의 너비와 높이:

let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
스크롤 관련 프로퍼티:

현재 스크롤 정보 읽기: window.pageYOffset/pageXOffset.

스크롤 상태 변경시키기:

window.scrollTo(pageX,pageY) – 절대 좌표
window.scrollBy(x,y) – 현재 스크롤 상태를 기준으로 상대적으로 스크롤 정보 변경
elem.scrollIntoView(top) – elem이 눈에 보이도록 스크롤 상태 변경(인수에 따라 창 최상단, 최하단에 해당 요소가 노출되도록 처리)
*/