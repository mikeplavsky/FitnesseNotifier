getTests();

localStorage.fitnesseSrv = localStorage.fitnesseSrv || "spb8112:8080";
window.setInterval(getTests, 20 * 1000 );

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
  
  getTests();	
  goToTestsPage();
  
});

chrome.extension.onRequest.addListener( function (request, sender, sendResponse) {  

    localStorage.enableTestCheck = localStorage.enableTestCheck || 'yes';   
    sendResponse({ fitnesseSrv: getTestsUrl(), fitnesseSrvName: localStorage.fitnesseSrv, enableTestCheck :  localStorage.enableTestCheck});    
});

$( "#fn-result" ).bind( 'testsNumber', function ( ev, res ) {

    if (res.number > 0) {
			
		chrome.browserAction.setBadgeBackgroundColor( {color: [0,255,0,100] } );
		chrome.browserAction.setBadgeText( {text: res.number.toString() } );
			
    }
	else {
        chrome.browserAction.setBadgeText( {text: '' } );
    }
    
});


$( "#fn-result" ).bind( 'showNotification', function ( ev, res ) {

     var url = chrome.extension.getURL( 'notify.html' );
        
     var notification = webkitNotifications.createHTMLNotification( url + '?test=' + res.test + '&started=' + res.started + '&success=' + res.success );	
     notification.show();	
            
     localStorage.notificationTimeout = localStorage.notificationTimeout || 15;
            
     var secs = parseInt( localStorage.notificationTimeout, 10 ); 		
     setTimeout( function () { notification.cancel(); }, secs * 1000 );

});






























