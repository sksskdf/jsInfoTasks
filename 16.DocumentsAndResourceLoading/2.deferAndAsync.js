/*
async와 defer 스크립트는 다운로드 시 페이지 렌더링을 막지 않는다는 공통점이 있습니다. 따라서 async와 defer를 적절히 사용하면 사용자가 오래 기다리지 않고 페이지 콘텐츠를 볼 수 있게 할 수 있습니다.
두 스크립트의 차이점은 다음과 같습니다.

async | 	load-first order. 문서 내 순서와 상관없이 먼저 다운로드된 스크립트가 먼저 실행됩니다. |  비동기 스크립트는 HTML 문서가 완전히 다운로드되지 않은 상태라도 로드 및 실행될 수 있습니다. 스크립트 크기가 작거나 캐싱 처리 되어있을 때 혹은 HTML 문서 길이가 아주 길 때 이런 일이 발생합니다.
defer | 문서에 추가된 순 | 지연 스크립트는 문서 다운로드와 파싱이 완료된 후에, DOMContentLoaded 이벤트 발생 전에 실행됩니다.
*/