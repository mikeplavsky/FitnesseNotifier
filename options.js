function load() {

	localStorage.fitnesseSrv = localStorage.fitnesseSrv || 'spb8112:8080';
	localStorage.enableNotification = localStorage.enableNotification || 'yes';
	localStorage.notificationTimeout = localStorage.notificationTimeout || '15';
	
}

function save() {

	localStorage.fitnesseSrv = $( '#fitnesse-srv' ).attr( 'value' );
	localStorage.enableNotification = $( '#message-notifications' ).attr( 'checked' ) ? 'yes' : 'no';
	localStorage.notificationTimeout = $( '#notification-timeout' ).attr( 'value' );
	
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
	
	$( '#save-button' ).click( save);
}

init();
