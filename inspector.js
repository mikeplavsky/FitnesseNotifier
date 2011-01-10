if ( $( 'link' ).filter( function() { return $(this).attr( 'href' ).match( 'fitnesse' )  } ).length && !$( '#test-summary' ).length ) {

	chrome.extension.sendRequest( { name: "getFitnesseSrv" }, function(res){
	
		if (res.enableTestCheck == 'yes') { 
			
			$('body').append('<div id="fn-checkTest">');
			
			$('#fn-checkTest').bind('testState', function(ev,res){

				if (res.running) {
					res.testButton.hide();
				}
				else {
					res.testButton.show();
				}
				
			});

			var checker = function() {checkTest( window.location.pathname, res.fitnesseSrv ); }
			checker();
			
            setInterval( checker, 5 * 1000 );		

        }
	});
};




