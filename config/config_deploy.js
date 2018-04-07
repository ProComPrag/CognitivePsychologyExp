// user enters information about deployment method here
var config_deploy = {
	
	// obligatory fields
	"author": "Stela",  // needed to recover data from server app
	"experiment_id": "MentalChronometry-test-01", // needed to recover data from server app
	"description": "A classic sognitive psychology experiment",
	"deployMethod" : "MTurkSandbox", // set deployment method; use one of 'debug', 'localServer', 'MTurk', 'MTurkSandbox', 'Prolific',
	
	// optional fields
	"contact_email": "someRandomJanesEmail@randomJoesAndJanes.love", // who to contact in case of trouble
};

// user does not (should not) change the following information

// checks the config _deploy.deployMethod is MTurk or MTurkSandbox,
// sets the submission url to MTukr's servers
config_deploy.MTurk_server = config_deploy.deployMethod == "MTurkSandbox" ?
    "https://workersandbox.mturk.com/mturk/externalSubmit" : // URL for MTurk sandbox
    config_deploy.deployMethod == 'MTurk' ?
    "https://www.mturk.com/mturk/externalSubmit" : // URL for live HITs on MTurk
    ""; // blank if deployment is not via MTurk
// if the config_deploy.deployMethod is not debug, then liveExperiment is true
config_deploy.liveExperiment = config_deploy.deployMethod !== "debug";
config_deploy.is_MTurk = config_deploy.MTurk_server !== "";
console.log("runs on MTurk: " + config_deploy.is_MTurk);
console.log("MTurk server: " + config_deploy.MTurk_server);
console.log("live experiment: " + config_deploy.liveExperiment);
