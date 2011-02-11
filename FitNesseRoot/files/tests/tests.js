function getURL(path) {
    return 'http://' + window.location.hostname + path;
}

function stopAllTests(callback) {
    $.getJSON(getURL(':8181/stopAllTests?callback=?'), callback);    
}

function stopTests(names, callback) {
    $.getJSON(getURL(':8181/stopTests?callback=?'), {tests:names}, callback );    
}

function startTests(names, callback) {    
    $.getJSON(getURL(':8181/startTests?callback=?'), {tests:names}, callback );
}

function greenTest(name,callback) {
	$.getJSON(getURL(':8181/greenTest?callback=?'), {test:name}, callback );
}

function redTest(name,callback) {
	$.getJSON(getURL(':8181/redTest?callback=?'), {test:name}, callback );
}

module( 'fitnesse notifier', {	
   
   setup: function () {   
        
        localStorage.fitnesseSrv = window.location.hostname + ':8080';
        
        localStorage.runningTests = '';
        localStorage.startedTests = '';
        localStorage.doneTests = '';
        
        localStorage.enableNotification = 'yes';
        
        $( '#fn-result' ).remove();
        $( 'body' ).append( '<div id="fn-result">' );
        
		$( '#fn-checkTest' ).remove();
		$( 'body' ).append( '<div id="fn-checkTest">' );
		
   }
    
});

function _test() {}

function sexpect(num) {
	
	stop();
	expect(num);
	
}

var tests = ['DisasterRecovery.SuiteMoss2007', 'SuiteFarmBackup.TestBackup',
              'DisasterRecovery.SuiteSp14','SuiteFarmBackup.TestSchedule'].sort();

function runTests(tests){
	
	stopAllTests( function () {
    	startTests( tests.join(';'), function (res) {     
        	getTests();           
    	});
	});
	
}

function run() {
	runTests(tests);
}

test( 'running tests', function () {

    sexpect(8);
	var num = 0;
	
	$( '#fn-result' ).bind( 'showNotification', function(ev,res) {
		same(res.test, tests[num], 'started test notification');
		num += 1;
	});
    
    $( '#fn-result' ).bind( 'testsNumber', function (ev, res) {
	
		var running = localStorage.runningTests.split( ',' ).sort();
        var started = localStorage.startedTests.split( ',' ).sort();
    
        same( res.number, 4, 'notification about number of running tests' );
		same( running, tests, 'running tests' )
        same( started, tests, 'started tests' );
        same( localStorage.doneTests, '', 'number of done tests in LS' );
             
        start();
        
    });

	run();
    
});

test( 'done tests', function () {

    sexpect(2);

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
    
	run();

});

test( 'notification of done tests', function () {

    sexpect(3);

	$( '#fn-result' ).bind( 'testsNumber', function (ev, res) {  
             
       if (res.number == 4) {
            
           stopTests( [tests[0],tests[2]].join(';'), function (res) {
				
				var done = [];
				
				$( '#fn-result' ).bind( 'showNotification', function (ev, res) {  
					
					same( res.started, 'no', 'sign that test has been done' );
					done.push(res.test);
					
					if (done.length == 2) {
						same( done.sort(), [tests[0],tests[2]], 'done tests');
						start();
					}
				});
			
                getTests();                                    
           });

           return;                
       }    
    });
    
	run();

});

test( 'started tests', function () {

    sexpect(2);

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

	run();

});

function checkDoneTest(colorFunc, success) {
	
	var test = tests[0];
	
	stop();
	
	$( '#fn-result' ).bind( 'testsNumber', function(ev,res) {
			
			if (res.number == 3 ) {return;}
			
			stopTests( test, function (res) {
				
				colorFunc( test, function (res) {
				
					$( '#fn-result' ).bind( 'showNotification', function (ev, res) {  
					
						same(res.started, 'no', 'test has been finished' );
						same(res.success, success, 'done result' );
						same(res.test, test, 'test name');
					
						start();
					});
					
					getTests();
					
				});
				
			});
			
	});
	
	run()
		
}

test( 'green test done', function () {
	checkDoneTest(greenTest, 'yes');
});

test( 'red test done', function () {
	checkDoneTest(redTest,'no');
});


function runningTest(name,running) {

    var btn = $( '<a href="' + name + '?test">Test</a>' );
	$('#fn-checkTest').append( btn );
	 
	stop();

	$( '#fn-checkTest' ).bind( 'testState', function(ev,res) {
    
        same( res.running, running, 'test is running');
		same( res.testButton.text(), 'Test', 'test button');
		
		start();
	});
	
	stopAllTests( function(){
		startTests(tests[0], function() {
			checkTest( '/' + name, getURL(':8080/files/testProgress') );
		});
	});

}

test('Running test', function(){
	runningTest( tests[0], true );		
});


test('Not Running test', function(){	
	runningTest( tests[1], false );	
});











