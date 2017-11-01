var jsonfile = require('jsonfile');
const shipData = require('./ships.js');
const enemiesData = require('./enemies.js');
const eventsData = require('./events.js');
const spaceEnvData = require('./spaceEnv.js');


jsonfile.writeFile(__dirname + '/ships.json', shipData, {spaces: 2, EOL: '\r\n'}, function (err) {
    console.error(err);
});

jsonfile.writeFile(__dirname + '/enemies.json', enemiesData, {spaces: 2, EOL: '\r\n'}, function (err) {
    console.error(err);
});

jsonfile.writeFile(__dirname + '/events.json', eventsData, {spaces: 2, EOL: '\r\n'}, function (err) {
    console.error(err);
});

jsonfile.writeFile(__dirname + '/spaceEnvs.json', spaceEnvData, {spaces: 2, EOL: '\r\n'}, function (err) {
    console.error(err);
});