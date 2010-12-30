function load() {

	localStorage.fitnesseSrv = localStorage.fitnesseSrv || 'spb8112:8080';
	localStorage.enableNotification = localStorage.enableNotification || 'yes';
	localStorage.notificationTimeout = localStorage.notificationTimeout || '15';
    localStorage.enableTestCheck = localStorage.enableTestCheck || 'no';
	
}

function save() {

	localStorage.fitnesseSrv = $( '#fitnesse-srv' ).attr( 'value' );
	localStorage.enableNotification = $( '#message-notifications' ).attr( 'checked' ) ? 'yes' : 'no';
	localStorage.notificationTimeout = $( '#notification-timeout' ).attr( 'value' );
    localStorage.enableTestCheck = $( "#test-button-check" ).attr( 'checked') ? 'yes' : 'no';
	
	$( '#saved' ).show();
	setTimeout( function () { 
		$( '#saved' ).fadeOut(1000); 
	}, 1000 );	
}

function init() {
	
	load();	
	
	$( '#fitnesse-srv' ).attr( 'value', localStorage.fitnesseSrv );
	$( '#message-notifications' ).attr( 'checked', localStorage.enableNotification == 'yes' );
	$( '#notification-timeout' ).attr( 'value', localStorage.notificationTimeout );
    
    $( "#test-button-check" ).attr( 'checked', localStorage.enableTestCheck == 'yes' );
	
	$( '#save-button' ).click( save);
}

init();
