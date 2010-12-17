if ( $( 'link' ).filter( function() { return $(this).attr( 'href' ).match( 'fitnesse' )  } ).length && !$( '#test-summary' ).length ) {
	
	console.log( 'Started Fitnesse Controller' );
	
	var path = window.location.pathname.replace( /\//, '' );
	console.log( path );
	
	var href = path + '?test';
	
	var $testBtn = $( 'a[href="' + path + '?test"]' );	
	$testBtn.text( 'Checking...' );
	
	$.get( 'http://spb8112:8080/RecoveryManager.SuiteBuild.TestInProgress?test', function (res) {
			
			$testBtn.text( 'Test' );
			
			if ( res.match( RegExp( path, 'm' ) ) ) {				
				$testBtn.hide();			
			}			
			
	});
	
};




