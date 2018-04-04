// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$('document').ready(function() {
	exp.init();

	// prevents scrolling when space is pressed (firefox does it)
	window.onkeydown = function(e) {
		if (e.keyCode == 32 && e.target == document.body) {
			e.preventDefault();
		}
	};
});

// an object cp (from cognitive psychology)
var exp = {};

// navigation through the views and steps in each view;
// shows each view (in the order defined in 'config_general') for
// the given number of steps (as defined in 'config_general')
exp.findNextView = function() {
	// shows the same view template
	if (this.currentViewStepCounter < config_general.viewSteps[this.currentViewCounter]) {
		this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
		this.currentViewStepCounter ++;
	// shows the next view template 
	} else {
		this.currentViewCounter ++; 
		this.currentViewStepCounter = 0;
		this.view = window[config_general.viewFunctions[this.currentViewCounter]](this.currentViewStepCounter);
		this.currentViewStepCounter ++;
	}
};

// creates and sets variables when the page is loaded.
exp.init = function() {
	this.data = prepareData();
	
	// initialize counters and generate first view
	this.currentViewCounter = 0;
	this.blockInstructions = 'reaction';
	this.currentViewStepCounter = 0;
	this.view = this.findNextView();
};