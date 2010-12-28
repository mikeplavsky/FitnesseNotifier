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
	
	var text = res[1];
	var parts = res[1].split( '.' );
	
	if ( parts.length > 2  ) {
		text = parts.slice(parts.length - 2 ).join( '.' );
	}
	
	$( '#fn-notify-test').text( text );	
	
};

notify();