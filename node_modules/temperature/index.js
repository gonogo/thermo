const PythonShell = require('python-shell');
const path = require('path');

var temperature = 'nothing';
module.exports.temperature = temperature;
var exec = require('child_process').exec;
var options = {
	pythonPath: path.join(__dirname, 'python-venv/bin/python'),
	scriptPath: __dirname
};

function start() {
	var pyshell = new PythonShell('simpletest.py', options);
	pyshell.on('message', function (message) {
		module.exports.temperature = message;
	});
	pyshell.on('error', function (err) {
		console.error('Temperature script failed: ' + err.message);
	});
	pyshell.on('close', function () {
		setTimeout(start, 5000);
	});
}

start();
