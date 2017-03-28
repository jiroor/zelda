(function(global) {
	'use strict';

	var els = document.getElementsByTagName("*");
	var el;
	var file;
	var request;

	for (var i = 0; i < els.length; i++) {
		el = els[i];
		file = el.getAttribute("w3-include-html");

		if (!file) {
			continue;
		}

		request = new XMLHttpRequest();
		request.open("GET", file, false);
		request.send();

		if (request.readyState == 4 && request.status == 200) {
			el.outerHTML = request.responseText;
			el.removeAttribute("w3-include-html");
		}
	}

})(window);
