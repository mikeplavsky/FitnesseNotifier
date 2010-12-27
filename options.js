function load() {
	localStorage.fitnesseSrv = localStorage.fitnesseSrv || "spb8112";
	localStorage.notificationTimeout = localStorage.notificationTimeout || "60";
}

function save() {
	localStorage.fitnesseSrv = $( '#fitnesse-srv' ).attr( 'value' );
}

function init() {
	load();
	$( '#fitnesse-srv' ).attr( 'value', localStorage.fitnesseSrv );
	$( '#save-button' ).click( save);
}

init();