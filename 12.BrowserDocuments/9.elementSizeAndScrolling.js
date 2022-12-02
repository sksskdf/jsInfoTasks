/*
요소는 다음과 같은 기하 프로퍼티를 지원합니다.

offsetParent – 위치 계산에 사용되는 가장 가까운 조상 요소나 td, th, table, body
offsetLeft와 offsetTop – offsetParent 기준으로 요소가 각각 오른쪽, 아래쪽으로 얼마나 떨어져 있는지를 나타내는 값
offsetWidth와 offsetHeight – 테두리를 포함 요소 '전체’가 차지하는 너비와 높이
clientLeft와 clientTop – 요소 제일 밖을 감싸는 영역과 요소 안(콘텐츠 + 패딩)을 감싸는 영역 사이의 거리를 나타냄. 대부분의 경우 왼쪽, 위쪽 테두리 두께와 일치하지만, 오른쪽에서 왼쪽으로 글을 쓰는 언어가 세팅된 OS에선 clientLeft에 스크롤바 두께가 포함됨
clientWidth와 clientHeight – 콘텐츠와 패딩을 포함한 영역의 너비와 높이로, 스크롤바는 포함되지 않음
scrollWidth와 scrollHeight – clientWidth, clientHeight 같이 콘텐츠와 패딩을 포함한 영역의 너비와 높이를 나타내는데, 스크롤바에 의해 숨겨진 콘텐츠 영역까지 포함됨
scrollLeft와 scrollTop – 스크롤바가 오른쪽, 아래로 움직임에 따라 가려지게 되는 요소 콘텐츠의 너비와 높이
스크롤바를 움직일 수 있게 해주는 scrollLeft와 scrollTop을 제외한 모든 프로퍼티는 읽기 전용입니다.
*/