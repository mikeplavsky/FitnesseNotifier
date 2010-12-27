function check_test(url) {

	var path = window.location.pathname.replace( /\//, '' );	
	
	if ( window.location.href !==  url.match( /(.*)\?test$/ )[1] ) {
	
		var $testBtn = $( 'a[href="' + path + '?test"]' );
		
		$testBtn.ajaxError( function() {		
			$testBtn.text( 'Error' );			
		});
	
		$testBtn.text( 'Checking...' );
		
		$.get( url, function (res) {
				
				$testBtn.text( 'Test' );
				
				if ( res.match( RegExp( path, 'm' ) ) ) {				
					$testBtn.hide();			
				}			
				
		});
	
	}
	
}


if ( $( 'link' ).filter( function() { return $(this).attr( 'href' ).match( 'fitnesse' )  } ).length && !$( '#test-summary' ).length ) {

	chrome.extension.sendRequest( { name: "getFitnesseSrv" }, function(res){		
		check_test( res.fitnesseSrv );		
	});
	
};




