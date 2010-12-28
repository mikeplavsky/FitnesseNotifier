function notify(url) {

	if ( !localStorage.startedTests && !localStorage.doneTests ) {
		return;
	}
	
	var notification = webkitNotifications.createHTMLNotification( url );	
	notification.show();	
	setTimeout( function () { notification.cancel(); }, 60 * 1000 );
}
