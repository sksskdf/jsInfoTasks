/*
페이지 내 모든 점은 다음과 같은 좌표를 갖습니다.

창 기준 – elem.getBoundingClientRect()
문서 기준 – elem.getBoundingClientRect()와 현재 스크롤 상태
창 기준 좌표는 position:fixed와 사용하면 좋고 문서 기준 좌표는 position:absolute와 사용하면 좋습니다.

두 좌표 체계 모두 장단점이 있습니다. CSS의 position, absolute, fixed처럼 이게 필요할 때도 있고 저게 필요할 때도 있습니다.
*/
