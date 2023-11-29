const cron = require('node-cron');

const exePath = process.cwd()+"\\rcon\\rcon.exe";

const config = require("./config.json");

function rconCommand(command) {
    var shell = require('shelljs');

    shell.config.silent = true;

    let result = shell.exec(exePath + " -p "+config["rcon-password"]+" --address "+config.address+" "+command);

    return result;
}

function hourlyHook() {
    cron.schedule('0 * * * *', () => {
        let commands = require("./hourly.json");

        for (let z = 0; z < commands.length; z++) {
            let command = commands[z];

            let cmdResult = rconCommand(command);

            console.log(cmdResult.stdout)
        }
    });
}

function startupHook() {
        let commands = require("./startup.json");

        for (let z = 0; z < commands.length; z++) {
            let command = commands[z];
            let cmdResult = rconCommand(command);

            console.log(cmdResult.stdout)
        }
}

function twelveHoursHook() {
    cron.schedule('0 */12 * * *', () => {
        let commands = require("./12h.json");

        for (let z = 0; z < commands.length; z++) {
            let command = commands[z];

            let cmdResult = rconCommand(command);

            console.log(cmdResult.stdout)
        }
    });
}

function everyDayHook() {
    cron.schedule('0 0 * * *', () => {
        let commands = require("./12h.json");

        for (let z = 0; z < commands.length; z++) {
            let command = commands[z];

            let cmdResult = rconCommand(command);

            console.log(cmdResult.stdout)
        }
    });
}

function sixHoursHook() {
    cron.schedule('0 */6 * * *', () => {
        let commands = require("./6h.json");

        for (let z = 0; z < commands.length; z++) {
            let command = commands[z];

            let cmdResult = rconCommand(command);

            console.log(cmdResult.stdout)
        }
    });
}
function threeHourHook() {
    cron.schedule('0 */3 * * *', () => {
        let commands = require("./3h.json");

        for (let z = 0; z < commands.length; z++) {
            let command = commands[z];

            let cmdResult = rconCommand(command);

            console.log(cmdResult.stdout)
        }
    });
}

//runs commands on startup
startupHook();

hourlyHook();

threeHourHook();

twelveHoursHook();

everyDayHook();

sixHoursHook();