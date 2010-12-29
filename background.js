function analyze($trs) {

	localStorage.runningTests = localStorage.runningTests || '';
	
	var saved = localStorage.runningTests.split( ',' );

	var running = [];
	var started = [];
	var done = [];
	
	$trs.each( function () { 
		
		var testName = $(this).text().match( /\[(.*)\] surplus/ )[1];
        
		if ( saved.indexOf( testName ) == -1 ) {	
			started.push( testName );
		}
		
		running.push( testName ); 
		
	});
	
	$.each( saved, function (idx, value) {
		
		if (running.indexOf( value ) == -1 && value !== "" ) {
			done.push( value );
		}
		
	});
	
	localStorage.startedTests = started;
	localStorage.doneTests = done;
	localStorage.runningTests = running.join(',');
}

function get_tests() {

	$.get( getTestsUrl(), function (res) {
	
		var $trs = $( res ).find( 'td:contains("Query:TestsInProgress")' ).parent().parent().find( 'tr:gt(1)' );		
		
		analyze( $trs );
		notify();
		
		var num = $trs.length;
		
		if (num > 0) {
			
			chrome.browserAction.setBadgeBackgroundColor( {color: [0,255,0,100] } );
			chrome.browserAction.setBadgeText( {text: num.toString() } );
			
		}
		else {
			chrome.browserAction.setBadgeText( {text: '' } );
		}
				
	});

}

function notify() {

	function show_notification (test, started, success) {
	
		var url = chrome.extension.getURL( 'notify.html' );
	
		var notification = webkitNotifications.createHTMLNotification( url + '?test=' + test + '&started=' + started + '&success=' + success );	
		notification.show();	
		setTimeout( function () { notification.cancel(); }, 15 * 1000 );
		
	}
	
	$.each ( localStorage.startedTests.split(','), function (i,v) {
		v && show_notification( v, 'yes', 'yes' );
	});	
	
	$.each ( localStorage.doneTests.split(','), function (i,v) {
	
		if (!v) return;
	
		$.get( 'http://' + localStorage.fitnesseSrv + '/' + v + '?testHistory', function (res) {
		
			var $td = $( res ).find( 'td:contains("' + v + '")' ).parent().find( 'td:eq(4)' );
			var res = $td.attr( 'class' ) == 'pass'? 'yes' : 'no';
			
			show_notification( v, 'no', res );		
		});	
		
	});	
}

get_tests();

localStorage.fitnesseSrv = localStorage.fitnesseSrv || "spb8112:8080";
window.setInterval(get_tests, 20 * 1000 );

function getTestsUrl() {
	localStorage.TestsInProgressPath = localStorage.TestsInProgressPath || '/FitNesse.TestsInProgress?test';
	return 'http://' + localStorage.fitnesseSrv + localStorage.TestsInProgressPath;	
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
  
  get_tests();	
  goToTestsPage();
  
});

chrome.extension.onRequest.addListener( function (request, sender, sendResponse) {     
    sendResponse({ fitnesseSrv: getTestsUrl() });    
});






























