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
		console.log('1');
	// checks whether the reaction block has finished and if it has, moves to pause
	} else if ((this.view.name === 'reaction') && (this.data[this.CT]['block'] !== 'rt')) {
		this.view = initPauseView();
		console.log('2');
	// checks whether there are more trials from the reaction block, if so, moves to reaction time
	} else if ((this.view.name === 'reaction') && (this.data[this.CT]['block'] === 'rt')) {
		this.view = initReactionTimeView(this.data[this.CT], this.CT);
		this.CT ++;
		console.log('3');
	// if the view shown is pause and the next block is goNoGo, moves to GoNoGo
	} else if ((this.view.name === 'pause') && (this.data[this.CT]['block'] === 'goNoGo')) {
		this.view = initGoNoGoView(this.data[this.CT], this.CT);
		this.CT ++;
		console.log('4');
	// if the view shown is goNoGo and the next block is not goNoGo (all the goNoGo trials has been shown)
	// moves to pause
	} else if ((this.view.name === 'goNoGo') && (this.data[this.CT]['block'] !== 'goNoGo')) {
		this.view = initPauseView();
		console.log('5');
	// if there are more goNoGo trials to show, renders goNoGo view
	} else if ((this.view.name === 'goNoGo') && (this.data[this.CT]['block'] === 'goNoGo')) {
		this.view = initGoNoGoView(this.data[this.CT], this.CT);
		this.CT ++;
		console.log('6');
	} else if ((this.view.name === 'pause') && (this.data[this.CT]['block'] === 'discrimination')) {
		this.view = initDiscriminationView(this.data[this.CT], this.CT);
		this.CT ++;
		console.log('7');
	} else if ((this.view.name === 'discrimination') && (this.CT === this.data.length)) {
		console.log('inits Subj Info View');
	} else if ((this.view.name === 'discrimination') && (this.data[this.CT]['block'] === 'discrimination')) {
		this.view = initDiscriminationView(this.data[this.CT], this.CT);
		this.CT ++;
		console.log('8');
	} else {
		console.log('something is not right');
	}
 };

// creates and sets variables when the page is loaded.
// called by document ready function on lines 3-12
cp.init = function() {
	this.view = initIntroView();
	this.data = initExp();
	// CT - current trial in a block
	this.CT = 0; // up to as many as there are in the block strarting from 0
	this.block = 'rt';
};