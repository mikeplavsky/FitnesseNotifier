function check_test(url) {

	var path = window.location.pathname.replace( /\//, '' );
	var $testBtn = $( 'a[href="' + path + '?test"]' );
		
	$testBtn.ajaxError( function() {		
		$testBtn.text( 'Error' );			
	});
	
	$.get( url, function (res) {
				
			$testBtn.text( 'Test' );
				
			if ( res.match( RegExp( path, 'm' ) ) ) {				
				$testBtn.hide();			
			}			
				
	});
	
}


if ( $( 'link' ).filter( function() { return $(this).attr( 'href' ).match( 'fitnesse' )  } ).length && !$( '#test-summary' ).length ) {

	chrome.extension.sendRequest( { name: "getFitnesseSrv" }, function(res){
		if (res.enableTestCheck == 'yes') { 
            check_test( res.fitnesseSrv );		
        }
	});
	
};




