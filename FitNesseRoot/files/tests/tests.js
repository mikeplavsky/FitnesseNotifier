function stopAllTests(callback) {
    $.getJSON( 'http://localhost:8181/stopAllTests?callback=?', callback);    
}

function stopTests(names, callback) {
    $.getJSON( 'http://localhost:8181/stopTests?callback=?', {tests:names}, callback );    
}

function startTests(names, callback) {    
    $.getJSON( 'http://localhost:8181/startTests?callback=?', {tests:names}, callback );
}

module( 'fitnesse notifier', {	
   
   setup: function () {   
        
        localStorage.fitnesseSrv = 'localhost:8080'
        
        localStorage.runningTests = '';
        localStorage.startedTests = '';
        localStorage.doneTests = '';
        
        localStorage.enableNotification = 'yes';
        
        $( '#fn-result' ).remove();
        $( 'body' ).append( '<div id="fn-result">' );
        
   }
    
});

function _test() {}

test( 'running tests', function () {

    stop();
    expect(4);
    
    var tests = ['DisasterRecovery.SuiteMoss2007', 'SuiteFarmBackup.TestBackup',
                  'DisasterRecovery.SuiteSp14','SuiteFarmBackup.TestSchedule'].sort();
                  
    $( '#fn-result' ).bind( 'testsNumber', function (ev, res) {
	
		var running = localStorage.runningTests.split( ',' ).sort();
        var started = localStorage.startedTests.split( ',' ).sort();
    
        same( res.number, 4, 'notification about number of running tests' );
		same( running, tests, 'running tests' )
        same( started, tests, 'started tests' );
        same( localStorage.doneTests, '', 'number of done tests in LS' );
             
        start();
        
    });
    
	stopAllTests( function () {
    	startTests( tests.join(';'), function (res) {     
        	getTests();           
    	});
	});
    
});

test( 'done tests', function () {

    stop();
    expect(2);
    
    var tests = ['DisasterRecovery.SuiteMoss2007', 'SuiteFarmBackup.TestBackup',
                  'DisasterRecovery.SuiteSp14','SuiteFarmBackup.TestSchedule'];
                  
    $( '#fn-result' ).bind( 'testsNumber', function (ev, res) {  
             
       if (res.number == 4) {
            
           stopTests( [tests[0],tests[2]].join(';'), function (res) {
                getTests();                                    
           });
           return;                
       }
             
       same( res.number, 2, 'notification about number of running tests' );
       same( localStorage.doneTests, [tests[0],tests[2]].join( ',' ), 'number of done tests in LS' );
             
       start();
            
    });
    
	stopAllTests( function () {
    	startTests( tests.join(';'), function (res) {         
        	getTests();           
    	});
    });

});

test( 'started tests', function () {

    stop();
    expect(2);

    var tests = ['DisasterRecovery.SuiteMoss2007', 'SuiteFarmBackup.TestBackup',
                  'DisasterRecovery.SuiteSp14','SuiteFarmBackup.TestSchedule'];
                  
    $( '#fn-result' ).bind( 'testsNumber', function (ev, res) {
    
        var new_tests = [ 'InformationPortal.MainSuite.Sp2k', 'InformationPortal.MainSuite.Sp2kTen' ].sort(); 
               
        if ( res.number == 4 ) {

            startTests( new_tests.join(';'), function (res) {    
                getTests();            
            });
            
            return;        
        }
                
        same( res.number, 6, 'notification about number of running tests' );        
        same( localStorage.startedTests.split(',').sort(), new_tests, 'number of started tests' );    
        start(); 
               
    });

	stopAllTests( function () {
    	startTests( tests.join(';'), function (res) {
        	getTests();
    	});
	});                        

});
























