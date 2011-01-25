if ( $( 'link' ).filter( function() { return $(this).attr( 'href' ).match( 'fitnesse' )  } ).length && !$( '#test-summary' ).length ) {

	chrome.extension.sendRequest( { name: "getFitnesseSrv" }, function(res){
	
		if (res.enableTestCheck == 'yes' && res.fitnesseSrvName == window.location.host ) { 
        
            function check() {
                checkTest( window.location.pathname, res.fitnesseSrv );
            }
        
            $('body').append('<div id="fn-checkTest">');
			
			$('#fn-checkTest').bind('testState', function(ev,res){

				if (res.running && res.testButton.length) {
					$("#fn-test-running").show();
					res.testButton.hide();
				}
				else {
					$("#fn-test-running").hide();
					res.testButton.show();
				}                
                
                setTimeout( check, 5000 );
                
			});

			$('body').append('<div id="fn-test-running" style="display:none">Test is running</div>');            
			check();
        }
	});
};




