function stopAllTests() {
    $.getJSON( 'http://localhost:8181/stopAllTests?callback=?');    
}

function stopTests(names, callback) {
    $.getJSON( 'http://localhost:8181/stopTests?callback=?', {tests:names}, callback );    
}

function startTests(names, callback) {    
    $.getJSON( 'http://localhost:8181/startTests?callback=?', {tests:names}, callback );
}

module( 'fitnesse notifier', {	
   
   setup: function () {   
        
        stopAllTests(); 
        
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
                  'DisasterRecovery.SuiteSp14','SuiteFarmBackup.TestSchedule'];
                  
    $( '#fn-result' ).bind( 'testsNumber', function (ev, res) {
            
        same( res.number, 4, 'notification about number of running tests' );
        same( localStorage.runningTests.split( ',' ).length, 4, 'number of running tests in LS' );
        same( localStorage.startedTests.split( ',' ).length, 4, 'number of started tests in LS' );
        same( localStorage.doneTests, '', 'number of done tests in LS' );
             
        start();
        
    });
    
    startTests( tests.join(';'), function (res) {     
        getTests();           
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
    
    startTests( tests.join(';'), function (res) {         
        getTests();           
    });
    
});

test( 'started tests', function () {

    stop();
    expect(2);

    var tests = ['DisasterRecovery.SuiteMoss2007', 'SuiteFarmBackup.TestBackup',
                  'DisasterRecovery.SuiteSp14','SuiteFarmBackup.TestSchedule'];
                  
    $( '#fn-result' ).bind( 'testsNumber', function (ev, res) {
    
        var new_tests = [ 'InformationPortal.MainSuite.Sp2k', 'InformationPortal.MainSuite.Sp2kTen' ]; 
               
        if ( res.number == 4 ) {

            startTests( new_tests.join(';'), function (res) {    
                getTests();            
            });
            
            return;        
        }
                
        same( res.number, 6, 'notification about number of running tests' );        
        same( localStorage.startedTests, new_tests.join(','), 'number of started tests' );    
        start(); 
               
    });              

    startTests( tests.join(';'), function (res) {
        getTests();
    });                        

});
























