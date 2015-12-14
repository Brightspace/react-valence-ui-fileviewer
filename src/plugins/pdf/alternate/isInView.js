'use strict';

function isInView(element, scrollPosition, visibleAreaHeight) {
	var visibleAreaStart = scrollPosition,
		visibleAreaEnd = visibleAreaStart + visibleAreaHeight,
		elementTop = element.offsetTop,
		elementBottom = elementTop + element.offsetHeight;

	return (elementTop >= visibleAreaStart && elementTop <= visibleAreaEnd)
		|| (elementBottom >= visibleAreaStart && elementBottom <= visibleAreaEnd)
		|| (elementTop <= visibleAreaStart && elementBottom >= visibleAreaEnd);
}

module.exports = isInView;
