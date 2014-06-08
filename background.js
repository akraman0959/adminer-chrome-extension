var Adminer = {
	tab: null,
	selfDomain: null,
	search: function(){
		var bookmarkTreeNodes = chrome.bookmarks.getSubTree("0", function(bookmarkTreeNodes){
			for (var j = 0; j < bookmarkTreeNodes[0].children.length; j++) {
				Adminer.parse(bookmarkTreeNodes[0].children[j]);
			}
		});
	},
	parse: function(data){
		if(typeof(data.children) !== 'undefined'){
			for (var i = 0; i < data.children.length; i++) {
				if(localStorage["bookmark"] && data.children[i].title == localStorage["bookmark"]){
					Adminer.collect(data.children[i]);
					break;
				}else{
					Adminer.parse(data.children[i]);
				}
			}
		}
	},
	collect: function(data){
		for(var i = 0; i < data.children.length; i++){
			if(typeof(data.children[i].url) !== 'undefined'){
				if(Adminer.selfDomain == Adminer.getHost(data.children[i].url)){
					Adminer.showIcon(data.children[i].url);
					break;
				}
			}else{
				if(typeof(data.children[i].children) !== 'undefined'){
					Adminer.collect(data.children[i]);
				}
			}
		}
	},
	getHost: function(url){ //http://stackoverflow.com/a/8450604
		var a = document.createElement('a');
		a.href = url;
		return a.hostname;
	},
	init: function(tab){
		Adminer.tab = tab;
		Adminer.selfDomain = Adminer.getHost(tab.url);
		Adminer.search();
	},
	showIcon: function(url){
		chrome.pageAction.setIcon({path: "adminer.ico", tabId: Adminer.tab.tabId});
		chrome.pageAction.setTitle({title: chrome.i18n.getMessage("adminer_tooltip"), tabId: Adminer.tab.tabId});
		chrome.pageAction.setPopup({tabId: Adminer.tab.tabId, popup: "popup.html?URL="+encodeURIComponent(url)});
		chrome.pageAction.show(Adminer.tab.tabId);
	}
};
chrome.webRequest.onCompleted.addListener(Adminer.init, {urls: ["http://*/*","https://*/*"], types: ["main_frame"]},["responseHeaders"]);
function onMessage(request, sender, sendResponse) {
	if (request.login_page) {
		if ( localStorage["new_tab"] && (localStorage["new_tab"] == "true") )
			chrome.tabs.create({ url:request.login_page});
		else 
		chrome.tabs.update({ url:request.login_page});
	}
};
chrome.extension.onMessage.addListener(onMessage);