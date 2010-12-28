var text = "";

function addNames(arr) {
	
	$(arr.split( ',' )).each( function (i,value) {
		text += value.match( /\.([^\.]*)$/ )[1] + ' ';
	});	
};

if (localStorage.startedTests) {
	
	text += "Started: "; 	
	addNames(localStorage.startedTests);
}

if ( localStorage.doneTests ) {
	
	text += "Finished: ";	
	addNames(localStorage.doneTests);
}

$( '#fn-notify-res' ).text( text );