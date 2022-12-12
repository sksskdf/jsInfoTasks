/*
브라우저 관점에선 크로스 오리진 요청은 안전한(safe) 크로스 오리진 요청과 그렇지 않은 크로스 오리진 요청 두 분류로 나뉩니다.

안전한 요청은 다음 조건을 모두 충족하는 요청입니다.

메서드: GET이나 POST 혹은 HEAD
헤더:
Accept
Accept-Language
Content-Language
값이 application/x-www-form-urlencoded나 multipart/form-data, text/plain인 Content-Type
안전한 요청은 아주 오래전 부터 <form>이나 <script>태그를 사용해도 가능했던 요청인 반면 안전하지 않은 요청은 브라우저에선 보낼 수 없었던 요청이라는 점이 두 요청의 근본적인 차이입니다.

실무 관점에서 두 요청의 차이는 안전한 요청은 Origin 헤더와 함께 바로 요청이 전송되는 반면 안전하지 않은 요청은 브라우저에서 본 요청이 이뤄지기 전에 preflight 요청이라 불리는 사전 요청을 보내 퍼미션 여부를 물어본다는 점입니다.

안전한 요청은 다음과 같은 절차를 따릅니다.

→ 오리진 정보가 담긴 Origin 헤더와 함께 브라우저가 요청을 보냅니다.
← 자격 증명이 없는 요청의 경우(기본), 서버는 아래와 같은 응답을 보냅니다.
Origin 값과 동일하거나 *인 Access-Control-Allow-Origin
← 자격 증명이 있는 요청의 경우 서버는 아래와 같은 응답을 보냅니다.
Origin 값과 동일한 Access-Control-Allow-Origin
값이 true인 Access-Control-Allow-Credentials
자바스크립트를 사용해 Cache-Control이나 Content-Language, Content-Type, Expires, Last-Modified, Pragma를 제외한 응답 헤더에 접근하려면 응답 헤더의 Access-Control-Expose-Headers에 접근을 허용하는 헤더가 명시돼 있어야 합니다.

안전하지 않은 요청의 절차는 다음과 같습니다. 사전 요청인 ‘preflight’ 요청이 본 요청 전에 전송됩니다.

→ 브라우저는 동일한 URL에 OPTIONS 메서드를 사용한 preflight 요청을 보내게 되는데, 이때 헤더엔 다음과 같은 정보가 들어갑니다.
Access-Control-Request-Method – 본 요청의 메서드 정보가 담김
Access-Control-Request-Headers – 본 요청의 헤더 정보가 담김
← 서버는 상태 코드 200과 아래와 같은 헤더를 담은 응답을 전송합니다.
Access-Control-Allow-Methods – 허용되는 메서드 목록이 담김
Access-Control-Allow-Headers – 허용되는 헤더 목록이 담김
Access-Control-Max-Age – 몇 초간 preflight 요청 없이 크로스 오리진 요청을 바로 보낼지에 대한 정보가 담김
이후엔 본 요청이 전송되고, 절차는 ‘안전한’ 요청과 동일합니다.
*/
