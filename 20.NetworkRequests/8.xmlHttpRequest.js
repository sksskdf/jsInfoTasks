/*
XMLHttpRequest는 HTTP 요청을 만들 수 있는 내장 브라우저 개체입니다.
이름에 "XML"이라는 단어가 포함되어 있음에도 불구하고 XML 형식뿐만 아니라 모든 데이터에서 작동할 수 있습니다. 
또한 파일을 업로드/다운로드하고 진행 상황을 추적하는 등의 작업을 할 수 있습니다.
*/

let xhr = new XMLHttpRequest();

xhr.open("GET", "/my/url");

xhr.send();

xhr.onload = function () {
  if (xhr.status != 200) {
    // HTTP error?
    // handle error
    alert("Error: " + xhr.status);
    return;
  }

  // get the response from xhr.response
};

xhr.onprogress = function (event) {
  // report progress
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function () {
  // handle non-HTTP error (e.g. network down)
};

/*
실제로 더 많은 이벤트가 있으며 최신 사양에서는 이를 수명 주기 순서로 나열합니다.

loadstart– 요청이 시작되었습니다.
progress– 응답의 데이터 패킷이 도착했으며 현재 전체 응답 본문이 response에 있습니다 .
abort– xhr.abort() 호출에 의해 요청이 취소되었습니다 
error– 연결 오류가 발생했습니다(예: 잘못된 도메인 이름). 404와 같은 HTTP 오류에는 발생하지 않습니다.
load– 요청이 성공적으로 완료되었습니다.
timeout– 시간 초과로 인해 요청이 취소되었습니다(설정된 경우에만 발생).
loadend– load, error, timeout 또는 abort 이후에 트리거합니다 

abort, timeout, load 및 error 이벤트는 함께 사용할 수 없습니다. 그들 중 하나만 발생할 수 있습니다.

가장 많이 사용되는 이벤트는 로드 완료( load), 로드 실패( error)이거나 단일 loadend핸들러를 사용하고 요청 객체의 속성을 확인하여 xhr어떤 일이 발생했는지 확인할 수 있습니다.

우리는 이미 다른 이벤트를 보았습니다: readystatechange. 역사적으로 사양이 확정되기 오래 전에 나타났습니다. 요즘에는 사용할 필요가 없으며 최신 이벤트로 교체할 수 있지만 종종 이전 스크립트에서 찾을 수 있습니다.

업로드를 구체적으로 추적해야 하는 경우 xhr.upload개체에서 동일한 이벤트를 수신해야 합니다.
*/