/*
mouseover이벤트 , mouseout, mousemover, mouseenter,mouseleave를 다루었습니다 

다음 사항에 유의하세요.

빠른 마우스 이동은 중간 요소를 건너뛸 수 있습니다.
이벤트 에는 다음 mouseover/out과 mouseenter/leave같은 추가 속성이 있습니다 relatedTarget. 그것이 우리가 오고 있는 요소이며 target.
mouseover/out상위 요소에서 하위 요소로 이동할 때도 이벤트 가 트리거됩니다. 브라우저는 마우스가 한 번에 하나의 요소(가장 깊은 요소)에만 있을 수 있다고 가정합니다.

이벤트 mouseenter/leave는 그 측면에서 다릅니다. 마우스가 전체적으로 요소에 들어오고 나갈 때만 트리거됩니다. 또한 그들은 거품이 나지 않습니다.
*/