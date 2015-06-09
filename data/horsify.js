(function() {
	"use strict";
		var nodes = [];

		var findNodes = function findNodes(node) {
			var idx = 0;
			var childCount = node.childNodes.length;
			if (childCount) {
				for (idx = 0; idx < childCount; ++idx) {
					findNodes(node.childNodes[idx]);
				}
			}
			if (node.nodeType === Node.TEXT_NODE) {
				nodes.push(node);
			}
		};
		findNodes(document);

		var houseToHorse = function(match, p1, p2, p3) {
			return [p1, String.fromCharCode(String.charCodeAt(p2) - 3), p3].join('');
		};

		for (var idx = 0; idx < nodes.length; ++idx) {
			var text = nodes[idx].nodeValue;
			text = text.replace(/(ho)(u)(s[ei])/gi, houseToHorse);
			nodes[idx].nodeValue = text;
		}
})();
