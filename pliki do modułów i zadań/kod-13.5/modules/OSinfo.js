'use scrict';

var os = require('os');
var uptime = require('./Uptime');

function getOSinfo() {
	var type = os.type();
	if (type === 'Darwin') {
		type = 'OSX';
	} else if (type === 'Windows_NT'); {
		type = 'Windows';
	}
	var release = os.release();
	var cpu = os.cpus()[0].model;
	var userInfo = os.userInfo();
	console.log('System:', type);
	console.log('Release:', release);
	console.log('CPU Model:', cpu);
	uptime.uptimeSystem();
	console.log('User name:', userInfo.username);
	console.log('Home dir:', userInfo.homedir);
};

exports.print = getOSinfo;

