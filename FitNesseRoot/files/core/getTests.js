﻿function checkTest(pathname,url) {

    $.get( url, function (res) {
		
		var path = pathname.replace( /^\//, '' );
		var $testButton = $( 'a[href="' + path + '?test"]' );
        
        var running = res.match( RegExp( path, 'm' ) ) != null;		
		$( '#fn-checkTest' ).trigger('testState', {running: running, testButton: $testButton } )
        
    });
	
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