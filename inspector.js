if ( $( 'link' ).filter( function() { return $(this).attr( 'href' ).match( 'fitnesse' )  } ).length && !$( '#test-summary' ).length ) {
	
	console.log( 'Started Fitnesse Controller' );
	
	var path = window.location.pathname.replace( /\//, '' );
	console.log( path );
	
	$( 'a[href="' + path + '?test"]' ).hide();
	
};




