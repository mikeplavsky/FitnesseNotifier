if ( $( 'link' ).filter( function() { return $(this).attr( 'href' ).match( 'fitnesse' )  } ).length && !$( '#test-summary' ).length ) {

	console.log( 'Started Fitnesse Controller' );
	
	var path = window.location.pathname.replace( /\//, '' );
	console.log( path );
	
	var href = path + '?test';	
	localStorage[ location.origin ] || (localStorage[ location.origin ] = "FitNesse.TestsInProgress");
	
	var checker = localStorage[ location.origin ];
	
	if (path !== checker ) {
	
		var $testBtn = $( 'a[href="' + path + '?test"]' );
		
		$testBtn.ajaxError( function() {		
			$testBtn.text( 'Error' );			
		});
	
		$testBtn.text( 'Checking...' );
		
		$.get( location.origin + '/' + checker + '?test', function (res) {
				
				$testBtn.text( 'Test' );
				
				if ( res.match( RegExp( path, 'm' ) ) ) {				
					$testBtn.hide();			
				}			
				
		});
	
	}
	
};




