'use scrict';

var os = require('os');

function uptimeOS() {
	var uptime = os.uptime();
	console.log('Uptime in minutes: ', ((uptime / 3600) * 60).toFixed(0), 'min. i ', 
	(Math.floor((uptime % 3600) / 60)), 'sek.');

	console.log('Uptime in hours: ', ((uptime / 3600).toFixed(0)), 'godzin', 
	((Math.floor((uptime % 3600) / 60)).toFixed(0)), 'min.', ((Math.floor(uptime % 60))), 'sek.');
	
	console.log('Uptime: ~', (uptime / 60).toFixed(0), 'min');
}
	
exports.uptimeSystem = uptimeOS;