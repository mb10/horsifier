var pageMod = require("sdk/page-mod");

var { ToggleButton } = require("sdk/ui/button/toggle");

var button = ToggleButton({
    id: "my-button1",
    label: "my button1",
    icon: "./icon-16.png",
    onChange: changed,
    badge: "on",
    badgeColor: "#00AAAA"
  });

var mod = pageMod.PageMod({
	include: "*",
	contentScriptFile: "./horsify.js",
	contentScriptWhen: "ready"
});

function changed(state) {
	
	if (!state.checked) {
  	button.badgeColor = "#00AAAA";
  	button.badge = "on";
	  mod = pageMod.PageMod({
			include: "*",
			contentScriptFile: "./horsify.js",
			contentScriptWhen: "ready"
	  });
  }
	else {
  	button.badgeColor = "#AA00AA";
  	button.badge = "off";
		mod.destroy();
  }
}