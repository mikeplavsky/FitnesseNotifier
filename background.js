function get_tests() {

	$.get( getTestsUrl(), function (res) {
	
		var num = $( res ).find( 'td:contains("Query:TestsInProgress")' ).parent().parent().find( 'tr' ).length - 2;
		
		if (num > 0) {
			
			chrome.browserAction.setBadgeBackgroundColor( {color: [0,255,0,100] } );
			chrome.browserAction.setBadgeText( {text: num.toString() } );
			
		}
		else {
			chrome.browserAction.setBadgeText( {text: '' } );
		}
				
	});

}

localStorage.fitnesseSrv = localStorage.fitnesseSrv || "spb8112:8080";
window.setInterval(get_tests, 20 * 1000 );

function getTestsUrl() {	
	return 'http://' + localStorage.fitnesseSrv + '/FitNesse.TestsInProgress?test';
}

function isTestsUrl(url) {
	return url === getTestsUrl();
}

function goToTestsPage() {

  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isTestsUrl(tab.url)) {
        chrome.tabs.update(tab.id, {selected: true, url: getTestsUrl() });
        return;
      }
    }
    chrome.tabs.create({url: getTestsUrl()});
  });
  
}

chrome.browserAction.onClicked.addListener(function(tab) {
  goToTestsPage();
});

chrome.extension.onRequest.addListener( function (request, sender, sendResponse) {     
    sendResponse({ fitnesseSrv: getTestsUrl() });    
});






























