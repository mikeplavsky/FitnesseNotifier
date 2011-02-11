function checkTest(pathname,url) {

    $( '#fn-frame-test-state' ).remove();
    $( 'body' ).append( $( '<iframe id="fn-frame-test-state" width=0 height=0><iframe>' ) );
    
    $( '#fn-frame-test-state' ).bind("load", function (res) {
        
        var path = pathname.replace( /^\//, '' );
		var $testButton = $( 'a[href="' + path + '?test"]' );
        
        var running = $( '#fn-frame-test-state' ).contents().find('a[href="' + path + '"]').length > 0;		
		$( '#fn-checkTest' ).trigger('testState', {running: running, testButton: $testButton } )
        
    });
    
    $( '#fn-frame-test-state' ).attr( "src", url );
	
}

function getTestsUrl() {
	return 'http://' + localStorage.fitnesseSrv + '/files/testProgress';
}

function getTests() {

    function notify() {

        localStorage.enableNotification = localStorage.enableNotification || 'yes';

        if (localStorage.enableNotification != 'yes' ) {
            return; 
        }

        function show_notification (test, started, success) {
            $( '#fn-result' ).trigger( 'showNotification', { test: test, started: started, success: success } );
        }
        
        $.each ( localStorage.startedTests.split(','), function (i,v) {
            v && show_notification( v, 'yes', 'yes' );
        });	
        
        $.each ( localStorage.doneTests.split(','), function (i,v) {
        
            if (!v) return;
        
            $.get( 'http://' + localStorage.fitnesseSrv + '/' + v + '?testHistory', function (res) {
            
                var $td = $( res ).find( 'td:contains("' + v + '")' ).parent().find( 'td:eq(4)' );
                var res = $td.attr( 'class' ) == 'pass'? 'yes' : 'no';

			    show_notification( v, 'no', res );		
            });	
            
        });	
    }

    function analyze($trs) {

        localStorage.runningTests = localStorage.runningTests || '';
        
        var saved = localStorage.runningTests.split( ',' );

        var running = [];
        var started = [];
        var done = [];

		$trs.each( function () { 
            
            var testName = $(this).find('td:eq(0)').text().trim();
            
            if ( saved.indexOf( testName ) == -1 ) {	
                started.push( testName );
            }
            
            running.push( testName ); 
            
        });
        
        $.each( saved, function (idx, value) {
            
            if (running.indexOf( value ) == -1 && value !== "" ) {
                done.push( value );
            }
            
        });
        
        localStorage.startedTests = started;
        localStorage.doneTests = done;
        localStorage.runningTests = running.join(',');
        
   }

	$.get( getTestsUrl(), function (res) {
	
		var $trs = $(res).find( 'tr:gt(0)' );		
		
		analyze( $trs );
		notify();

        $( "#fn-result" ).trigger( 'testsNumber', {number: $trs.length } );		
				
	});

}