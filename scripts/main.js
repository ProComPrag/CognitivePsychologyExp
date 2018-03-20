// when the DOM is created and JavaScript code can run safely,
// the experiment initialisation is called
$('document').ready(function() {
	cp.init();

	// prevents scrolling when space is pressed (firefox does it)
	window.onkeydown = function(e) {
		if (e.keyCode == 32 && e.target == document.body) {
			e.preventDefault();
		}
	};
});

// an object cp (from cognitive psychology)
var cp = {};

// keeps track of the views and decided which one to show next
// called at the end of each view in views.js
cp.findNextView = function() {
	if (this.view.name === 'intro') {
		this.view = initInstructionsView();
	} else if (this.view.name === 'instructions') {
		this.view = initReactionTimeView(this.data[this.CT], this.CT);
		this.CT ++;
	// the last one of the reaction block renders PauseView
	} else if ((this.view.name === 'reaction') && (this.data[this.CT]['block'] !== 'rt')) {
		this.view = initPauseView();
	} else if ((this.view.name === 'reaction') && (this.data[this.CT]['block'] === 'rt')) {
		this.view = initReactionTimeView(this.data[this.CT], this.CT);
		this.CT ++;
	} else if ((this.view.name === 'pause') && (this.data[this.CT]['block'] === 'goNoGo')) {
		this.view = initGoNoGoView(this.data[this.CT], this.CT);
		this.CT ++;
	} else if ((this.view.name === 'goNoGo') && (this.data[this.CT]['block'] !== 'goNoGo')) {
		this.view = initPauseView();
	} else if ((this.view.name === 'goNoGo') && (this.data[this.CT]['block'] === 'goNoGo')) {
		this.view = initGoNoGoView(this.data[this.CT], this.CT);
		this.CT ++;
	} else {
		console.log('not finished yet');
	}
 };

// creates and sets variables when the page is loaded.
// called by document ready function on lines 3-12
cp.init = function() {
	this.view = initIntroView();
	this.data = initExp();
	// CT - current trial in a block
	this.CT = 0; // up to as many as there are in the block strarting from 0
	console.log(this.data[this.CT]);
};