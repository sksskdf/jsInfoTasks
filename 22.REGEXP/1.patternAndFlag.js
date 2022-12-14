/*
정규 표현식은 패턴과 선택적으로 사용할 수 있는 플래그 g, i, m, u, s, y로 구성됩니다.
플래그와 특수 기호(추후 학습)가 없는 경우엔 일반적인 부분 문자열 검색과 동일한 방식으로 검색이 진행됩니다.
플래그 g가 있는 경우엔 str.match(regexp)는 패턴과 일치하는 모든 부분 문자열을 검색합니다. g가 없는 경우엔 첫 번째 부분 문자열만 찾습니다.
str.replace(regexp, replacement)는 regexp과 일치하는 부분 문자열을 replacement로 교체합니다. g 플래그가 있으면 부분 문자열 전체를, 없으면 첫 번째 부분 문자열을 교체합니다.
패턴과 일치하는 부분 문자열이 하나라도 있는 경우 regexp.test(str)는 true를 반환합니다. 그렇지 않으면 false가 반환됩니다.
*/
