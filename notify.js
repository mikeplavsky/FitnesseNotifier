function notify() {

	var res = location.href.match( /test=(.*)&started=(.*)&success=(.*)$/ );
	
	if ( res[2] == 'yes' ) {
		$( '#fn-notify-test').addClass( 'fn-started' );
	} 
	else if ( res[3] == 'yes' ) {	
		$( '#fn-notify-test').addClass( 'fn-success' );
	}
	else {	
		$( '#fn-notify-test').addClass( 'fn-failure' );
	}
	
	$( '#fn-notify-test').text( res[1] );	
	
};

notify();