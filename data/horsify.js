(function() {
	"use strict";

	var textNodes = [];
	var imgNodes = [];

	var buildQuery = function buildQuery(params) {
		var retval = [];
		for (var key in params) {
			if (params.hasOwnProperty(key)) {
				retval.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
			}
		}
		return retval.join('&');
	};

	var findNodes = function findNodes(node) {
		var idx = 0;
		var childCount = node.childNodes.length;
		if (childCount) {
			for (idx = 0; idx < childCount; ++idx) {
				findNodes(node.childNodes[idx]);
			}
		}
		if (node.nodeType === Node.TEXT_NODE) {
			textNodes.push(node);
		}
		else if (node.nodeType === Node.ELEMENT_NODE) {
			if (node.nodeName === "IMG") {
				imgNodes.push(node);
			}
		}
	};
	findNodes(document);

	var houseToHorse = function(match, p1, p2, p3) {
		return [p1, String.fromCharCode(String.charCodeAt(p2) - 3), p3].join('');
	};

	for (var idx = 0; idx < textNodes.length; ++idx) {
		var text = textNodes[idx].nodeValue;
		text = text.replace(/(ho)(u)(s[ei])/gi, houseToHorse);
		text = text.replace(/(Barack\s)?(H.\s)?Obama/g, 'Slippy');
		textNodes[idx].nodeValue = text;
	}

	if (!imgNodes.length) {
		return;
	}
	var url = "https://api.flickr.com/services/rest?method=flickr.photos.search&";
	var params = {
		api_key: 'API_KEY',
		sort: 'relevance',
		per_page: '500',
		format: 'json',
		extras: 'url_c',
		nojsoncallback: '1'
	};
	if (Date.now() % 10 === 3) {
		params.tags = 'capybara';
	} else {
		params.tags = 'horse';
	}
	url += buildQuery(params);
	console.log(url);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function onload() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				var response = JSON.parse(xhr.responseText);
				if (response.stat === "ok") {
					for (var idx = 0; idx < imgNodes.length; ++idx) {
						var randomIdx = Math.floor(Math.random() * response.photos.perpage);
						var img = imgNodes[idx];
						var orig_width = getComputedStyle(img).getPropertyValue("width");
						var orig_height = getComputedStyle(img).getPropertyValue("height");
						img.src = response.photos.photo[randomIdx].url_c;
						img.style.width = orig_width;
						img.style.height = orig_height;
					}
				} else {
					console.error(response);
				}
				return;
			}
		}
		console.error(xhr.statusText);
	};
	xhr.onerror = function onerror() {
		console.error(xhr.statustext);
	};
	xhr.send();
})();
